import { createProbot } from "probot";
import app from "../../app.js";

const probot = createProbot();
const loadingApp = probot.load(app);

/**
 * Netlify function to handle webhook event requests from GitHub
 *
 * @param {import("@netlify/functions").HandlerEvent} event
 * @param {import("@netlify/functions").HandlerContext} context
 */
export const handler = async function (event, context) {
  try {
    await loadingApp;

    // this could will be simpler once we  ship `verifyAndParse()`
    // see https://github.com/octokit/webhooks.js/issues/379
    await probot.webhooks.verifyAndReceive({
      id:
        event.headers["X-GitHub-Delivery"] ||
        event.headers["x-github-delivery"],
      name: event.headers["X-GitHub-Event"] || event.headers["x-github-event"],
      signature:
        event.headers["X-Hub-Signature-256"] ||
        event.headers["x-hub-signature-256"],
      payload: JSON.parse(event.body),
    });

    return {
      statusCode: 200,
      body: '{"ok":true}',
    };
  } catch (error) {
    app.log.error(error);

    return {
      statusCode: error.status || 500,
      error: "ooops",
    };
  }
};

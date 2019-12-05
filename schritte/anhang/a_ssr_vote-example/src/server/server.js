import path from "path";
import fs from "fs";
import { StaticRouter, matchPath } from "react-router";
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../App";
import configureStore from "../configureStore";
import { Provider } from "react-redux";
import routes from "../routes";
const PORT = 8085;

const app = express();

const renderRoute = (req, res) => {
  fs.readFile(path.resolve("build/index.html"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred");
    }

    const store = configureStore();
    const promises = [];

    routes.some(route => {
      const match = matchPath(req.path, route);
      if (match && route.loadData) {
        promises.push(route.loadData(store.dispatch));
      }
      return match;
    });

    Promise.all(promises).then(_ => {
      const preloadedState = store.getState();

      const context = {};
      const markup = ReactDOMServer.renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      );

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        res.redirect(301, context.url);
        return;
      }

      const html = data.replace(
        '<div id="root"></div>',
        `<div id="root">${markup}</div><script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
          /</g,
          "\\u003c"
        )}
      </script>`
      );

      return res.send(html);
    });
  });
};

app.use(
  express.static(path.resolve(__dirname, "..", "..", "build"), { index: false })
);
app.get("/*", renderRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import path from "path";
import fs from "fs";
import { StaticRouter } from "react-router";
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../App";

const PORT = 8085;

const app = express();

const renderRoute = (req, res) => {
  fs.readFile(path.resolve("build/index.html"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred");
    }

    console.log("req.url", req.url);

    const context = {};
    const markup = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    );

    if (context.url) {
      console.log("REDIRECT TO ", context);
      // Somewhere a `<Redirect>` was rendered
      res.redirect(301, context.url);
      return;
    }

    const html = data.replace(
      '<div id="root"></div>',
      `<div id="root">${markup}</div>`
    );

    return res.send(html);
  });
};

app.use(
  express.static(path.resolve(__dirname, "..", "..", "build"), { index: false })
);
app.get("/*", renderRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

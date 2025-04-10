import express from "express";
import games from "./gameRoutes.js";

const routes = (app) => {


    app.route("/").get((req, res) => res.status(200).send("API teste"))

    app.use(express.json(), games,)

};

export default routes;
import express from "express";
import posts from "./postsRoutes.js";

const routes = (app) => {


    app.route("/").get((req, res) => res.status(200).send("API teste"))

    app.use(express.json(), posts)

};

export default routes;
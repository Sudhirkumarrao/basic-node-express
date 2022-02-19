const express = require("express");
const bodyParser = require("body-parser");
const usersV1 = require("../../routes/v1/users")
module.exports = function (app) {
    app.use(express.json());
    app.use(function (err,req, res, next) {
        if (err) {
            console.error("-- INSIDE PARSER ERROR --");
            console.error(err);
            return res.sendStatus(400); 
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
        res.header("Server", "");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
        );
        next();
    });
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use("/api/v1/user", usersV1);
}
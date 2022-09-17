const express = require("express");
const Partner = require("../models/partner");
const partnerRouter = express.Router();
const authenticate = require("../authenticate");

partnerRouter
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Partner.find()
      .then((partners) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partners);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Partner.create(req.body)
      .then((partner) => {
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /partners");
  })
  .delete(authenticate.verifyAdmin, (req, res, next) => {
    Partner.deleteMany()
      .then((partners) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partners);
      })
      .catch((err) => next(err));
  });

partnerRouter
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Partner.findById(req.params.parterId)
      .then((partner) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /partners/${req.params.partnerId}`
    );
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Partner.findByIdAndUpdate(
      req.params.parterId,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    )
      .then((partner) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch((err) => next(err));
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Partner.findByIdAndDelete(req.params.parterId)
        .then((partner) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(partner);
        })
        .catch((err) => next(err));
    }
  );

module.exports = partnerRouter;

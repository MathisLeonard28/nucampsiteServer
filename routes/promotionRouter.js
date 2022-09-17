const express = require("express");
const Promotion = require("../models/promotion");
const promotionRouter = express.Router();
const authenticate = require("../authenticate");
const cors = require("./cors");

PromotionRouter.route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Promotion.find()
      .then((Promotions) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(Promotions);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Promotion.create(req.body)
        .then((Promotion) => {
          res.statusCode = 201;
          res.setHeader("Content-Type", "application/json");
          res.json(Promotion);
        })
        .catch((err) => next(err));
    }
  )
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /Promotions");
  })
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Promotion.deleteMany()
        .then((Promotions) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(Promotions);
        })
        .catch((err) => next(err));
    }
  );

PromotionRouter.route("/:promotionId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Promotion.findById(req.params.promotionId)
      .then((Promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(Promotion);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /Promotions/${req.params.PromotionId}`
    );
  })
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      Promotion.findByIdAndUpdate(
        req.params.promotionId,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      )
        .then((Promotion) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(Promotion);
        })
        .catch((err) => next(err));
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Promotion.findByIdAndDelete(req.params.promotionId)
        .then((Promotion) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(Promotion);
        })
        .catch((err) => next(err));
    }
  );

module.exports = promotionRouter;

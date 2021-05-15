const express = require("express");
const router = express.Router();

const TaskValidation = require("../middleware/TaskValidation");
const TaskController = require("../controller/Task");

router.post("/new", TaskValidation, TaskController.create);

router.put("/update/:id", TaskValidation, TaskController.update);

router.get("/filter/all/:macaddress", TaskController.all);

router.get("/search/:id", TaskController.show);

router.delete("/delete/:id", TaskController.delete);

router.put("/update/:id/:done", TaskController.done);

router.get("/filter/late/:macaddress", TaskController.late);

router.get("/filter/today/:macaddress", TaskController.today);

router.get("/filter/week/:macaddress", TaskController.week);

router.get("/filter/month/:macaddress", TaskController.month);

router.get("/filter/year/:macaddress", TaskController.year);

module.exports = (app) => app.use("/task", router);
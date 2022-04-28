const { Course, validateCourse } = require("../model/course");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//get list of cources
router.get("/", async (req, res) => {
  const result = await Course.find();
  res.send(result);
});

//get a spesific course
router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).send("Course not found");

  res.send(course);
});

//add new course
router.post("/", async (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(404).send(error.details);

  try {
    let course = new Course(
      req.body //use the same object sent from api, in some cases it is better to use DTOs
    );

    course = await course.save();
    res.send(course);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

//update existing course
router.put("/:id", async (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(404).send(error.details[0].message);

  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) return res.status(404).send("Course not found");

    res.send(course);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

//delete existing course
router.delete("/:id", async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) return res.status(404).send("Course not found");

  res.send(course);
});

module.exports = router;

const express = require("express");
const router = express.Router();



const Courses = [
    { courseId: 1, courseName: "Course 1" },
    { courseId: 2, courseName: "Course 2" },
    { courseId: 3, courseName: "Course 3" },
  ];

  
//get list of cources
router.get("/", (req, res) => {
    res.send(Courses);
  });
  
  //get a spesific course
  router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const course = Courses.find((c) => c.courseId === id);
    if (!course) return res.status(404).send("Course not found");
  
    res.send(course);
  });
  
  //add new course
  router.post("/", (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(404).send(error.details[0].message);
  
    let course = {
      courseId: Courses.length + 1,
      courseName: req.body.courseName,
    };
  
    Courses.push(course);
    res.send(course);
  });
  
  //update existing course
  router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const course = Courses.find((c) => c.courseId === id);
    if (!course) return res.status(404).send("Course not found");
  
    const { error } = validateCourse(req.body);
    if (error) return res.status(404).send(error.details[0].message);
  
    course.courseName = req.body.courseName;
  
    Courses.push(course);
    res.send(course);
  });
  
  //update existing course
  router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const course = Courses.find((c) => c.courseId === id);
    if (!course) return res.status(404).send("Course not found");
  
    const index = Courses.indexOf(course);
    Courses.splice(index, 1);
    res.send(course);
  });
  
  //validate course object against a predefined scehma
  function validateCourse(course) {
    const schema = Joi.object({
      courseName: Joi.string().min(3).required(),
    });
    return schema.validate(course);
  }
  

  module.exports =router; 
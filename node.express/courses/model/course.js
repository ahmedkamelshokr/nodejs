const mongoose = require("mongoose");
const Joi = require("joi");

//define schema for course document
//mongoose use this schema to validate data
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5 },
  category: {
    type: String,
    required: true,
    enum: ["web", "desktop", "mobile"], //should be one of these values 'case sensetive
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      //custom validator
      validator: function (v) {
        return v && v.length > 0; // not null and have length>0
      },
      message: " Tags should have at least one element.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      //can not be replaced by lambda exp because 'this' will not be the course object
      return this.isPublished;
    },
  },
});

//define the course object
const Course = mongoose.model("course", courseSchema);

//validate course object against a predefined scehma
//this validate all api payload even it is not used
//so we send only the defined props
function validate(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    category: Joi.string(),
    author: Joi.string(),
    tags: Joi.array(),
  });
  return schema.validate(course);
}

exports.Course = Course;
exports.validateCourse = validate;

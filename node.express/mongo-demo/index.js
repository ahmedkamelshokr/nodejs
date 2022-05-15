const { string, number } = require("joi");

//define connection
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/demo")
  .then(() => console.log("connected.."))
  .catch((err) => console.log(err));

//define schema for course documetn
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
    validate: { //custom validator
      validator: function (v) {
        return v && v.length > 0;  // not null and have length>0
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

async function createcourse() {
  //create a course instance
  const course = new Course({
    name: "mongo coursexxxxxxxx",
    author: "Mosh",
  //  tags: ["node js", "mongo"],
    isPublished: false,
    category: "web",
  });

  try {
    await course.validate();
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}

createcourse();

//gt, lt,gte,lte,in,nin,eq,ne
//or and

async function getCourse() {
  const courses = await Course.find({
    isPublished: true,
  })
    .or([{ name: /.*by.*/i }, { price: { $gte: 15 } }])
    //Course.find({ author: /^mos/i }) //starts with  using REGEX  i makes it case insensetive
    //.find().or([{author:'Mosh'},{isPublished:true}]) // author = mosh OR published=true  and the same for AND
    //.find({price:{$gt:10 }})  price >10
    //.find({price:{$gte:10, $lte:20}})  <=10 <=20
    //.find({price:{$in:[10,20,50]}})  in 10,20,50

    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 }); //count() to get count
  console.log(courses);
}

//getCourse();

async function getThenUpdateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;
  course.isPublished = true;
  course.author = "new authorxxx";

  const newCourse = await course.save();
  console.log(newCourse);
  /* course.set(
        {
            isPublished=true;
            author='new author'  
        }
    );*/
}

//getThenUpdateCourse('6265f4d04bfb3c67e19456e4');

async function updateCourse(id) {
  //     const result = await Course.updateOne({_id:id},
  //         {
  //             $set:{
  //                 author:'ahmed kamel'
  //             }
  //         });

  //   console.log(result);

  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "ahmed kamelxxx",
      },
    },

    { new: true }
  );

  console.log(course);
}
//updateCourse('6265f4d04bfb3c67e19456e4');

async function removeCourse(id) {
  //const result = await Course.deleteOne({_id:id} ); //delete first item match the filter

  // console.log(result);

  const course = await Course.findByIdAndRemove(id);

  console.log(course);
}

//removeCourse("6265f4d04bfb3c67e19456e7");

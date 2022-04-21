const express = require('express');
const Joi = require('joi');
 
const app =express();
app.use(express.json());

const Courses=[
    {courseId:1,    courseName:"Course 1"},
    {courseId:2,    courseName:"Course 2"},
    {courseId:3,    courseName:"Course 3"}
]

//app root
app.get('/',(req,res)=>
{
res.send('Hello world');
});

//get list of cources
app.get('/api/courses',(req,res)=>{
    res.send(Courses);
});

//get a spesific course
app.get('/api/courses/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const course= Courses.find(c=>c.courseId === id);
    if (!course) return res.status(404).send("Course not found");
 
    res.send(course );
});


//add new course
app.post('/api/courses',(req,res)=>
{
     
const {error} =validateCourse(req.body); 
if (error) return res.status(404).send(error.details[0].message);
 
    let course ={ courseId :Courses.length+1,
    courseName: req.body.courseName};

    Courses.push(course);
    res.send(course);
});


//update existing course
app.put('/api/courses/:id',(req,res)=>
{
    const id=parseInt(req.params.id);
    const course= Courses.find(c=>c.courseId === id);
    if (!course) return res.status(404).send("Course not found");
    

    const {error} =validateCourse(req.body); 
    if (error) return res.status(404).send(error.details[0].message);
     
 
    course.courseName= req.body.courseName;

    Courses.push(course);
    res.send(course);
});

//update existing course
app.delete('/api/courses/:id',(req,res)=>
{
    const id=parseInt(req.params.id);
    const course= Courses.find(c=>c.courseId === id);
    if (!course) return res.status(404).send("Course not found");
         
   
 const index=Courses.indexOf(course);
    Courses.splice(index,1);
    res.send(course);
});




//validate course object against a predefined scehma
function validateCourse(course)
{
    const schema =Joi.object({
        courseName: Joi.string().min(3).required()
    })
return schema.validate(course);
}

//set env var [System.Environment]::SetEnvironmentVariable('PORT','5000')
//reading env valriable
const port = process.env.PORTx || 5000;
app.listen(port,()=>console.log(`app started listenning ${port}...`));

const express = require("express");
const Joi = require("joi");
const logger = require("./middleware/logger");
const morgan = require("morgan");
const config = require('config');

//routs
const courses = require('./routes/courses');
const home = require('./routes/home');

const app = express();

//return views and rich html
//define the html template aat view folder 
//use the template with an object with prop to be replaced
app.set('view engine', 'pug');
app.set('views', './views');


//app.get("env") ==>reads a variable NODE_ENV if not exist return development
if (app.get("env") == "Prod") {
  console.log("app.get");
  app.use(morgan('common'));
}


app.use(express.json());
//custom middleware
app.use(logger);

//map any api/courses to the router object [courses]
app.use('/api/courses',courses);

//map any / to the router object [home]
app.use('/',home);

//reads values from the proper config file based on the NODE_ENV variable value
console.log(config.get('name'));
console.log(config.get("password")); //if not exist in config it will check if it is mapped at the custm-env-var file



const p= new Promise((resolve,reject)=>{

    setTimeout(() => {
        resolve(19);
    }, 2000);
});

p.then(result=>console.log(result));

console.log('promise called');

//set env var ==> [System.Environment]::SetEnvironmentVariable('PORT','5000')
//reading env valriable
const port = process.env.PORTx || 5000;
app.listen(port, () => console.log(`app started listenning ${port}...`));

const mongoose = require('mongoose');
const courses = require('./routes/courses'); 
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/course')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/courses', courses); 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
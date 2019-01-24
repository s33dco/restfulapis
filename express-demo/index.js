const express = require('express');
const Joi     = require('joi');
const app     = express();

const port    = process.env.PORT || 3000;

app.use(express.json());

const courses = [
  {id:1, name :'course1'},
  {id:2, name :'course2'},
  {id:3, name :'course3'}
]

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/api/courses', (req, res) => {
  res.send([courses]);
});

app.get('/api/courses/:id', (req, res) => {
  let course = courses.find( course => course.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send(`the course with id ${req.params.id} was not found`);
  }
    res.send(course);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error){
   return res.status(400).send(error.details[0].message);
  }

  const course = {
    id : courses.length + 1,
    name : req.body.name
  };

  courses.push(course);
  res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
  let course = courses.find( course => course.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send(`the course with id ${req.params.id} was not found`);
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(courses);
});

// In a PUT request, the enclosed entity is considered to be a modified version of the resource stored on the origin server, and the client is requesting that the stored version be replaced.
//
// With PATCH, however, the enclosed entity contains a set of instructions describing how a resource currently residing on the origin server should be modified to produce a new version

app.put('/api/courses/:id', (req, res) => {
  let course = courses.find( course => course.id === parseInt(req.params.id));

  if (!course) {
    return res.status(404).send(`the course with id ${req.params.id} was not found`);
  }

  const { error } = validateCourse(req.body);
  if (error){
   return res.status(400).send(error.details[0].message);
  }

  course.name = req.body.name;
  res.send(course);
});


function validateCourse(course){
  const schema = { name: Joi.string().min(3).required()};
  const result = Joi.validate(req.body, schema);
}

// http://localhost:3000/api/courses/2019/01?sortBy=name

app.get('/api/courses/:year/:month', (req, res) => {
  let obj = { params : req.params,
              query : req.query};

  res.send(obj);
});


function validateCourse(course){
  const schema = { name: Joi.string().min(3).required()};
  return Joi.validate(course, schema);
}

app.listen(port, () => {
  console.log(`listening on ${port}`)
});

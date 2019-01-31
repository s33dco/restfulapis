const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: authorSchema,
    required : true       // alternatively apply validation on Schema type
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
  // const course = await Course.findById( courseId);
  // course.author.name = 'Mosh Hamedani';
  // course.save();
  //
  // or just update

  const course = await Course.update({_id: courseId}, // this way does not return document
    { $set: {                                         // use $unset to remove doc or nested
      'author.name': 'John Smith'
    }});
  console.log(course);
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));

updateAuthor('5c52e0021bb37f2bf5642d45');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
  .then(() => console.log('connected to mongodb'))
  .catch((e) => console.log('you have a problem', e.message))

const courseSchema = new mongoose.Schema({
  name : String,
  author: String,
  tags : [String],
  date: {type: Date, default: Date.now},
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema)


selectCourses = async () => {
  try {
    return await Course
      .find({isPublished: true, tags: 'backend'})
      .select({ _id: 0, name:1, author:1 })
      .sort({name: 1})
  }
  catch (e) {
    console.log('hmmm', e.message)
  }
};

displayCourses = async () =>{
  try {
    courses = await selectCourses();
    courses.forEach((course) => {
      console.log(`${course.name} by ${course.author}`)
    })
  }
  catch (e) {
    console.log('hmmm', e.message)
  }
}

displayCourses();

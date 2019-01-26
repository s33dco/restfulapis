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
      // price =< 12 with 'by' in name
      .find({isPublished: true, name: /.*by.*/i, price: { $gte: 12}})
  }
  catch (e) {
    console.log('hmmm', e.message)
  }
};

displayCourses = async () =>{
  try {
    courses = await selectCourses();
    if (!courses.length) {throw new Error('no records found')}
    courses.forEach((course) => {
      console.log(`${course.name} by ${course.author}, £${course.price}`)
    })
  }
  catch (e) {
    console.log('hmmm', e.message)
  }
}

displayCourses();

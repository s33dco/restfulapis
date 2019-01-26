const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to mongodb..'))
  .catch((e) => console.log('oh noes', e.message));


const courseSchema = new mongoose.Schema({
  name : String,
  author: String,
  tags : [String],
  date: {type: Date, default: Date.now},
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

createCourse = async () => {
  try {
    const course = new Course({
      name: 'My Hedge Row Course',
      author: 's33dco',
      tags: ['planning', 'law'],
      isPublished: true
    });

    const result = await course.save();
    console.log(result);
  }
  catch (e) {
    console.log(e.message);
  }
}

// createCourse();

getCourses =  async (query) => {




  try {
    const courses = await Course
    // comparison
    // eq ne gt gte lt lte in nin - comparision operators.
    // .find({price: {$gte :10, $lte: 20}})
    // .find({price: {$in: [10, 15, 20]}})

    // logical
    // or and -logical operators
    // .find()
    // .or([{author:"tom"}, {author:'frank'}])
    // .and

    // use regexp
    // .find({author: /^Car/i}) - starts with Car case insensitve
    // .find({author: /try$/i}) - sends with try case insensitve
    // .find({author: /.*hedge.*/i}) - contains hedge case insensitve

    // .count() - to count

      .find(query)
      .limit(5)
      .sort({date:1})
      .select({name:1});
    console.log(courses);
  }
  catch (e) {
    console.log(e.message);
  }
}

getCourses({isPublished: true, tags: 'law'})


// pagination

paginateCourses = async () => {

  // /api/courses?pageNumber=2&pageSize=10

  const pageNumber = 2;
  const pageSize = 10;

  const page = await Course
    .find({author: 's33dco'})
    .skip((pageNumber - 1) * pageSize) //
    .limit(pageSize)                   // can retrieve documents in given page
    .sort({name: 1})
}

paginateCourses()

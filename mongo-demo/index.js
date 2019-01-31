const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to mongodb..'))
  .catch((e) => console.log('oh noes', e.message));


const courseSchema = new mongoose.Schema({
  name : {
            type: String,
            required: true
          },

  category: {
            type: String,
            enum :['web', 'mobile', 'newtwork'],
            // uppercase: true,
            lowercase: true,
            trim : true
            },

  author: String,

  tags : {
          type: Array,
          validate: {                   // custom validator
            isAsync: true,              // async - isAsync
            validator: function(v, callback) {
              setTimeout(() => {
                  // do async work.
                  const result =  v && v.length > 0; // so null doesn't throw validation error...
                  callback(result);
              }, 4000);
            },
            message: 'a course should have atleast one tag.'
          }
        },

  date: {
          type: Date,
          default: Date.now
        },

  isPublished: Boolean,

  price: {
      type: Number,
      required: function(){ return this.isPublished;},
      min: 10,
      max: 200,
      get: v => Math.round(v),
      set: v => Math.round(v)
      }
    });

const Course = new mongoose.model('Course', courseSchema);

createCourse = async () => {
  try {
    const course = new Course({
      name: 'My Hedge Row Course',
      category: 'Web',
      author: 's33dco',
      tags: ['frontend'],
      isPublished: true,
      price: 20
    });

    const result = await course.save();
    console.log(result);
  }
  catch (e) {
    for (field in e.errors)
    console.log(e.errors[field].message);
  }
}

// createCourse();

// getCourses =  async (query) => {
//
//
//
//
//   try {
//     const courses = await Course
//     // comparison
//     // eq ne gt gte lt lte in nin - comparision operators.
//     // .find({price: {$gte :10, $lte: 20}})
//     // .find({price: {$in: [10, 15, 20]}})
//
//     // logical
//     // or and -logical operators
//     // .find()
//     // .or([{author:"tom"}, {author:'frank'}])
//     // .and
//
//     // use regexp
//     // .find({author: /^Car/i}) - starts with Car case insensitve
//     // .find({author: /try$/i}) - sends with try case insensitve
//     // .find({author: /.*hedge.*/i}) - contains hedge case insensitve
//
//     // .count() - to count
//
//       .find(query)
//       .limit(5)
//       .sort({date:1})
//       .select({name:1});
//     console.log(courses);
//   }
//   catch (e) {
//     console.log(e.message);
//   }
// }
//
// getCourses({isPublished: true, tags: 'law'})


// pagination

// paginateCourses = async () => {
//
//   // /api/courses?pageNumber=2&pageSize=10
//
//   const pageNumber = 2;
//   const pageSize = 10;
//
//   const page = await Course
//     .find({author: 's33dco'})
//     .skip((pageNumber - 1) * pageSize) //
//     .limit(pageSize)                   // can retrieve documents in given page
//     .sort({name: 1})
// }
//
// paginateCourses()

createCourse()

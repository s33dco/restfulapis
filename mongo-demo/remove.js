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

removeCourse = async (id) => {

  try {
    // Course.update ({_id: id}, {$set: {}}) - return query result
    // const result = await Course.deleteOne({_id: id}); // returns results object
    const course = await Course.findOneAndDelete({_id: id})
    if (course === null){throw new Error('no course in db with that id!')}
    console.log(course);
  }
  catch (e){
    console.log('hmm', e.message);
  }

}

removeCourse('5c4ac8da6d4e410473b4e590');

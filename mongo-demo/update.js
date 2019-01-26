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

updateCourse = async (id) => {
  // Approach Query first
  // findById()
  // save()
  // try {
  //   const course = await Course.findById(id);
  //   if (course.isPublished === false){
  //     course.set({author: 'Supercat', isPublished: true});
  //     result = await course.save();
  //     console.log(result);
  //   } else {
  //     throw new Error("Can't update published course.")
  //   }
  // }
  // catch (e){
  //   console.log('hmm', e.message);
  // }

  // Approach :Update first
  // Update directly
  // Optionally get doc

  try {
    // Course.update ({_id: id}, {$set: {}}) - return query result
    const course = await Course
      .findOneAndUpdate(
        {_id: id},
        { $set: {
          author: 'Felix Pendleton Marley',
          isPublished: false
          }
        }, {new: true}); // new: true returns amended doc otherwise original
    console.log(course);
  }
  catch (e){
    console.log('hmm', e.message);
  }

}

updateCourse('5c4a5fa170d7660e62d1ea3f');

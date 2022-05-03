const mongoose = require('mongoose')
const url =
  `mongodb+srv://fullstack:ICT2103NOSQL@fullstack.jmxog.mongodb.net/NOTEAPP?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
},{
  versionKey: false // You should be aware of the outcome after set to false
});

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
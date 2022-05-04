const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(morgan(':method :url :status :res[body-length] - :response-time ms :body'))
app.use(express.json())
app.use(cors())
require('dotenv').config()
const Person = require('./models/Person')
// Create a new token for logging using morgan
//JSON.stringify() method converts a JavaScript object or value to a JSON string.
morgan.token('body', (req, res) => 
    request.method === 'POST'
    ? JSON.stringify(request.body)
    : ''
)

app.get('/', (request, response) => {
    response.send(
        `<h1>
            Go to the proper 
            <a href="http://localhost:3001/api/persons">page</a>
            or check 
            <a href="http://localhost:3001/info">info</a>.
        </h1>`)
})


// Get list of person API
app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons)
        })
})

// Information of the phonebook
app.get('/info', (request, response) => {
    // Get current date
    const date = new Date().toString()
    response.send(`<div>Phonebook has info for ${phonebook.length} people</div>
    <div>${date}</div>`)
})

// Get information of the single phone entry in the phonebook
app.get('/api/persons/:id', (request, response) => {
    Person
        .findById(request.params.id)
        .then(person => {
            response.json(person)
    })
})

//Delete a phone entry from the phonebook
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => (
    Math.random() * 100000
)

//Create a new phone entry in the phonebook
app.post('/api/persons', (request, response) => {
    const newPerson = request.body
    console.log(newPerson.name)

    if (!newPerson.name || !newPerson.number) {
        return response.status(400).json({
            error: 'The name or number is missing'
          })
    }
    const contact = new Person ({
        name: newPerson.name,
        number: newPerson.number
    })

    // phonebook = phonebook.concat(contact)
    contact.save().then(savedContact => {
        response.json(savedContact)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

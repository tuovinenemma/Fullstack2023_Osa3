require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

app.use(express.json())
const morgan = require('morgan')

morgan.token("data", (req, res) => {
    return JSON.stringify(req.body)
})

const cors = require('cors')

app.use(cors())

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))

app.use(express.static('build'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    console.log(persons)
    response.json(persons)
  })
})

app.get('/info', (req, res) => {
    const dateTimeObject = new Date();
    const sum = persons.length
    
    res.send("Phonebook has info for " + sum + " people " + dateTimeObject.toDateString() + dateTimeObject.toTimeString());
})


app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
      
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {

      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })

    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

  
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name is missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


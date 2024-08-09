import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'
import { useEffect } from 'react'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [updateTrigger, setUpdateTrigger] = useState(false)

  useEffect(() => {
    personsService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [updateTrigger])

  const personsToShow = showAll 
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(filter))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    for (let person of persons) {
      if (person.name === newName) {
        const agreed = confirm(newName + ' is already added to phonebook, replace the old number with a new one?')
        if (agreed) {
          personsService.update(person, newPerson).catch(error => {
            setMessage(`Information of ${person.name} has already been removed from the server`)
          })
          setNewName('')
          setNewNumber('')
          setMessage(`Replaced ${newName} number`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
        return
      }
    }
    
    personsService.create(newPerson)
      .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    setNewName('')
    setNewNumber('')
    setMessage(`Added ${newName}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleFilterChange = (event) => {
    setFilter(String(event.target.value).toLowerCase())
    if (filter !== '') {
      setShowAll(false)
    } else if (filter === '') {
      setShowAll(true)
    }
  }

  const removePerson = (person) => {
    const agreed = confirm('Delete ' + person.name + '?') 
    if (agreed) {
      personsService.remove(person.id).then(() => {
        setMessage(`Deleted ${person.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setUpdateTrigger(!updateTrigger)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      filter shown with 
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
        handleNewPerson={handleNewPerson} handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} newNumber={newNumber} newName={newName}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson}/>
    </div>
  )
}

export default App

import { useEffect, useState, useRef } from 'react'
import phonebookService from './services/persons'

const Person = ({ person, inputRef, onSubmit }) => {
  if (!person.visible) {
    return 
  }
  return (
    <li key={person.name}>
      {person.name} {person.number}
      <form key={person.id} onSubmit={onSubmit}> 
        <input type='hidden' ref={inputRef} value={person.id} />
        <button type="submit" onClick={() => inputRef.current = person.id}>delete</button>
      </form>
    </li>
  )
}

const FilterForm = ({newFilter, onSubmit, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='query'>filter shown with</label>
      <input 
        id='query'
        value={newFilter}
        onChange={onChange}
        placeholder='filter..' />
      <br></br>
      <button type="submit">apply filter</button>
    </form>
  )
}

const AddPersonForm = ({ onSubmit, newName, onNameChange, newNumber, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
        <label htmlFor='name'>name:</label>
        <input
        id='name'
        value={newName}
        onChange={onNameChange}
        placeholder='new name...'/>
        <br></br>

        <label htmlFor='number'>number:</label>
        <input 
        id='number'
        value={newNumber}
        onChange={onNumberChange}
        placeholder='new number..' />
        <br></br>

        <button type="submit">add</button>
      </form>
  )
}

const PersonList = ({ persons, inputRef, onSubmit }) => {
  return (
    <ul>
      {persons.map(person =>
        <div>
          <Person person={person} inputRef={inputRef} onSubmit={onSubmit} />
        </div>
      )}
    </ul>
  )
}

const caseInsensitiveInclude = (search, str) =>
  new RegExp(str, 'i').test(search)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
        console.log(initialPersons)
      })
    }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      visible: true
    }

    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else if (persons.map(person => person.number).includes(newNumber)) {
      window.alert(`${newNumber} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else {
      phonebookService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const removePerson = (event) => {
    console.log(`inputref current ${inputRef.current}`)
    event.preventDefault()
    phonebookService
      .remove(inputRef.current)
      .then(returnedPerson => {
        const personIndex = persons.map(person => person.id).indexOf(returnedPerson.id)
        
        const newPersons = persons.slice(0)
        newPersons.splice(personIndex, 1)
        setPersons(newPersons)
      })
  }

  const filterShown = (event) => {
    event.preventDefault()
    
    const names = persons.map(person => person.name)
    const personsToShow = names.map(name => caseInsensitiveInclude(name, newFilter))

    let index = 0
    const visiblePersons = []
    persons.forEach(person => {
      const changedPerson = {...person, visible: personsToShow[index]}
      visiblePersons.push(changedPerson)
      index += 1
    });
    setPersons(visiblePersons)
    setNewFilter('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleQueryChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm 
        newFilter={newFilter} 
        onSubmit={filterShown} 
        onChange={handleQueryChange} />

      <h3>Add a new</h3>
      <AddPersonForm 
        onSubmit={addPerson}
        newName={newName} 
        onNameChange={handleNameChange} 
        newNumber={newNumber} 
        onNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <PersonList persons={persons} inputRef={inputRef} onSubmit={removePerson} />
    </div>
  )
}

export default App
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
        placeholder='new name...'
        required />
        <br></br>

        <label htmlFor='number'>number:</label>
        <input 
        id='number'
        value={newNumber}
        onChange={onNumberChange}
        placeholder='new number..'
        required />
        <br></br>

        <button type="submit">add</button>
      </form>
  )
}

const PersonList = ({ persons, inputRef, onSubmit }) => {
  return (
    <ul>
      {persons.map(person =>
        <div key={person.name}>
          <Person person={person} inputRef={inputRef} onSubmit={onSubmit} />
        </div>
      )}
    </ul>
  )
}

const Error = ({ error }) => {
  if (error == null) {
    return
  }

  return (
    <div className='error'>
      { error }
    </div>
  )
}

const Notification = ({ message }) => {
  if (message == null) {
    return
  }
  
  return (
    <div className='notification'>
      { message }
    </div>
  )
}

const caseInsensitiveInclude = (search, str) =>
  new RegExp(str, 'i').test(search)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
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

    if (personObject.number === '') {
      setError(`Must include a number`)
      setTimeout(() => {
        setError(null)
      }, 3000)
      setNewName('')
      setNewNumber('')
    }

    if (persons.map(person => person.name).includes(newName)) {
      const confirm = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      console.log(confirm)

      if (confirm) {
        if (persons.map(person => person.number).includes(newNumber)) {
          window.alert(`${newNumber} is already added to the phonebook`)
          setNewName('')
          setNewNumber('')
        }
      else {
        const personToBeUpdated = persons.find(person => person.name === newName)
        console.log(personToBeUpdated)
        const updatedPerson = {...personToBeUpdated, number: newNumber}
        phonebookService
          .updateNumber(personToBeUpdated, updatedPerson)
          .then(returnedPerson => {
            console.log('returned person ' + returnedPerson.number)
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))

            setMessage(`Updated the number of ${updatedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(error => {
            setError(`Information of ${updatedPerson.name} has already been removed from server`)
            setTimeout(() => {
              setError(null)
            }, 3000)
          })
        }
      }

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
          setMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        
        .catch(error => {
          setError(`${error.response.data.error}`)
          setTimeout(() => {
            setError(null)
          }, 3000)
        })

      console.log(personObject)
      setNewName('')
      setNewNumber('')
    }
  }

  const removePerson = (event) => {
    console.log(`inputref current ${inputRef.current}`)
    event.preventDefault()
    const removedPerson = persons.find(person => person.id == inputRef.current)
    phonebookService
      .remove(inputRef.current)
      .then(returnedPerson => {
        const personIndex = persons.map(person => person.id).indexOf(returnedPerson.id)
        const newPersons = persons.slice(0)
        newPersons.splice(personIndex, 1)
        setPersons(newPersons)
        setMessage(`Removed ${removedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      .catch(error =>
        setError(`${removedPerson.name} has already been remover from server`)
      )
      setTimeout(() => {
        setError(null)
      }, 3000)
      
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
      <Notification message={message} />
      <Error error={error} />
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
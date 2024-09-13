import { useState } from 'react'

const Person = ({ name, number, visible }) => {
  if (!visible) {
    return 
  }
  return (
    <li>{name} {number}</li>
  )
}

const caseInsensitiveInclude = (search, str) =>
  new RegExp(str, 'i').test(search)

const App = () => {
  const [persons, setPersons] = useState([
    { 
      id: '1',
      name: 'Arto Hellas',
      number: '040-1231244',
      visible: true
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      id: String(persons.length + 1),
      name: newName,
      number: newNumber,
      visible: true
    }

    if (persons.map(person => person.name).includes(newName)) {
      return window.alert(`${newName} is already added to the phonebook`)
    }
    if (persons.map(person => person.number).includes(newNumber)) {
      return window.alert(`${newNumber} is already added to the phonebook`)
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const filterShown = (event) => {
    console.log(event.target)
    event.preventDefault()
    
    const names = persons.map(person => person.name)
    const personsToShow = names.map(name => caseInsensitiveInclude(name, newFilter))

    let index = 0
    persons.forEach(person => {
      person.visible = personsToShow[index]
      index += 1
    });
    
    setNewFilter('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleQueryChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={filterShown}>
        <label htmlFor='query'>filter shown with</label>
        <input 
        id='query'
        value={newFilter}
        onChange={handleQueryChange}
        placeholder='filter..' />
        <br></br>
        <button type="submit">apply filter</button>
      </form>

      <h2>add new</h2>
      <form onSubmit={addPerson}>
        <label htmlFor='name'>name:</label>
        <input
        id='name'
        value={newName}
        onChange={handleNameChange}
        placeholder='new name...'/>
        <br></br>

        <label htmlFor='number'>number:</label>
        <input 
        id='number'
        value={newNumber}
        onChange={handleNumberChange}
        placeholder='new number..' />
        <br></br>

        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map(person =>
            <Person key={person.id} name={person.name} number={person.number} visible={person.visible} />
          )}
        </ul>
      </div>
    </div>
  )

}

export default App
const Header = ({ name }) => {
  console.log(name)
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ parts }) => {
  console.log(parts)
  return (
    <div>
      <ul>
        {parts.map(part => 
          <Part key={part.id} name={part.name} e={part.exercises} />
        )}
      </ul>
    </div>
  )
}

const Course = ({ course }) => {
  console.log(course)
  const id = course.id
  const name = course.name
  const parts = course.parts

  return (
    <div>
      <Header name={name}/>
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  const total = exercises.reduce((a, b) => a + b, 0)

  return (
    <div>
      total of {total} exercises
    </div>
  )
}

const Part = ({ name, e }) => {
  console.log(name, e)
  return (
    <li>{name} {e}</li>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
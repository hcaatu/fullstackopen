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
  
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    const exercises = parts.map(part => part.exercises)
    const total = exercises.reduce((a, b) => a + b, 0)
  
    return (
      <div>
        <h3>total of {total} exercises</h3>
      </div>
    )
  }
  
  const Part = ({ name, e }) => {
    console.log(name, e)
    return (
      <li>{name} {e}</li>
    )
  }

export default Course
const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  const part = props.course.name
  const exercises = props.course.exercises

  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Content = (props) => {
  console.log(props)
  const courses = props.parts

  return (
    <div>
      <Part course={courses[0]} />
      <Part course={courses[1]} />
      <Part course={courses[2]} />
    </div>
  )
}

const Total = (props) => {
  const courses = props.parts
  return (
    <p>Number of exercises {courses[0].exercises + courses[1].exercises + courses[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
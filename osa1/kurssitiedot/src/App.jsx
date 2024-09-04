const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  const part = props.course.part
  const exercises = props.course.exercises

  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Content = (props) => {
  const courses = props.courses

  return (
    <div>
      <Part course={courses[0]} />
      <Part course={courses[1]} />
      <Part course={courses[2]} />
    </div>
  )
}

const Total = (props) => {
  const courses = props.courses
  return (
    <p>Number of exercises {courses[0].exercises + courses[1].exercises + courses[2].exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const courses = [
    { part: 'Fundamentals of React', exercises: 10},
    { part: 'Using props to pass data', exercises: 7},
    { part: 'State of a component', exercises: 14}
  ]

  return (
    <div>
      <Header course={course} />
      <Content courses={courses} />
      <Total courses={courses} />
    </div>
  )
}

export default App
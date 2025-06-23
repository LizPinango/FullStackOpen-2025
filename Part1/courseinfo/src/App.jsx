const Header = (props) => {
  return(
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return(
    <>
      <p>
        {props.part} {props.exercise}
      </p>
    </>
  )
}

const Content = (props) => {
  return(
    <>
      <Part part={props.p1} exercise={props.e1}></Part>
      <Part part={props.p2} exercise={props.e2}></Part>
      <Part part={props.p3} exercise={props.e3}></Part>
    </>
  )
}

const Total = (props) => {
  return(
    <>
      <p>Number of exercises {props.e1 + props.e2 + props.e3}</p>
    </>  
  )  
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}></Header>
      <Content p1={part1.name} p2={part2.name} p3={part3.name} e1={part1.exercises} e2={part2.exercises} e3={part3.exercises}></Content>
      <Total e1={part1.exercises} e2={part2.exercises} e3={part3.exercises}></Total>
    </div>
  )
}

export default App

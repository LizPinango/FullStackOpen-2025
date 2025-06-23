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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}></Header>
      <Content p1={part1} p2={part2} p3={part3} e1={exercises1} e2={exercises2} e3={exercises3}></Content>
      <Total e1={exercises1} e2={exercises2} e3={exercises3}></Total>
    </div>
  )
}

export default App

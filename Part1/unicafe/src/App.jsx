import { useState } from 'react'

const Buttom = ({handleClick, text}) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )  
}

const App = () => {  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>

      <Buttom handleClick={()=> setGood(good + 1)} text={"good"}></Buttom>
      <Buttom handleClick={()=> setNeutral(neutral + 1)} text={"neutral"}></Buttom>
      <Buttom handleClick={()=> setBad(bad + 1)} text={"bad"}></Buttom>

      <h2>Statistics</h2>

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App
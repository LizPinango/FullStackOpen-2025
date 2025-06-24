import { useState } from 'react'

const Buttom = ({handleClick, text}) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )  
}

const Statistics = ({good, neutral, bad}) => {
  let total = good + bad + neutral; 
  let pr = (good*100)/total;
  let average = (good-bad)/total;

  if (total === 0) {
    return (
      <>
        <p>no feedback given</p>
      </>
    )
  }

  return(
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {pr}%</p>
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
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>      
    </div>
  )
}

export default App
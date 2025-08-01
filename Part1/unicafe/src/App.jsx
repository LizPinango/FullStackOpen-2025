import { useState } from 'react'
import './App.css'

const Buttom = ({handleClick, text}) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )  
}

const StatisticsLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>      
    </tr>
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
    <table>
      <tbody>
        <StatisticsLine text={'good'} value={good}/>
        <StatisticsLine text={'neutral'} value={neutral}/>
        <StatisticsLine text={'bad'} value={bad}/>
        <StatisticsLine text={'all'} value={total}/>
        <StatisticsLine text={'average'} value={average}/>
        <StatisticsLine text={'positive'} value={pr}/>      
      </tbody>
    </table>
  )
}

const App = () => {  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div className='container'>
      <h1>Give Feedback</h1>
      <div>
        <Buttom handleClick={()=> setGood(good + 1)} text={"good"}></Buttom>
        <Buttom handleClick={()=> setNeutral(neutral + 1)} text={"neutral"}></Buttom>
        <Buttom handleClick={()=> setBad(bad + 1)} text={"bad"}></Buttom>
      </div>
      
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>      
    </div>
  )
}

export default App
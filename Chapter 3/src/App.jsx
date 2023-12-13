import { useState } from 'react'
import { useSelector } from 'react-redux'
import Account from './components/Account.jsx'
import Bonus from './components/Bonus.jsx'
import Reward from './components/Reward.jsx'
import './App.css'

function App() {

  const amount = useSelector(state=>state.account.amount);
  const points = useSelector(state=>state.bonus.points);

  return (
    <div className="App">
      <h4>App</h4>
      <h3>Current Amount : {amount} </h3>
      <h3>Total Bonus : {points}</h3>
      <Account></Account>
      <Bonus></Bonus>
      <Reward></Reward>

    </div>
  )
}

export default App

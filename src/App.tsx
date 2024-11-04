import React from 'react'
import PeopleTable from './components/PeopleTable/PeopleTable'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Star Wars People</h1>
      <PeopleTable />
    </div>
  )
}
export default App

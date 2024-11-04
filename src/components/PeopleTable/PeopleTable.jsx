import React, { useState } from 'react'
import axios from 'axios'
import FetchButton from '../FetchButton/FetchButton'
import ClearButton from '../ClearButton/ClearButton'
import NoData from '../NoData/NoData'
import styles from './PeopleTable.module.css'
const PeopleTable = () => {
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get('https://swapi.dev/api/people/')
      setPeople(response.data.results)
    } catch (err) {
      setError('Error fetching data')
    } finally {
      setLoading(false)
    }
  }
  const clearData = () => {
    setPeople([])
  }
  return (
    <div>
      <FetchButton onFetch={fetchData} />
      <ClearButton onClear={clearData} />
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div>{error}</div>}
      {people.length === 0 && !loading && <NoData />}
      {people.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Skin Color</th>
              <th>Hair Color</th>
            </tr>
          </thead>
          <tbody>
            {people.map((character) => (
              <tr key={character.name}>
                <td>{character.name}</td>
                <td>{character.height}</td>
                <td>{character.mass}</td>
                <td>{character.skin_color}</td>
                <td>{character.hair_color}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
export default PeopleTable

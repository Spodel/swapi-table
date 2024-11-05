import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import peopleStore from '../../store/PeopleStore'
import FetchButton from '../FetchButton/FetchButton'
import ClearButton from '../ClearButton/ClearButton'
import NoData from '../NoData/NoData'
import Modal from '../Modal/Modal'
import styles from './PeopleTable.module.css'

const PeopleTable: React.FC = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [characterToDelete, setCharacterToDelete] = useState<string | null>(
    null
  )

  const fetchData = () => {
    peopleStore.fetchPeople()
  }

  const clearData = () => {
    peopleStore.clearPeople()
  }

  const openModal = (name: string) => {
    setCharacterToDelete(name)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCharacterToDelete(null)
  }

  const confirmDelete = () => {
    if (characterToDelete) {
      peopleStore.deleteCharacter(characterToDelete)
    }
    closeModal()
  }

  const handleSort = (column: 'name' | 'height' | 'mass') => {
    peopleStore.setSortOrder(column)
  }

  return (
    <div>
      <FetchButton onFetch={fetchData} />
      <ClearButton onClear={clearData} />
      {peopleStore.loading && <div className={styles.loading}>Loading...</div>}
      {peopleStore.error && (
        <div className={styles.error}>{peopleStore.error}</div>
      )}
      {peopleStore.people.length === 0 && !peopleStore.loading && <NoData />}
      {peopleStore.people.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>
                Name
                <button
                  className={styles.sortButton}
                  onClick={() => handleSort('name')}
                >
                  ↓↑
                </button>
              </th>
              <th>
                Height
                <button
                  className={styles.sortButton}
                  onClick={() => handleSort('height')}
                >
                  ↓↑
                </button>
              </th>
              <th>
                Mass
                <button
                  className={styles.sortButton}
                  onClick={() => handleSort('mass')}
                >
                  ↓↑
                </button>
              </th>
              <th>Skin Color</th>
              <th>Hair Color</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {peopleStore.sortedPeople.map((character) => (
              <tr key={character.name}>
                <td>{character.name}</td>
                <td>{character.height}</td>
                <td>{character.mass}</td>
                <td>{character.skin_color}</td>
                <td>{character.hair_color}</td>
                <td className={styles.action}>
                  <button
                    className={styles.deleteButton}
                    onClick={() => openModal(character.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  )
})

export default PeopleTable

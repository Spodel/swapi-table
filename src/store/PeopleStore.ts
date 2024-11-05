import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import { Character } from '../types'
import { sortPeople } from '../utils/sortPeople'

class PeopleStore {
  people: Character[] = []
  loading: boolean = false
  error: string = ''
  sortOrder: 'name' | 'height' | 'mass' | null = null
  sortDirection: 'asc' | 'desc' = 'asc'

  constructor() {
    makeAutoObservable(this)
  }

  async fetchPeople() {
    this.loading = true
    this.error = ''
    try {
      const response = await axios.get('https://swapi.dev/api/people/')
      this.people = response.data.results
    } catch (err) {
      this.error = 'Error fetching data'
    } finally {
      this.loading = false
    }
  }

  clearPeople() {
    this.people = []
  }

  deleteCharacter(name: string) {
    this.people = this.people.filter((character) => character.name !== name)
  }

  setSortOrder(order: 'name' | 'height' | 'mass' | null) {
    if (this.sortOrder === order) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
    } else {
      this.sortOrder = order
      this.sortDirection = 'asc'
    }
  }

  get sortedPeople() {
    return this.sortOrder
      ? sortPeople(this.people, this.sortOrder, this.sortDirection)
      : this.people
  }
}

const peopleStore = new PeopleStore()

export default peopleStore

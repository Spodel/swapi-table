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
    this.loadPeopleFromLocalStorage()
    this.loadSortSettings()
  }

  loadPeopleFromLocalStorage() {
    const storedPeople = localStorage.getItem('people')
    if (storedPeople) {
      this.people = JSON.parse(storedPeople)
    }
  }

  savePeopleToLocalStorage() {
    localStorage.setItem('people', JSON.stringify(this.people))
  }

  async fetchPeople() {
    this.loading = true
    this.error = ''
    try {
      const response = await axios.get('https://swapi.dev/api/people/')
      this.people = response.data.results
      this.savePeopleToLocalStorage()
    } catch (err) {
      this.error = 'Error fetching data'
    } finally {
      this.loading = false
    }
  }

  clearPeople() {
    this.people = []
    localStorage.removeItem('people')
  }

  deleteCharacter(name: string) {
    this.people = this.people.filter((character) => character.name !== name)
    this.savePeopleToLocalStorage()
  }

  setSortOrder(order: 'name' | 'height' | 'mass' | null) {
    if (this.sortOrder === order) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
    } else {
      this.sortOrder = order
      this.sortDirection = 'asc'
    }
    this.saveSortSettings()
  }

  get sortedPeople() {
    return this.sortOrder
      ? sortPeople(this.people, this.sortOrder, this.sortDirection)
      : this.people
  }

  saveSortSettings() {
    localStorage.setItem('sortOrder', this.sortOrder || '')
    localStorage.setItem('sortDirection', this.sortDirection)
  }

  loadSortSettings() {
    const savedOrder = localStorage.getItem('sortOrder') as
      | 'name'
      | 'height'
      | 'mass'
      | ''
    const savedDirection = localStorage.getItem('sortDirection') as
      | 'asc'
      | 'desc'
    if (savedOrder) {
      this.sortOrder = savedOrder
      this.sortDirection = savedDirection
    }
  }
}

const peopleStore = new PeopleStore()

export default peopleStore

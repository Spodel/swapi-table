import { makeAutoObservable } from 'mobx'
import axios from 'axios'

class PeopleStore {
  people: Array<{
    name: string
    height: string
    mass: string
    skin_color: string
    hair_color: string
  }> = []
  loading: boolean = false
  error: string = ''

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
}

const peopleStore = new PeopleStore()

export default peopleStore

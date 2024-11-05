import { Character } from '../types'

export const sortPeople = (
  array: Character[],
  key: 'name' | 'height' | 'mass',
  direction: 'asc' | 'desc'
  //сортировка по возрастанию/убыванию
) => {
  const sortedArray = [...array]

  sortedArray.sort((a, b) => {
    let comparison = 0
    if (key === 'name') {
      comparison = a.name.localeCompare(b.name)
    } else if (key === 'height') {
      comparison = parseInt(a.height) - parseInt(b.height)
    } else if (key === 'mass') {
      comparison = parseInt(a.mass) - parseInt(b.mass)
    }
    return direction === 'asc' ? comparison : -comparison
  })

  return sortedArray
}

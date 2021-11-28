// import axios from 'axios'
import { data } from './fakeData/index'

// const createURL = (postcode: string) => {
//   return `https://api.getAddress.io/find/${postcode}?expand=true&api-key=${process.env.REACT_APP_API_SECRET}`
// }

export const fetchAddress = (postcode: string) => {
  // return axios.get(createURL(postcode))
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 2000)
  })
}

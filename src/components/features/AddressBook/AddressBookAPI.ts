// import axios from 'axios'
import { data } from './data'
// const createURL = (postcode: string) => {
//   const API_KEY = 'eZLCAgGfjU2mAGvyUn4z1g33510'
//   return `https://api.getAddress.io/find/${postcode}?expand=true&api-key=${API_KEY}`
// }

export const fetchAddress = (postcode: string) => {
  // return axios.get(createURL(postcode))
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 2000)
  })
}

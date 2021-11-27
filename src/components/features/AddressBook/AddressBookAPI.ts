import axios from 'axios'
import { fetchData } from './data';
const createURL = (postcode: string) => {
  const API_KEY = 'eZLCAgGfjU2mAGvyUn4z1g33510'
  return `https://api.getAddress.io/find/${postcode}?expand=true&api-key=${API_KEY}`
}

export const fetchAddress = (postcode: string, isFake: boolean) => {
  if (isFake) {
    return fetchData()
  }
  return axios.get(createURL(postcode))
}

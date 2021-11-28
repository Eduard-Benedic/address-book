import { data } from "../fakeData/index"

export const fetchAddress = (postcode: string) => {
  return new Promise((res, rej) => {
    res(data)
  })
}

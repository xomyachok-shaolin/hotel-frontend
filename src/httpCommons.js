import axios from 'axios'

export const AXIOS = axios.create({
  baseURL: `https://stp-hotel.herokuapp.com/`
})

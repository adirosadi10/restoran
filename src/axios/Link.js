import axios from "axios"

const url = "http://localhost:8000/api/"
let token = sessionStorage.getItem('token')

export const Link = axios.create({
  baseURL: url,
  headers:{
    api_token: token,
  }
})
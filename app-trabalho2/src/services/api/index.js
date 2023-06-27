import axios from "axios";

const api = axios.create({
    method: 'GET',
    baseURL: 'https://api.api-ninjas.com/v1/recipe?query=',
    headers: { 'X-Api-Key': 'vNzLaBLYTdz9vW2RRG5hYA==gmXufX8KDottj6HR'},
    contentType: 'application/json',
    })

export default api

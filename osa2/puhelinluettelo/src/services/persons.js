import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log(request)
    return request.then(response => response.data)
    }

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
    }

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updateNumber = (person, updatedPerson) => {
    console.log(updatedPerson)
    const request = axios.put(`${baseUrl}/${person.id}`, updatedPerson)
    return request.then(response => response.data)
}

export default { getAll, create, remove, updateNumber }
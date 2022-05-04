/*
* The module returns an object that has three functions (getAll, create, and update) as its properties that deal with notes. 
*  The functions directly return the promises returned by the axios methods.
*/

import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    console.log('getAll', baseUrl)
    const request =  axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
      }
    console.log('request', request)
    return request.then(response => response.data.concat(nonExisting))
    /*
    * Can be implemented with the following code:
    * return request.then(response => {
    *    return response.data
    *    })
    * 
    */
}

const create = newObject => {
    console.log('create', newObject, baseUrl)
    const request =  axios.post(baseUrl, newObject)
    console.log('request', request)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    console.log('update', id, newObject, baseUrl)
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    console.log('request', request)
    return request.then(response => response.data)
}

const deleteNote = (id) => {
    console.log('delete', id, baseUrl)
    const request = axios.delete(`${baseUrl}/${id}`)
    console.log('request', request)
    return request.then(response => response.data)
}

export default { getAll, create, update, deleteNote }
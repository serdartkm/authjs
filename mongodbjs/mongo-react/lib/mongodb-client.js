'use strict';

import axios from 'axios'
const mongoCollection = ({collection,db}) => {

    return {
        findOne: ({filter}) => {
            return axios.get(`/mongodb`, { params: { reqType: "findOne", collection,db, filter } })
        },
        find: ({filter}) => {
            return axios.get(`/mongodb`, { params: { reqType: "find", collection,db, filter } })
        },
        insertOne: (data) => {
            return axios.post(`/mongodb`, { params: { reqType: "insertOne", collection,db, data } })
        },
        updateOne: ({filter,data}) => {
            return axios.put(`/mongodb`, { params: { reqType: "updateOne", collection,db, filter,data } })
        },
        deleteOne: ({filter}) => {
            return axios.delete(`/mongodb`, { params: { reqType: "deleteOne", collection,db, filter } })
        }
    }
}


export default mongoCollection


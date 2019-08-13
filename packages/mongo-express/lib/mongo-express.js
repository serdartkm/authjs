'use strict';
const ObjectID = require('mongodb').ObjectID
const MongoClient = require("mongodb").MongoClient;
import { find, findOne, updateOne, deleteOne, insertOne } from './crud'

export default ({ mongoUrl }) => {
    let client = null;
    (async () => {
        try {
            client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
        } catch (error) {
            console.log("mongodb connection error", error)
        }
    })()

    return async (req, res, next) => {
        if (req.path === "/mongodb") {
            const { reqType, data, filter, collection, db } = req.query
            const criteria = JSON.parse(filter)
            const criteriaId = criteria._id === undefined ? { ...criteria } : { ...criteria, _id: new ObjectID(criteria._id) }
            const database = await client.db(db);
            const dbCollection = database.collection(collection)
            switch (reqType) {
                case "findOne":
                    return findOne({ filter: criteriaId, collection: dbCollection, res })
                case "find":
                    return find({ collection: dbCollection, res, filter: criteriaId })
                case "updateOne":
                    return updateOne({ filter: criteriaId, data, collection: dbCollection, res })
                case "deleteOne":
                    return deleteOne({ filter: criteriaId, collection: dbCollection, res })
                case "inserOne":
                    return insertOne({ data, collection: dbCollection, res })
                default:
                    return null;
            }

        }

        else {
            next()
        }
    }
}

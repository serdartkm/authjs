
const ObjectID = require('mongodb').ObjectID

const insertOne = async ({data,res,collection})=>{
try {
    const result =collection.insertOne({data})
    res.status(200).send({result})
} catch (error) {
    res.status(400).send({serverError:error})
}
}

const findOne = async ({ id, res, collection }) => {
    try {
        const result = await collection.findOne({ _id: new ObjectID(id) })
        res.status(200).send({ result })
    } catch (error) {
        res.status(400).send({ serverError: error })
    }

}

const search = async ({ filter, res, collection }) => {
    try {
        const result = await collection.find({filter}).toArray()
        res.status(200).send({ result })
    } catch (error) {

    }
}

const findAll = async ({ collection, res }) => {
    try {
        const result = await collection.find({}).toArray()
        res.status(200).send({ result })
    } catch (error) {
        res.status(400).send({ serverError: error })
    }

}


const updateOne = async ({ id, data, collection, res }) => {

    try {

        const result = await collection.findOneAndUpdate({ _id: new ObjectID(id) }, { $set: { ...data } })
        res.status(200).send({ result })
    } catch (error) {

        res.status(400).send({ serverError: error })

    }

}

const deleteOne = async ({ id, collection, res }) => {
    try {
        const result = await collection.deleteOne({ _id: new ObjectID(id) })
        res.status(200).send({ result })
    } catch (error) {
        res.status(400).send({ serverError: error })
    }
}


exports.crud= ({ req, res, collection }) => {
    const { requestType, data, filter } = req.query
    switch (requestType) {
        case "findOne":
            return findOne({ id, collection, res })
        case "findAll":
            return findAll({ collection, res, filter })
        case "updateOne":
            return updateOne({ id, data, collection, res })
        case "deleteOne":
            return deleteOne({ id, collection, res })
        case "search":
            return search({ filter, collection, res })
        case "inserOne":
            return insertOne({data,collection,res})
        default:
            return null;
    }
}
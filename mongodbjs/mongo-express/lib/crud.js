

 exports.insertOne = async ({data,res,collection})=>{
try {
    const result =collection.insertOne({data})
    res.status(200).send({result})
} catch (error) {
    res.status(400).send({serverError:error})
}
}

 exports.findOne = async ({ filter, res, collection }) => {
    try {
        const result = await collection.findOne({...filter})
        res.status(200).send({ result })
    } catch (error) {
        res.status(400).send({ serverError: error })
    }

}

 exports.find = async ({ collection, res,filter }) => {

    try {
        const result = await collection.find({...filter}).toArray()
        res.status(200).send({ result })
    } catch (error) {
        res.status(400).send({ serverError: error })
    }

}


 exports.updateOne = async ({ filter, data, collection, res }) => {

 try {
        const result = await collection.updateOne({...filter}, { $set: { ...data } })
        res.status(200).send({ result })
    } catch (error) {

        res.status(400).send({ serverError: error })

    }

}

 exports.deleteOne = async ({ filter, collection, res }) => {
    try {
        const result = await collection.deleteOne({...filter})
        res.status(200).send({ result })
    } catch (error) {
        res.status(400).send({ serverError: error })
    }
}



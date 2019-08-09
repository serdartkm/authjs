

const getUsers=async({req,res,collection})=>{
try {
    const users = await collection.find().toArray()
    res.status(200).send({users})
} catch (error) {
    res.status(200).send({serverError:error})
}
}

const findUser=()=>{

}

const updateUser=()=>{

}

const deleteUser=()=>{

}

const users = ({req,res,collection})=>{
    
    if(req.method==="GET"){
        getUsers({req,res,collection})
    }
    if(req.method==="POST"){

    }
    if(req.method==="PUT"){

    }
    if(req.method==="DELETE"){

    }   

}

export default users
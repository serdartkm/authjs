import React from 'react'
import mongoReact from './mongodb-client'
export const MongodbContext = React.createContext()


class MongodbProvider extends React.Component{
  
     state={objects:[],loading:false}
  
    findOne=({filter})=>{
        const {collection,db}= this.props
        mongoReact({ collection, db}).findOne({ filter }).then((result) => {
            const { data } = result
            console.log("findOne result", result)
            // this.setState({ users: data.result,loading:false })
        }).catch(error => {
            // this.setState({serverError:error,loading:false})
        })
    }

    find=()=>{
        const {collection,db}= this.props
        mongoReact({ collection, db}).find({ filter }).then((result) => {
            const { data } = result
            console.log("findOne result", result)
            // this.setState({ users: data.result,loading:false })
        }).catch(error => {
            // this.setState({serverError:error,loading:false})
        })
    }

    deleteOne=()=>{
        const {collection,db}= this.props
        mongoReact({ collection, db}).deleteOne({ filter }).then((result) => {
            const { data } = result
            console.log("findOne result", result)
            // this.setState({ users: data.result,loading:false })
        }).catch(error => {
            // this.setState({serverError:error,loading:false})
        })
    }

    updateOne=()=>{
        const {collection,db}= this.props
        mongoReact({ collection, db}).updateOne({ filter }).then((result) => {
            const { data } = result
            console.log("findOne result", result)
            // this.setState({ users: data.result,loading:false })
        }).catch(error => {
            // this.setState({serverError:error,loading:false})
        })
    }

    insertOne=()=>{
        const {collection,db}= this.props
        mongoReact({ collection, db}).insertOne({ filter }).then((result) => {
            const { data } = result
            console.log("findOne result", result)
            // this.setState({ users: data.result,loading:false })
        }).catch(error => {
            // this.setState({serverError:error,loading:false})
        })
    }

    setInitialState =()=>{

    }

    render(){
        const {children}= this.props
        return(<MongoContext.Provider value={{
              setInitialState:this.setInitialState,
              find:this.find,
              findOne:this.findOne,
              updateOne:this.updateOne,
              insertOne:this.insertOne,
              deleteOne:this.deleteOne
              }}>
            <div>{children}</div>
        </MongoContext.Provider>)
    }

}


export default MongodbProvider
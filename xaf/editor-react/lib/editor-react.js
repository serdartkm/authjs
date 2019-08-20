import React from 'react'
import { initialValidationState } from '@authjs/validation'
import mongoDbClient from '@mongodbjs/react'
class EditorReact extends React.Component {

    state = { objects: [], serverError: "", loading: false, selectedObject: null, validation: initialValidationState }
    componentWillMount() {
        const {initialState}= this.props
        this._setInitialState({initialState})
    }
  componentDidMount(){
      console.log("Editor React mounted")
      this.find()
  }
    _setInitialState=()=>{
       const {initialState}= this.props
       if(initialState !==undefined){
           this.setState((prevState)=>({...prevState,...initialState}))
       }
    }
    onChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        this.setState({ selectedObject: { [name]: value } })
    }

    find = () => {
        
        const {collection,db}= this.props
        const filter = {}
        mongoDbClient({ collection, db }).find({ filter }).then((result) => {
            const { data } = result
            this.setState({ objects: data.result, loading: false })
        }).catch(error => {
            this.setState({ serverError: error, loading: false })
        })
        
    }

    findOne = ({ id }) => {
        const {collection,db}= this.props
        const filter = { _id: id }
        console.log("findOne", id)
        mongoDbClient({ collection, db }).findOne({ filter }).then((result) => {
            const { data } = result
            console.log("findOne result", result)
            // this.setState({ users: data.result,loading:false })
        }).catch(error => {
            // this.setState({serverError:error,loading:false})
        })
    }
    selectOne = ({ _id }) => { 
        this.setState({ selectedObject: this.state.objects.find((u) => u._id === _id) })
    }

    updateOne = ({ id, data }) => {
        const {collection,db}= this.props
        const filter = { _id: id }
        console.log("findOne", id)
        mongoDbClient({ collection, db}).findOne({ filter }, { data }).then((result) => {
            const { data } = result
            console.log("findOne result", result)
            // this.setState({ users: data.result,loading:false })
        }).catch(error => {
            // this.setState({serverError:error,loading:false})
        })
    }

    deleteOne = () => {
        const {collection,db}= this.props
        const { _id } = this.state.selectedObject
        const filter = { _id }
        mongoDbClient({ collection, db }).deleteOne({ filter })
            .then((result) => {
            this.setState((state) => ({ objects: state.objects.filter((u) => u._id !== _id) }))
                const { data } = result
                console.log("deleteOne result", result)

            })
            .catch(error => {
                console.log("deleteOne error", error)
            })
    }


     render() {
        const { children } = this.props
        const {  validation} = this.state
        console.log("state---",this.state)
        return (<div>{children({onChange: this.onChange,
                    state:{...this.state},
                    validation,
                    selectOne:this.selectOne,
                    find: this.find,
                    deleteOne: 
                    this.deleteOne,
                    updateOne: this.updateOne})}</div>
        )
    }

}

export default EditorReact

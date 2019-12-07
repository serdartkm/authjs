import {h} from 'preact'
import {useState} from 'preact/hooks'

export default function useFormInput(state){

    const [value,setValue]= useState(state)

    function onInput(e) {
        const { name } = e.target;
   
        setValue((prevState)=>{ return {...prevState, [name]: e.target.value }});
      }

    return {onInput, ...value}

}
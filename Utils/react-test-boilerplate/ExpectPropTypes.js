import React from 'react'
import checkPropTypes from 'check-prop-types'

const ExpectPropTypes =(Component,expectedProps)=>{
 describe('ExpectedPropTypes',()=>{
    const propsErr= checkPropTypes(Component.propTypes,expectedProps,'props',Component.name)
    it(`Type Checking for ${Component.name} defined`,()=>{
        expect(Component.propTypes).toBeDefined()

    })
    it(`Should not throw a warning ${Component.name}`, () => {
        expect(propsErr).toBeUndefined()
      })

 })
}

export default ExpectPropTypes


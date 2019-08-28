import React from 'react'
import './circle.css'
import classNames from 'classnames'

const CircularPercentageBar = ({percent}) => {
   // console.log("percent---",percent)
    return (<div className={classNames('c100',{[`p${percent}`]:`p${percent}`})}>

        <span>{percent}%</span>

        <div className="slice">

            <div className="bar"></div>

            <div className="fill"></div>

        </div>

    </div>
    )
}

export default CircularPercentageBar


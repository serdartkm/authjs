import React from 'react'

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { MdWork } from 'react-icons/md'
import {DiReact,DiJavascript1,} from 'react-icons/di'
import {DiMongodb} from 'react-icons/di'
import { Link } from "react-router-dom";


const IconSelected =({icon})=>{
console.log("icon....",icon)
switch(icon){
    case "DiReact":
        return <DiReact/>
    case "DiMongodb":
        return <DiMongodb />
    case "DiJavascript1":
        return<DiJavascript1/>
        default:
                return <MdWork/> 
}
}

const IconColor =({icon})=>{
    switch(icon){
        case "DiReact":
            return "#00bcd4"
        case "DiMongodb":
            return "#4caf50"
        case "DiJavascript1":
            return "#f9a825"
        default:
            return "#29b6f6"
    }
}
const  TimeLine =({data})=> {


  
        return (
            <div>
         
            <VerticalTimeline>
                {
                    data.sort((a, b) => new Date(b.startdate) - new Date(a.startdate)).map((c, i) => {
                        const tools = c.toolbox.map((r) => r)
                        const testing =c.testing.map((t)=>t)
                        return <VerticalTimelineElement
                        key={i}
                            date={ c.workingon ? new Date(c.startdate).toLocaleDateString()+" working on ":new Date(c.startdate).toLocaleDateString() }
                            iconStyle={{ background: IconColor({icon:c.tag}), color:"#fafafa" }}
                            icon={<img src={`./icons/${c.tag}.png`} className="rounded" style={{width:80,height:80}}/>}
                        >
                            <h3 className="vertical-timeline-element-title">{c.title}</h3>
                            <p className="vertical-timeline-element-subtitle">DEV TOOLS USED: {(' ')} {tools.join(', ')}</p>
                            <p className="vertical-timeline-element-subtitle">TEST TOOLS USED: {(' ')} Cypress.io</p>
                            <p className="vertical-timeline-element-subtitle">CI/CD : {(' ')} Travice CI</p>
                            <p>
                                DESCRIPTION: {c.description}
                            </p>
                            <br />
                            <div  style={{ display: "flex", justifyContent: "space-between" }}>
                                {c.gitlink && <Link className="btn btn-primary" target="_blank"  to={c.gitlink}> View Source Code</Link>}

                                <Link className="btn btn-primary"  to={c.codesandboxlink} >View Demo</Link>
                            </div>
                        </VerticalTimelineElement>
                    })
                }

            </VerticalTimeline>
            </div>
        )
    
}





export default TimeLine




import React, { Component } from 'react'
import 'react-vertical-timeline-component/style.min.css';

import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
class AboutMe extends Component {
    render() {
        return (
            <div>
                About Me
                <Timeline lineColor={'#ddd'}>
                <TimelineItem
                        key="001"
                        dateText="September 25, 2018"
                        style={{ color: '#e86971' }}
                    >
                        <h3 className="vertical-timeline-element-title">MongoDB for Node.js Developers</h3>
                        <h4 className="vertical-timeline-element-subtitle">MongoDB University</h4>
                        <p>
                            MongoDB for Node.js Developers Course Completion
    </p>

                   
                            <a target="_blank" className="btn btn-primary" href="http://university.mongodb.com/course_completion/b1ff6663-8c16-410b-8deb-aed20fbe" variant="outline-primary">  View Certificate</a>


                    </TimelineItem>

                <TimelineItem
                        key="002"
                        dateText=" Nov 21, 2017"
                        style={{ color: '#e86971' }}
                    >
                        <h3 className="vertical-timeline-element-title">MongoDB Basics</h3>
                        <h4 className="vertical-timeline-element-subtitle">MongoDB University</h4>
                        <p>
                        MongoDB Basics Course Completion
                         </p>

                     
                            <a target="_blank" className="btn btn-primary" href="http://university.mongodb.com/course_completion/b7e390a6-1591-4c54-b4bd-f6a92e7b" variant="outline-primary">  View Certificate</a>
                      
                    </TimelineItem>
           
                    <TimelineItem
                        key="003"
                        dateText="October 20, 2017"
                        style={{ color: '#e86971' }}
                    >
                        <h3 className="vertical-timeline-element-title">Front End Development</h3>
                        <h4 className="vertical-timeline-element-subtitle">freeCodeCamp's</h4>
                        <p>
                            Certification, representing approximately 400 hours of coursework
    </p>

                      
                            <a target="_blank" className="btn btn-primary" href="https://www.freecodecamp.org/certification/serdartkm/legacy-front-end" variant="outline-primary">  View Certificate</a>

                            <a target="_blank" className="btn btn-primary" href="https://www.freecodecamp.org/serdartkm" variant="outline-primary">  See Timeline</a>
                    


                    </TimelineItem>
                </Timeline>
            </div>
        )
    }
}

export default AboutMe
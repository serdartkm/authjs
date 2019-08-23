import React from 'react'
import classNames from 'classnames'

class ViewSwitcher extends React.Component {
    state = { selected: 0 }

    selectTab = (selected) => {
        this.setState({ selected })
    }
 

    render() {
        //const { CodeComponent, DemoComponent } = this.props
        const { selected } = this.state
        const { children } = this.props
        return (
            <div style={{ marginTop: 10 }}><ul className="nav nav-pills d-flex justify-content-end ">
                <li className="nav-item" >
                    <button className={classNames('nav-link', { 'active': selected === 0 })} onClick={() => { this.selectTab(0) }}>Demo</button>
                </li>
                <li className="nav-item" >
                    <button className={classNames('nav-link', { 'active': selected === 1 })} onClick={() => { this.selectTab(1) }}>Code</button>
                </li>

            </ul>

                <div>{children({ selected })}</div>
            </div>)
    }
}

export default ViewSwitcher
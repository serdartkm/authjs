import React from 'react'
import classNames from 'classnames'
class TabBar extends React.Component {

    state = { selected: 0 }

    selectTab = (selected) => {
        this.setState({ selected })
    }
    componentDidMount(){
        Prism.fileHighlight();
    }
    componentWillUpdate(){
    Prism.fileHighlight();   
    }
    render() {
        const { selected } = this.state
        const { children } = this.props
        return (<div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button className={classNames('nav-link',{'active': selected===0})} onClick={() => { this.selectTab(0) }}>Front end code</button>
                </li>
                <li className="nav-item">
                    <button className={classNames('nav-link',{'active': selected===1})} className="nav-link" onClick={() => { this.selectTab(1) }}>Back end code</button>
                </li>
            </ul>
            <div style={{paddingBottom:10}}>
                {children({ selectedTab:selected })}
            </div>

        </div>)
    }

}

export default TabBar
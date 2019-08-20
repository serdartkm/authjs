







const AsyncButton = ({ title, loading, onClick, disabled }) => {
    return (
        <div style={{position:"relative"}}>
         <button style={{ width: "100%", marginTop:3, marginBottom:3 }} type="button" className="btn btn-outline-primary" onClick={onClick} disabled={disabled || loading}>{loading ?<div><ProgressLoader/><div style={{opacity:0}}>{title}</div></div>:<div>{title}</div>}</button>

        </div>
    )
}

export default AsyncButton

const ProgressCircle = ({ selected }) => {
    return (
        <div style={{
            height: 2,
            width: 2,
            padding: 3,
            borderRadius: 50,
            marginLeft: 4,
            textAlign: "center",
            backgroundColor: selected ? "#1a237e" : "#9fa8da"
        }}>

        </div>
    )
}




class ProgressLoader extends React.Component {

    state = {
        selected: 0
    }
    componentWillMount() {
        this.setState({ selected: 0 })
    }
    componentDidMount() {

        this.interval = setInterval(() => {

            if (this.state.selected === 0) {
                this.setState({ selected: 1 })

            }

            else if (this.state.selected === 1) {
                this.setState({ selected: 2 })

            }
            else if (this.state.selected === 2) {
                this.setState({ selected: 0 })

            }

        }, 200)

    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {

        const { selected } = this.state

        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                width:"100%",
            
                position: 'absolute',
                top:20,
                left:0
            }}>
                <ProgressCircle selected={selected === 0} />
                <ProgressCircle selected={selected === 1} />
                <ProgressCircle selected={selected === 2} />
            </div>
        )
    }
}


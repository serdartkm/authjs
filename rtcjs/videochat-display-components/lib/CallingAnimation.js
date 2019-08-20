




const AsyncButton = ({ title, loading=true, onClick, disabled }) => {
    return (
        <div style={{position:"relative"}}>
         <ProgressLoader/>

        </div>
    )
}

export default AsyncButton

const ProgressCircle = ({ selected }) => {
    return (
        <div style={{
            height: 10,
            width: 10,
            padding: 3,
            borderRadius: 50,
            margin: 6,
            textAlign: "center",
            backgroundColor: selected ? "#2e7d32" : "#9fa8da"
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
                this.setState({ selected: 3 })

            }
            else if (this.state.selected === 3) {
                this.setState({ selected: 4 })

            }
            else if (this.state.selected === 4) {
                this.setState({ selected: 0 })

            }

        }, 400)

    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {

        const { selected } = this.state

        return (
            <div style={{
                
        
                width:"100%",
            
            }}>
                 <ProgressCircle selected={selected === 4} />
                 <ProgressCircle selected={selected === 3} />
                <ProgressCircle selected={selected === 2} />
                <ProgressCircle selected={selected === 1} />
                <ProgressCircle selected={selected === 0} />
                
                
               
               
            </div>
        )
    }
}


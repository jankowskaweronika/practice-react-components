const root = createRoot(document.querySelector('#root'));

class App extends React.Component {
    state = {
        counter: 0,
    };

    componentDidMount() {
        console.log('componentDidMount');
        this.interval = setInterval(() => {
            this.setState({
                counter: this.state.counter + 1,
            });
        }, 1000);
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
        if (this.state.counter >= 10) {
            root.unmount();
        }
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
        clearInterval(this.interval);
    }
    render() {
        console.log('render');

        return <h1>{this.state.counter}</h1>;
    }
}

root.render(<App />);
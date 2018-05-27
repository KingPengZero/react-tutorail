import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/Todo';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.ref = null;
  }

  componentDidMount() {
    console.log('Index', 'componentDidMount');
  }

  updateState = () => {
    this.setState({})
  };

  render() {
    return (
      <div>
        <button onClick={this.updateState}>修改state</button>

        <TodoList ref={ref => this.ref = ref}></TodoList>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("app"));
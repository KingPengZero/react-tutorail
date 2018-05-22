import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/Todo';

class App extends React.Component {
    render() {
        return (
            <div>
                <TodoList></TodoList>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));
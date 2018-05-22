import React from 'react';
import List from './List';
import "./style.css";

export default class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [
                {text: '吃饭', id: 1},
                {text: '睡觉', id: 2},
                {text: '打豆豆', id: 3},
            ],
            text: ''
        };
    }

    componentWillMount() {
        console.log('Todo', 'componentWillMount');
    }

    componentDidMount() {
        console.log('Todo', 'componentDidMount');
    }


    handleChange = (e) => {
        this.setState({text: e.target.value});
    }

    handleKeyUp = (e) => {
        const text = this.state.text;
        if (e.keyCode === 13 && text.trim().length) {
            const newItem = {
                text: text,
                id: Date.now()
            };
            this.setState((prevState) => ({
                items: prevState.items.concat(newItem),
                text: ''
            }));
        }
    }

    deleteItem = (id) => {
        this.setState({
            items: this.state.items.filter(item => item.id !== id)
        });
    }


    render() {
        return (
            <div>
                <input
                    className="input"
                    placeholder="Add a todo"
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyUp}
                    value={this.state.text}
                />
                <List items={this.state.items} deleteItem={this.deleteItem}/>
            </div>
        );
    }
}
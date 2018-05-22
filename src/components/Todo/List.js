import React from 'react';

export default class List extends React.Component {
    handleClick(id) {
        this.props.deleteItem(id);
    }


    componentWillMount(){
        console.log('List', 'componentWillMount');
    }

    componentDidMount(){
        console.log('List', 'componentDidMount');
    }

    componentWillReceiveProps(props,nextProps) {
        console.log('List', 'componentWillReceiveProps');
        console.log(props, nextProps);
    }

    render() {
        console.log('List', 'render');

        return (
            <ul>
                {
                    this.props.items.map((item, index) => (
                        <li key={item.id}>
                            <div>
                                <span>{index + 1}. {item.text}</span>
                                <button onClick={this.handleClick.bind(this, item.id)}>
                                    删除
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        );
    }
}
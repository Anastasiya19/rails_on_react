import React from 'react';

export default class Static extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: this.props.name };
        // console.log("this.state--------", this.state)
    }

    updateName = (name) => {
        this.setState({ name });
        console.log("this.props--------", this.props)
    };

    render() {
        return (
            <div>
                {
                    this.props.todos.map(function(todo){
                        return (<div>
                            <form>
                                <label>
                                    <input
                                        name="isTodo"
                                        type="radio"
                                    />
                                </label>
                                {todo.todo}
                            </form>
                        </div>)
                    })
                }

            </div>
        );
    }
}

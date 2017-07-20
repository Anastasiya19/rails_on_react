import React from 'react';

export default class Todos extends React.Component {

    // getInitialState() {
    //     return {
    //         text: ''
    //     }
    // }
    
    constructor(props) {
        super(props);
        this.state = {
            todos: this.props.todos,
            text: ''
        };
        
        this._createTodo();

        // console.log("this.state--------", this.state)
    }

    // updateName = (todo) => {
    //     this.setState({ todo });
    //     console.log("this.props--------", this.props)
    // };
    
    _createTodo (todo) {
        // var text = this.state.text.trim();
        console.log("this", this)

        // if (text) {
        //     TodoActionsCreators.createTodo(text);
        // }
        //
        // this.setState({text: ''});
    }
    
    _onKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            // console.log("this", this)

            this._createTodo(event.target.value);
        }
    }

    // _onChange() {
    //     this.setState({text: event.target.value});
    // }

    _renderTodos() {
        return this.state.todos.map((todo)=>{
            return(
                <div  className="form-control"  key={todo.id}>{todo.todo}</div>
            )
        })
    }

    render() {
        axios.get('/{user.id}')
            .then(function (response) {
                console.log(this);
            })
            .catch(function (error) {
                console.log(error);
            });


        axios.get('/todos', {
            params: {
                ID: 5
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });




        return (
            <div className="body-todo">
                <h2 className="todo-fount">Todo List </h2>
                <input
                    type="text"
                    className="form-control"
                    placeholder=" Add new todo"
                    onKeyDown={ this._onKeyDown.bind(this) }
                    // onChange={ this._onChange }
                    defaultValue={ this.state.text }
                    // onClick={ this._createTodo }
                />
                { this._renderTodos() }
            </div>
        );
    }
}

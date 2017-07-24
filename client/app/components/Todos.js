import React, {Component} from 'react';
import {render} from 'react-dom';
import Switch from 'rc-switch';


let token = document.getElementsByName('csrf-token')[0].getAttribute('content');
axios.defaults.headers.common['X-CSRF-Token'] = token;
axios.defaults.headers.common['Accept'] = 'application/json';

export default class Todos extends React.Component {

    getInitialState() {
        return {
            text: ''
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            todos: this.props.todos,
            switched: false,
            // user_id :true

        };

        this.toggleSwitch = this.toggleSwitch.bind(this);
    }

    toggleSwitch(switched, todos) {


       var x =  this.state.todos.map((todo) => {todo});

        axios.post('/todos', {

            switched: {switched: switched}
        })
            .then(function (response) {
                console.log("response-------", response);

              todo.todo_valid == switched
                // this.setState({todo_valid: !this.state.switched});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    _createTodo(todo) {

        axios.post('/todos', {
            todo: {todo: todo}
        }).then((response)=>{
            this.state.todos.push(response.data);
            this.setState({todo: this.state.todos});
            // this.setState({text: ''});
            this.refs.newAddText.value = '';
        }).catch((error)=>{
            console.log(error);
        });
    }

    _onKeyDown(event) {
        if (event.key === 'Enter') {
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
                <div className="form-control"  key={todo.id}>
                    <Switch onChange={ this.toggleSwitch.bind(this)}   />
                    {todo.todo}
                </div>
            )
        })
    }

    render() {
        return (
            <div className="body-todo">
                <h2 className="todo-fount">Todo List </h2>
                <input
                    type="text"
                    className="form-control"
                    ref="newAddText"
                    placeholder=" Add new todo"
                    // onClick = {this.state.user_id}
                    // onChange={ this._onChange }
                    // defaultValue={ this.state.text }
                    onKeyPress={ this._onKeyDown.bind(this) }
                    // onClick={ this._createTodo }
                />
                { this._renderTodos() }
            </div>
        );
    }
}

import React, {Component} from 'react';
import {render} from 'react-dom';
import Switch from 'rc-switch';
import InlineEdit from 'react-edit-inline';

let token = document.getElementsByName('csrf-token')[0].getAttribute('content');
axios.defaults.headers.common['X-CSRF-Token'] = token;
axios.defaults.headers.common['Accept'] = 'application/json';


// const myImg = require('./assets/images/backbg.png');

export default class Todos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: this.props.todos,
            switched: false,
            message: ' '
        };
    }
    
    dataChanged(id, mess) {
        debugger
        // this.state.todos.todo = mess.message
        axios.put(`/todos/${id}/update_todo`, {
            todo: mess.message
        })
        .then((response) => {
            this.state.todos[index]= response.data;
            // this.setState({todo: this.state.todos.todo});
            this.setState({todo: mess});
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    customValidateText(text) {
        return (text.length > 0 && text.length < 600);
    }

    deleteTodo(id){
        this.state.todos = this.state.todos.filter((todo) => {
            if(todo.id !== id) return todo;
        });
        axios.delete(`/todos/${id}`, {
        }).then((response)=>{
            console.log(response);
            this.setState({todo: this.state.todos});
        }).catch((error)=>{
            console.log(error);
        });
    }


    toggleSwitch(id, index) {
        axios.put(`/todos/${id}/switch`)
            .then((response) => {
                this.state.todos[index] = response.data;
                this.setState({todos: this.state.todos});
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
            this.setState({todo: this.state});
            this.refs.newAddText.value = '';
        }).catch((error)=>{
            console.log(error);
        });
    }

    _onKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this._createTodo(event.target.value);
        }
    }

    sortTodos(sort){
        axios.get(`/todos`, {
            params: {sort: sort}
        })
        .then((response) => {
            this.setState({todos: response.data});
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    _renderTodos() {
        return this.state.todos.map((todo, index)=>{
            return(
                <div className="form-control" key={todo.id}>
                    <Switch
                        onChange={this.toggleSwitch.bind(this, todo.id, index)}
                        checked={todo.todo_valid}
                    />
                    <InlineEdit
                        className="inlineEdit"
                        validate={this.customValidateText}
                        activeClassName="editing"
                        text={todo.todo}
                        paramName="message"
                        change={this.dataChanged.bind(this, todo.id)}
                        style={{
                            minWidth: 450,
                            display: 'inline-block',
                            margin: 0,
                            fontSize: 15,
                            outline: 0
                         }}
                    />
                    <button className="delete-button" onClick={this.deleteTodo.bind(this, todo.id)}>x</button>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="body-todo">
                <h2 className="todo-fount">Todo List </h2>
                <img src="/backgr"/>
                <input
                    type="text"
                    className="form-control"
                    ref="newAddText"
                    placeholder=" Add new todo"
                    onKeyPress={ this._onKeyDown.bind(this) }
                />
                {this._renderTodos()}
                <div className="buttons">
                    <button className="button-active" onClick={this.sortTodos.bind(this, "all")}>All</button>
                    <button className="button-active" onClick={this.sortTodos.bind(this, "active")}>Active</button>
                    <button className="button-active" onClick={this.sortTodos.bind(this, "inactive")}>No active</button>
                </div>
            </div>
        );
    }
}

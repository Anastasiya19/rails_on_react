import React, {Component} from 'react';
import {render} from 'react-dom';
import Switch from 'rc-switch';
import InlineEdit from 'react-edit-inline';


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
            message: ' 1111',
        };
        this._renderTodos = this._renderTodos.bind(this);
        // this.filterTodos = this.filterTodos.bind(this)
    }

    dataChanged(id, mess) {
        axios.put(`/todos/${id}/update_todo`, {
            todo: mess.message
        })
        .then((response) => {
            this.state.todos[index]= response.data;
            this.setState({todo: this.state.todos});
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    customValidateText(text) {
        return (text.length > 0 && text.length < 200);
    }

    deleteTodo (id, index){

        axios.delete(`/todos/${id}`, {
        }).then((response)=>{
            var removed = this.state.todos.splice(index, 1);
            this.setState({todo: this.state.removed});
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
            this.setState({todo: this.state.todos});
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

    todoActive(){
        debugger
        let filterTodo= []
        this.state.todos.filter(function(todo_filter) {

            if (todo_filter.todo_valid == true) {
                return filterTodo.push(todo_filter)
            }
        })
        this.state.todos = filterTodo
        this.setState({newTodo: filterTodo});
    }

    todoNoActive() {
        debugger
        let filterTodo= []
        this.state.todos.filter(function(todo_filter) {

            if (todo_filter.todo_valid == false) {
                return filterTodo.push(todo_filter)
            }
        })
        this.state.todos = filterTodo
        this.setState({todo: filterTodo});
    }

    // todoAll(){
    //
    //
    // }

    _renderTodos(filterTodo) {
        debugger
        let shownTodos = this.props.todos.filter(function (todo_filter) {
            switch (this.props.todos) {
                case !this.state.todos:
                    return todo_filter;
                case filterTodo:
                    return todo_filter;
                default:
                    return todo_filter;
            }
        }, this);

        return shownTodos.map((todo, index)=>{
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
                            outline: 0,
                         }}
                    />
                    <button  className="delete-button" onClick={this.deleteTodo.bind(this, todo.id, index)}>x</button>
                </div>
            )
        })
    }

    render() {
        debugger
        return (
            <div className="body-todo">
                <h2 className="todo-fount">Todo List </h2>
                <input
                    type="text"
                    className="form-control"
                    ref="newAddText"
                    placeholder=" Add new todo"
                    onKeyPress={ this._onKeyDown.bind(this) }
                />
                {this._renderTodos()}
                <button>All</button>
                <button onClick={this.todoActive.bind(this)}>Active</button>
                <button onClick={this.todoNoActive.bind(this)}>No active</button>
            </div>
        );
    }
}

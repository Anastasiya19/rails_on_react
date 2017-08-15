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
            initalState: this.props.todos,
            switched: false,
            message: ' '
        };
        this._renderTodos = this._renderTodos.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        debugger
        let activeTodos=[];
        let noActiveTodos=[];
        this.state.todos.map(function(todosItm){
                switch(todosItm.todo_valid){
                    case true: return(
                        activeTodos.push(todosItm)
                    );
                        break;
                    case false: return(
                        noActiveTodos.push(todosItm)
                    )
                        break;
                }
        });
        this.state.itm = noActiveTodos
        this.state.data = activeTodos
    }

    updateData (config) {
        this.setState(config);
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
        return (text.length > 0 && text.length < 600);
    }

    deleteTodo(id, index){
        debugger
        this.state.todos = this.state.todos.filter((todo) => {
            if(todo.id !== id) return todo;
        });
        this.state.itm = this.state.itm.filter((todo) => {
            if(todo.id !== id) return todo;
        });
        this.state.data = this.state.data.filter((todo) => {
            if(todo.id !== id) return todo;
        });
        this.state.initalState = this.state.initalState.filter((todo) => {
            if(todo.id !== id) return todo;
        });

        axios.delete(`/todos/${id}`, {
        }).then((response)=>{
            console.log(response);
            this.updateData(this.state)
        }).catch((error)=>{
            console.log(error);
        });
    }

    toggleSwitch(id, index) {
        debugger
        axios.put(`/todos/${id}/switch`)
            .then((response) => {
                this.state.todos[index] = response.data;
                this.updateData(this.state);
                this.initalState= this.state.todos;
                this.setState({todos: this.state});
                this.setState({initalState: this.state});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    _createTodo(todo) {
        debugger
        axios.post('/todos', {
            todo: {todo: todo}
        }).then((response)=>{
            this.state.todos.push(response.data);
            this.state.initalState.push(response.data);
            this.updateData(this.state)
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

    // dataChanged(id, mess) {
    //     axios.put(`/todos/${id}/update_todo`, {
    //         todo: mess.message
    //     })
    //         .then((response) => {
    //             this.state.todos[index]= response.data;
    //             this.setState({todo: this.state.todos});
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

    todoActive(){
        debugger
        // this.state.todos = this.state.todos.filter((todo) => {
        //     if(todo.todo_valid == true) return todo;

        axios.get(`/todos`, {

        })
            .then((response) => {
                console.log("response", response)
                // this.state.todos[index]= response.data;
                this.setState({todo: this.state.todos});
            })
            .catch(function (error) {
                console.log(error);
            });
        // });
    }

    todoNoActive() {
        debugger
        // this.state.todos = this.state.todos.filter((todo) => {
        //     if(todo.todo_valid == false) return todo;

            axios.get(`/todos/${todo.id}/todo_active`, {

            })
                .then((response) => {
                    console.log("response", response)
                    // this.state.todos[index]= response.data;
                    this.setState({todo: this.state.todos});
                })
                .catch(function (error) {
                    console.log(error);
                });
        // });
    }

    todoAll(){

        debugger
            axios.get(`/todos`, {

            })
                .then((response) => {
                    console.log("response", response)
                    // this.state.todos[index]= response.data;
                    this.setState({todo: this.state.todos});
                })
                .catch(function (error) {
                    console.log(error);
                });
    }

    _renderTodos() {
        debugger
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
                    <button className="delete-button" onClick={this.deleteTodo.bind(this, todo.id, index)}>x</button>
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
                    onKeyPress={ this._onKeyDown.bind(this) }
                />
                {this._renderTodos()}
                <div className="buttons">
                    <button className="button-active" onClick={this.todoAll.bind(this)}>All</button>
                    <button className="button-active" onClick={this.todoActive.bind(this)}>Active</button>
                    <button className="button-active" onClick={this.todoNoActive.bind(this)}>No active</button>
                </div>
            </div>
        );
    }
}

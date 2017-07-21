import React from 'react';

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
            user_id :true

        };

        this.toggleSwitch = this.toggleSwitch.bind(this);
    }

    toggleSwitch = () => {
        this.setState(prevState => {
            return {
                switched: !prevState.switched
            };
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
                <div  className="form-control"  key={todo.id}>
                    <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round"></span>
                    </label>{todo.todo}
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
                    // onChange={ this._onChange }
                    value={ this.state.text }
                    // onClick={ this._createTodo }
                />
                { this._renderTodos() }
            </div>
        );
    }
}

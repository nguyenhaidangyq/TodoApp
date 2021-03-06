import React from "react";
import { Component } from "react";
import "../Styles/TodoList.scss";

export class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoTextInput: "",
      todoUpdateTitle: '',
      todoUpdateId: '',
      isUpdateTodo: false,
    };
  }

  handleChangeInputTodo = (event) => {
    const value = event.target.value;
    this.setState({
      todoTextInput: value,
    });
  };

  addNewTodo = () => {
    const { todoTextInput } = this.state;
    let { todos } = this.state;
    const todo = {
      id: Math.floor(Math.random() * 10000000),
      title: todoTextInput,
      status: "doing",
    };
    todos.push(todo);
    this.setState({
      todos: todos,
    });
  };

  handleDoneTodo = (todo) => {
    let { todos } = this.state;
    todos.forEach((item, index) => {
      if (item.id === todo.id) {
        item.status = "done";
      }
    });
    this.setState({
      todos: todos,
    });
  };

  removeTodoItem = (todo) => {
    const { todos } = this.state;
    // Cách 1
    // for(let i = 0; i < todos.length; i++) {
    //     if(todos[i].id === todo.id) {
    //         todos.splice(i, 1);
    //     }
    // }

    // Cách 2
    todos.forEach((item, index) => {
      if (item.id === todo.id) {
        todos.splice(index, 1);
      }
    });
    this.setState({
      todos: todos,
    });
  };

  editTodo = (todo) => {
    this.setState({
      todoUpdateTitle: todo.title,
      todoUpdateId: todo.id,
      isUpdateTodo: true
    });
  };

  handleChangeUpdateTodo = (event) => {
    const value = event.target.value;
    this.setState({
      todoUpdateTitle: value
    });
  };

  updateTodo = () => {
    const { todoUpdateTitle, todoUpdateId, todos } = this.state;
    todos.forEach((item) => {
      if(item.id === todoUpdateId) {
        item.title = todoUpdateTitle;
      }
    });
    this.setState({
      todos: todos,
      isUpdateTodo: false
    });
  }


  handleChangeSortBy = (event) => {
    const option = event.target.value;
    let { todos } = this.state;
    if(option === 'ASC') {
      todos = todos.sort((item1, item2) => {
        return item1.title > item2.title ? 1 : -1;
      });
    } else {
      todos = todos.sort((item1, item2) => {
        return item1.title > item2.title ? -1 : 1;
      });
    }
    this.setState({
      todos: todos
    });
  }

  render() {
    const { todos, todoTextInput, todoUpdateTitle, isUpdateTodo } = this.state;
    return (
      <>
        <div className="container">
          <div id="to-do-app" className="to-do-list">
            <h1>To-do list</h1>
            <i
              id="clear-list"
              className="fa fa-trash-o"
              aria-hidden="true"
              title="Clear All"
            />
            <span id="title-date" className="title-date">
              December 24, 2022
            </span>
            <div>
                <select onChange={this.handleChangeSortBy}>
                  <option>Sort by</option>
                  <option value={"ASC"}>ASC</option>
                  <option value={"DESC"}>DESC</option>
                </select>
              </div>
            <div className="tasker-container">
              <ul id="tasks-ul">
                {todos.map((item) => {
                  return (
                    <li className="task-item" key={item.id}>
                      <label
                        className={item.status === "done" ? "task-done" : ""}
                      >
                        {item.title}
                      </label>
                      <div className="btn-group">
                        <button
                          className="btn-remove"
                          onClick={() => this.removeTodoItem(item)}
                        >
                          Remove
                        </button>
                        <button
                          className="btn-done"
                          onClick={() => this.handleDoneTodo(item)}
                        >
                          Done
                        </button>
                        <button
                          className="btn-edit"
                          onClick={() => this.editTodo(item)}
                        >
                          Edit
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="add-task-button">+</div>
            <div id="task-container" className="task-container">
              <div id="error-msg" className="error-msg">
                Has to be atleast 1 letter!
              </div>
              {isUpdateTodo ? (
                <div>
                  <input
                    type="text"
                    id="updateTodo"
                    value={todoUpdateTitle}
                    onChange={this.handleChangeUpdateTodo}
                    placeholder="to-do"
                  />
                  <button id="add-task" onClick={this.updateTodo}>
                    Ud
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    id="task"
                    value={todoTextInput}
                    onChange={this.handleChangeInputTodo}
                    placeholder="to-do"
                  />
                  <button id="add-task" onClick={this.addNewTodo}>
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

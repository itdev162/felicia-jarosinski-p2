import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TodoList from './components/TodoList/TodoList';
import Todo from './components/Todo/Todo';
import CreateTodo from './components/Todo/CreateTodo';
import EditPost from './components/Todo/EditPost';

class App extends React.Component {
  state = {
    todos :[],
    todo: null
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/todos')
    .then((response) => {
      this.setState({
        todos: response.data
      })
    })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      })
  }

  viewPost = (todo) => {
    console.log(`view ${todo.title}`);
    this.setState({
      todo: todo
    });
  }
  deletePost = todo => {
    axios
      .delete(`http://localhost:5000/api/todos/${todo.id}`)
      .then(response => {
        const newTodos = this.state.todos.filter(p => p.id !== todo.id);
        this.setState({
          posts: [...newTodos]
        });
      })
      .catch(error => {
        console.error(`Error deleting post: ${error}`);
      });
  };

  editPost = todo => {
    this.setState({
      todo: todo
    });
  };

  onTodoCreated = todo => {
    const newTodos = [...this.state.todos, todo];

    this.setState({
      todos: newTodos
    });
  };

  onTodoUpdated = todo => {
    console.log('updated todo: ', todo);
    const newTodos = [...this.state.todos];
    const index = newTodos.findIndex(p => p.id === todo.id);

    newTodos[index] = todo;

    this.setState({
      todos: newTodos
    });
  };


  render() {

    // const { posts, post} = this.state;

    return (
      <Router>
        <div className="App">
        <header className="App-header">BlogBox</header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/new-post">New Todo</Link>
        </nav>
        <main className="App-content">
          <Switch>
            <Route exact path="/">
              <TodoList 
              todos={this.state.todos}
              clickPost={this.viewPost}
              deletePost={this.deletePost}
              editPost={this.editPost}
              />
            </Route>
            <Route path="/todos/:todoId">
              <Todo post={this.state.todo}/>
            </Route>
            <Route path="/new-post">
              <CreateTodo onTodoCreated={this.onTodoCreated} />
            </Route>
            <Route path="/edit=post/:postId">
              <EditPost todo={this.state.todo} onTodoUpdated={this.onTodoUpdated}/>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
      
    );
  }
}

export default App;

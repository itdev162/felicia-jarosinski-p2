import React from 'react';

const Todo = props => {
    const {todo} = props;

    return(
        <div>
            <h1>{todo.title}</h1>
            <h2>{todo.body}</h2>
        </div>
    )
}

export default Todo;
import React from 'react';
import TodoListItem from './TodoListItem'

const TodoList = props => {
    const { todos, clickPost, deletePost, editPost } = props;
    return todos.map(todo => (
        <TodoListItem 
            key={todo.id} 
            post={todo} 
            clickPost={clickPost} 
            deletePost={deletePost}
            editPost={editPost}
        />
    ));
};

export default TodoList;
import React from 'react';
import { useHistory } from 'react-router-dom';
import slugify from 'slugify';
import './styles.css';

const TodoListItem = props => {
    const { todo, clickPost, deletePost, editPost} = props;
    const history = useHistory();

    const handleClickPost = todo => {
        const slug = slugify(todo.title, {lower:true});

        clickPost(todo);
        history.push(`/posts/${slug}`);
    };

    const handleEditPost = todo => {
        editPost(todo);
        history.push(`/edit-post/${todo.id}`);
    };
    
    return(
        <div>
            <div className="postListItem" onClick={() => handleClickPost(todo)}>
                <h2>{todo.title}</h2>
                <p>{todo.body}</p>
            </div>
            <div className="postControls">
                <button onClick={() => deletePost(todo)}>Delete</button>
                <button onClick={() => handleEditPost(todo)}>Edit</button>
            </div>
        </div>
    );
};

export default TodoListItem;
import React, {useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import './styles.css';

const EditPost = ({todo, onTodoUpdated}) => {
    let history = useHistory();
    const [todoData, setTodoData] = useState({
        title: todo.title,
        body: todo.body
    });
    const {title, body} = todoData;

    const onChange = e => {
        const {name, value} = e.target;

        setTodoData({
            ...todoData,
            [name]: value
        });
    };

    const update = async () => {
        if(!title || !body){
            console.log('Title and body are required');
        }else{
            const newTodo = {
                id: todo.id,
                title: title,
                body: body,
                date: moment().toISOString()
            };

            try{
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                const body = JSON.stringify(newTodo);
                const res = await axios.put(
                    'http://localhost:5000/api/todos',
                    body,
                    config
                );

                onTodoUpdated(res.data);
                history.push('/');
            }catch(error){
                console.error(`Error creating todo: ${error.response.data}`);
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Edit Todo</h2>
            <input 
                name="title"
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => onChange(e)}
            />
            <textarea
                name="body"
                cols="30"
                rows="10"
                value={body}
                onChange={e => onChange(e)}
            ></textarea>
            <button onClick={() => update()}>Submit</button>
        </div>
    );
};

export default EditPost;
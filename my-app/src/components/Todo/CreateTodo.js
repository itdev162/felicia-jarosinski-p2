import React, {useState} from 'react';
import axios from 'axios';
import {v4 as uuid} from 'uuid';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import './styles.css';

const CreateTodo = ({onTodoCreated}) => {
    let history = useHistory();
    const [todoData, setTodoData] = useState({
        title: '',
        body: ''
    });
    const {title, body} = todoData;

    const onChange = e => {
        const {name, value} = e.target;

        setTodoData({
            ...todoData,
            [name]: value
        });
    };

    const create = async () => {
        if(!title || !body){
            console.log('Titleand body are required');
        }else{
            const newTodo ={
                id: uuid(),
                date: moment().toISOString(),
                title: title,
                body: body
            };

            try{
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
            
            const body = JSON.stringify(newTodo);
            const res = await axios.post(
                'http://localhost:5000/api/todos',
                body,
                config
            );

            onTodoCreated(res.data);
            history.push('/');
            }catch(error){
                console.error(`Error creating todo: ${error.response.data}`);
            }

        }
    };

    return (
        <div className="form-container">
            <h2>Create New Todo</h2>
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
            <button onClick={() => create()}>Submit</button>
        </div>
    );
};

export default CreateTodo;

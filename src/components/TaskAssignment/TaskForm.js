import React, {useState} from 'react';
import axios from 'axios';
import './TaskAssignment.css';

const TaskForm = () => {
    const [task, setTask] = useState({
        name: '',
        description: '',
        volunteer: '',
        event: '',
        completed: false
    });

    const handleChange = (e) => {
        setTask({...task, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/tasks', {...task, completed: task.completed ? 1 : 0})
            .then(() => {
                alert('Task created successfully!');
                setTask({name: '', description: '', volunteer: '', event: '', completed: false});
            })
            .catch(error => console.error(error));
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h2>Create a Task</h2>
            <input type="text" name="name" placeholder="Task Name" value={task.name} onChange={handleChange} required/>
            <textarea name="description" placeholder="Description" value={task.description} onChange={handleChange}
                      required/>
            <input type="number" name="volunteer" placeholder="Volunteer ID" value={task.volunteer}
                   onChange={handleChange}/>
            <input type="number" name="event" placeholder="Event ID" value={task.event} onChange={handleChange}/>
            <button type="submit">Create Task</button>
        </form>
    );
};

export default TaskForm;

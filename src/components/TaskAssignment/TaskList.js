import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './TaskAssignment.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="task-list-container">
            <h1>Task Assignment</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <strong>{task.name}</strong> - {task.description}
                        <p>Assigned to: {task.assignedTo}</p>
                        <p>Status: {task.completed ? "Completed" : "Incomplete"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;

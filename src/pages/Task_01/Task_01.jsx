import "./Task_01.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Task_01(){
    const [allTasks, setAllTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    function loadTasks(){
        const url = "http://127.0.0.1:8001/task_01/tasks";

        axios.get(url)
            .then(res => {
                setAllTasks(res.data)
            })
            .catch(err => {
                setError(JSON.stringify(err));
            })
            .finally(() => {
                setLoading(false);
            })
    }

    // deleteTask(id) //simplified, do first
        // SET var, TO result of filtering allTasks
        // SET allTasks, to the FilteredTasks
    function deleteTask(id_to_delete){
        const url = `http://127.0.0.1:8001/task_01/task/${id_to_delete}`;

        axios.delete(url)
            .then((res) => {
                setAllTasks(allTasks.filter((task) => task.id != id_to_delete) );
            })
            .catch((err) => {
                alert("failed to delete task")
            })
    }


    // deleteTask(id) //REAL, do later
    // INITIALIZE url to delete endpoint url
    // CALL axios.delete to the del url
    // IF success
    //      SET var, TO result of filtering allTasks
    //      SET allTasks, to the FilteredTasks
    // ELSE
    //    display error

    // load tasks when first drawing the page
    useEffect(loadTasks, []);

    if(loading) return <h1>Loading Todos...</h1>
    if(error) return <h1>Error: {error}</h1>

    //if not loading, and not error, show the app
    return (
        <>
           <h1>Todo App</h1>
           {/* Seeing all the tasks */}
           <DisplayAllTasks allTasks={allTasks} deleteTask={deleteTask}/>
           {/* pass delete tasks to display all tasks component */}
           {/* Creating a new task */}
           {/* Delete a task */}
           {/* Update the task status */}
        </>
    )
}

function CreateTaskForm(){
    return(
        <form>Add Task</form>
    )
}
function DisplayAllTasks({allTasks, deleteTask}){
    return(
        <div className="all-tasks">
            {
                allTasks.map((task) => {
                    return <Task 
                        id={task.id} 
                        name={task.name} 
                        status={task.status} 
                        deleteTask={deleteTask}/>
                })
                // pass the delete task to the actual task
            }

            
        </div>
    )
}
function Task({id, name, status, deleteTask}){

    // on click of button call delete task, with the id
    return(
        <div className="task">
            <input id={id} type="checkbox" checked={status}/>
            <label for={id}>{name}</label>
            <button 
                onClick={() => deleteTask(id)}
            type="submit" className="del-btn">X</button>
        </div>
    )
}
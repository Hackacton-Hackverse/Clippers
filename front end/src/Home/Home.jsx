import icon from "/src/assets/icon.png"
import './home.css'
import { IoLogOut } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import Account from "../Account.jsx";
import { FiEdit } from "react-icons/fi";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Home = ({ onLogout, userInfo }) => {
    const { username } = useParams()
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);
    var indextoEdit = 0;

    const [account, setAccount] = useState(false)
    const [taskIndex, setTaskIndex] = useState(null);
    const [taskStates, setTaskStates] = useState([]);

    const toggleAccount = () => {
        setAccount(!account);
    }
    if (account) {
        document.body.classList.add('printaccount')
    } else {
        document.body.classList.remove('printaccount')
    }

    const fetchTasks = async (email) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/todo', {
                email: email,
            });

            if (response.data.status === 200) {
                const initialTaskStates = response.data.todos.map((task) =>
                    task.state === "en cours" ? "unchecked" : "checked"
                );
                setTaskStates(initialTaskStates);
                setTasks(response.data.todos);
            }
        } catch (error) {
            alert("you don't have nothing to do");
        }
    };

    useEffect(() => {


        fetchTasks(userInfo.email);
    }, [userInfo.email]);

    const addTask = async () => {
        if (inputValue === '') {
            alert('you must write something');
        } else {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/todo/add', {
                    name: inputValue,
                    state: "en cours",
                    user_email: userInfo.email,
                });

                if (response.data.status === 200) {
                    setInputValue('');
                    fetchTasks(userInfo.email);
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };

    const toggleTask = async (index) => {
        let state = tasks[index].state;
        if (state === "complete") {
            state = "en cours";
        } else {
            state = "complete";
        }
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/todo/update`, {
                "id": tasks[index].id,
                "state": state,
            });

            if (response.data.status === 200) {
                const updatedTasks = [...tasks];
                updatedTasks[index].state = state;
                setTasks(updatedTasks);

                const newTaskStates = [...taskStates];
                newTaskStates[index] = state === "en cours" ? "unchecked" : "checked";
                setTaskStates(newTaskStates);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const removeTask = async (index) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/todo/delete`, {
                id: tasks[index].id,
            });

            if (response.data.status === 200) {
                const updatedTasks = [...tasks];
                updatedTasks.splice(index, 1);
                setTasks(updatedTasks);

                const newTaskStates = [...taskStates];
                newTaskStates.splice(index, 1);
                setTaskStates(newTaskStates);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/todo/update`, {
                "id": tasks[indextoEdit].id,
                "name": inputValue
            });
            if (response.data.status === 200) {
                fetchTasks(userInfo.email);
                setInputValue('');
                setEditingIndex(-1)
            } else {
                alert(response.data.status)
            }
        } catch (error) {
            alert("data has not updated")
        }
    }

    const editTask = (index) => {
        indextoEdit = index;
        setInputValue(tasks[index].name);
        setEditingIndex(index);
    };

    const toggleTaskState = (index) => {
        setTaskIndex(index)
        toggleTask(index)
    };


    return (
        <div className="container">
            {account && (<div onClick={toggleAccount} className="myaccount">
                <div onClick={toggleAccount} className="overlay"></div>
                <Account PrintAccount={toggleAccount}  userInfo={userInfo}/>
            </div>)}
            <div className="todo-app">
                <h2>
                    <img src={icon} alt="" />To-Do List of {username}
                </h2>
                <div className="row">
                    <input
                        type="text"
                        id="input-box"
                        placeholder="Add your task"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button className='addTaskbtn' onClick={editingIndex !== -1? handleEdit : addTask}>{editingIndex !== -1 ? 'Update' : 'Add'}</button>
                    {editingIndex !== -1}
                </div>
                <ul id="list-container">
                    {tasks.map((task, index) => (
                        editingIndex === index ? null : (
                            <li
                                key={index}
                                className={taskStates[index]}
                                onClick={() => toggleTaskState(index)}
                            >
                                {task.name}
                                <span onClick={(e) => {
                                    e.stopPropagation();
                                    removeTask(index);
                                }}>
                                    &#10005;
                                </span>
                                <button className="edit" onClick={(e) => { e.stopPropagation(); editTask(index) }}><FiEdit className="icon-edit" /></button>
                            </li>
                        )
                    ))}
                </ul>
                <div className="logout-logout">
                    <button className="account" onClick={toggleAccount}>
                        <MdAccountCircle className="account-logout" />
                    </button>
                    <button className="logout" onClick={onLogout}>
                        <IoLogOut className="account-logout" />
                    </button>
                </div>

            </div>


        </div>
    );
};

export default Home
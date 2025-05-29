import React, { useEffect, useState } from "react";

const Todo = () => {
    const [inputValue, setInputValue] = useState("");
    const [list, setList] = useState([]);

    function loaded () {
        fetch("https://playground.4geeks.com/todo/users/alberto_guerra")
        .then((response) => {
            if (response.ok === false) {
                throw new Error("Error al traer datos")
            }
            return response.json();
        })
        .then((data) => {
            setList(data.todos)
        })
        .catch((error) => {
            alert(error)
        })
    }
    useEffect(() => {
        loaded();
    }, []) 
    function adder () {
        let theTask = {label: inputValue, is_done: false}
        fetch("https://playground.4geeks.com/todo/todos/alberto_guerra", {
            method: 'POST',
            body: JSON.stringify(theTask),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.ok === false) {
                throw new Error("Error al llevar datos")
            }
            return response.json();
        })
        .then((data) => {
            setList([...list, data])
            setInputValue(""); 
        })
        .catch((error) => {
            alert(error)
        })
    }
    function deleter (taskId) {
        fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.ok === false) {
                throw new Error("Error al borrar datos") 
            }
            return response.text();
        }) 
        .then(() => {
            setList(prevList => prevList.filter(task => task.id !== taskId));
        }) 
        .catch((error) => {
            alert(error)
        })
    }
    function grabber (e) {
        const newValue = e.target.value;
        setInputValue(newValue);
    };

    return (
        <div id="box-container">
            <div>
                <h3>To-Do List</h3>
            </div>
            <div className="row">
                <div className="col">
                    <input type="text" placeholder="Add a chore to your list" onChange={grabber} value={inputValue} />
                </div>
                <div className="col">
                    <button type="button" className="btn btn-light" onClick={adder}>Add</button>
                </div>
            </div>
            <div>
                <ul>
                    {list.map((element, index) => {
                        return (<li key={element.id || index}>{element.label}
                                <button type="button" className="btn btn-danger" onClick={() => deleter(element.id)}>x</button>
                        </li>)
                    })}
                </ul>
            </div>
        </div>
    )
};

export default Todo;


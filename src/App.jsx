import './App.css';
import {useState} from "react";

function App() {

    const [newItem, setNewItem] = useState("");
    const[tasks, setTasks] = useState([]);

    function addItem(){

        if(!newItem){
            alert("Enter an item");
            return;
        }
        const item = {
            id: Math.floor(Math.random()*1000),
            value: newItem
        }

        setTasks(oldList => [...oldList, item]);
        setNewItem("");
    }

    function deleteItem(id){
        const newArray = tasks.filter(item => item.id !== id);
        setTasks(newArray);
    }

    return (
        <div className="App">
            <h1>My ToDo List</h1>

            <p>You have {tasks.length} tasks left to do !</p>

            <input
                onKeyPress={(e) => {if (e.key === "Enter") {
                    // Cancel the default action, if needed
                    e.preventDefault();
                    // Trigger the button element with a click
                    document.getElementById("addButton").click();
                }}}
                id="myInput"
                type="text"
                placeholder="Add a task"
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
            />

            <button
                id="addButton"
                type="submit"
                onClick={() => addItem()}
            >Add
            </button>

            <ul>
                {
                    tasks.map(item => {
                    return(
                        <li key={item.id}>{item.value}
                            <input type="checkbox"/>
                            <button type="button" className="delete" onClick={() => deleteItem(item.id)}>🗑️</button>
                        </li>
                    )
                    })
                }
            </ul>
        </div>
    );
}

export default App;

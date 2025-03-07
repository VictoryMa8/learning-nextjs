'use client'; // client components used
import './styles.css'; // a bit of styling
import { useState, useEffect } from 'react'; // useState for todo list and new inputs, useEffect for storage

export default function Page() {
  const [todoList, setTodoList] = useState([]); // state for todo list and method for updating
  const [inputValue, setInputValue] = useState(''); // state for new user inputs

  // triggers when component first loads
  useEffect(() => {
    // check if code is running in a browser
    if (typeof window !== 'undefined') {
      // if todo list found in storage, set todoList as that
      const savedTodoList = localStorage.getItem('todoList');
      if (savedTodoList) {
        setTodoList(JSON.parse(savedTodoList));
      }
    }
  }, []);

  // triggers when todo list is updated
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // set the entire todo list into storage
      localStorage.setItem('todoList', JSON.stringify(todoList));
      console.log('New item was added!');
    }
  }, [todoList]);

  // function for adding an item to the todo list
  function addItem() {
    // check if input is not empty
    if (inputValue.trim()) {
      // append input value to todo list
      setTodoList([...todoList, inputValue]);
      // clear out text box for the user
      setInputValue('');
    } else {
      // alert user if text box is empty
      alert('Input empty!');
    }
  }

  // function for deleting an item
  function deleteItem(targetIndex) {
    // use filter() to go through the to do list, keeping every item except the target item at target index
    setTodoList(todoList.filter((item, index) => index !== targetIndex));
  }

  return (
    // return main component
    <div id='main'>
      <h1>Victor's Basic Todo List</h1>
      <input
        id='new-item'
        value={inputValue} // react specific display control
        onChange={(e) => setInputValue(e.target.value)} // each keystroke changes inputValue
      ></input>
      {/* submit button appends new user input to todo list */}
      <button id='submit-btn' onClick={() => addItem()}>
        Add Item
      </button>
      {/* this ul element stores the entire todo list */}
      <ul>
        {/* for each item in the todo list, create an li element */}
        {todoList.map((item, index) => (
          // each item in the todo list needs a key for react to identify the node
          <div className='todo-list-item' key={index}>
            <input type='checkbox'></input> {/* basic checkbox */}
            <li>{item}</li>
            {/* clicking delete calls the delete item function */}
            <button onClick={() => deleteItem(index)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

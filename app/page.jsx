'use client';
import './styles.css';
import { useState, useEffect } from 'react';

export default function HomePage() {
  // any data we want to have re-render the component, put it inside of state
  const [newItem, setNewItem] = useState(''); // useState for setting new items in todo list
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localValue = localStorage.getItem('ITEMS');
      if (localValue) {
        try {
          setTodos(JSON.parse(localValue));
        } catch (e) {
          console.error('Error parsing localStorage data:', e);
        }
      }
    }
  }, []);

  // every time our todos change, store our todos into local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ITEMS', JSON.stringify(todos));
    }
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });

    setNewItem('');
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <div id='main'>
      <form className='new-item-form' onSubmit={handleSubmit}>
        <div className='form-row'>
          <label htmlFor='item'>New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)} // get value of input, setting it as newItem's value
            type='text'
            id='item'
          ></input>
        </div>
        <button className='btn'>Add</button>
      </form>
      <ul className='list'>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type='checkbox'
                  id='check'
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                ></input>
                {todo.title}
              </label>
              <button
                onClick={() => deleteTodo(todo.id)} // pass in a function that calls deleteTodo
                className='btn btn-delete'
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import { useState, useEffect } from 'react';
import './TodoList.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch('http://localhost:5050/api/todos')
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching todos:', error));
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
  const response = await fetch('http://localhost:5050/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodo }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTodos(prevTodos => [...prevTodos, data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = (id) => {
  fetch(`http://localhost:5050/api/todos/${id}`, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(() => fetchTodos())
      .catch(error => console.error('Error toggling todo:', error));
  };

  const deleteTodo = (id) => {
  fetch(`http://localhost:5050/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => fetchTodos())
      .catch(error => console.error('Error deleting todo:', error));
  };

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="todo-input"
        />
        <button type="submit" className="todo-button">Add</button>
      </form>
      <ul className="todo-items">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
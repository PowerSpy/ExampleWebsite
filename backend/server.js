const express = require('express');
const cors = require('cors');
const app = express();
const port = 5050;

// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Parse JSON bodies
app.use(express.json());

// Sample data
const messages = [
  { id: 1, text: 'Welcome to our Example Website!' },
  { id: 2, text: 'Explore our amazing features!' }
];

let todoItems = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Build an example website', completed: true }
];

// Get banner messages
app.get('/api/messages', (req, res) => {
  console.log('GET /api/messages request received');
  res.json(messages);
});

// Get todo items
app.get('/api/todos', (req, res) => {
  console.log('GET /api/todos request received');
  res.json(todoItems);
});

// Add todo item
app.post('/api/todos', (req, res) => {
  console.log('POST /api/todos request received:', req.body);
  const newTodo = {
    id: todoItems.length + 1,
    text: req.body.text,
    completed: false
  };
  todoItems.push(newTodo);
  console.log('New todo added:', newTodo);
  res.json(newTodo);
});

// Toggle todo completion
app.put('/api/todos/:id', (req, res) => {
  console.log('PUT /api/todos/:id request received for ID:', req.params.id);
  const todo = todoItems.find(t => t.id === parseInt(req.params.id));
  if (todo) {
    todo.completed = !todo.completed;
    console.log('Todo updated:', todo);
    res.json(todo);
  } else {
    console.log('Todo not found with ID:', req.params.id);
    res.status(404).send('Todo not found');
  }
});

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
  console.log('DELETE /api/todos/:id request received for ID:', req.params.id);
  const index = todoItems.findIndex(t => t.id === parseInt(req.params.id));
  if (index !== -1) {
    todoItems = todoItems.filter(t => t.id !== parseInt(req.params.id));
    console.log('Todo deleted with ID:', req.params.id);
    res.status(200).send('Todo deleted');
  } else {
    console.log('Todo not found with ID:', req.params.id);
    res.status(404).send('Todo not found');
  }
});

app.get('/api/ping', (req, res) => {
  console.log('ping recieved');
  const response = {
    text: 'pong'
  }
  res.json(response);
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Ready to handle requests...');
  console.log('Press Ctrl+C to stop the server');
});

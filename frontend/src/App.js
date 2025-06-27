import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';

const AUTH_API = 'http://localhost:5000/api/auth';
const TASKS_API = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [userName, setUserName] = useState(() => localStorage.getItem('name') || '');
  const [isRegistering, setIsRegistering] = useState(false);

  const fetchTasks = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(TASKS_API, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
      } else {
        console.error('Error fetching tasks:', err);
      }
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchTasks();
    else setTasks([]);
  }, [fetchTasks, token]);

  const login = async () => {
    if (!email || !password) return alert('Please enter email and password');
    try {
      const res = await axios.post(`${AUTH_API}/login`, { email, password });
      setToken(res.data.token);
      setUserName(res.data.name);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.name);
      alert('Login successful!');
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const register = async () => {
    if (!name || !email || !password) {
      return alert('Please fill all fields');
    }

    if (password.length < 6) {
      return alert('Password must be at least 6 characters');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return alert('Please enter a valid email');
    }

    try {
      await axios.post(`${AUTH_API}/register`, { name, email, password });
      alert('Registration successful! You can now log in.');
      setIsRegistering(false);
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const logout = () => {
    setToken('');
    setUserName('');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  };

  const addTask = async () => {
    if (!title.trim()) return alert('Please enter a task title.');
    try {
      const res = await axios.post(
        TASKS_API,
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, res.data]);
      setTitle('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const res = await axios.patch(
        `${TASKS_API}/${task._id}`,
        { completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map(t => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${TASKS_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  if (!token) {
    return (
      <div className="container">
        <form className="login-form" onSubmit={e => e.preventDefault()}>
          <h1>{isRegistering ? 'Register' : 'Login'}</h1>

          {isRegistering && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {isRegistering ? (
            <>
              <button onClick={register}>Register</button>
              <div className="register-container">
                <span>Already have an account?</span>
                <button type="button" className="link-btn" onClick={() => setIsRegistering(false)}>
                  Login here
                </button>
              </div>
            </>
          ) : (
            <>
              <button onClick={login}>Login</button>
              <div className="register-container">
                <span>Don't have an account?</span>
                <button type="button" className="link-btn" onClick={() => setIsRegistering(true)}>
                  Register here
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Welcome, {userName || 'User'} 👋</h1>
      <div className="dashboard-actions">
        <input
          type="text"
          placeholder="New task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button className="add-btn" onClick={addTask}>Add Task</button>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task)}
            />
            <span>{task.title}</span>
            <button className="delete-btn" onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
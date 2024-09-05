import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:3001/api/issues";

function App() {
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState({
    id: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setIssues(data);
  };

  const createIssue = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newIssue),
    });
    fetchIssues();
  };

  const updateIssue = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newIssue),
    });
    fetchIssues();
  };

  const deleteIssue = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchIssues();
  };

  return (
    <div className="App">
      <h1>Issue Tracker</h1>
      <div>
        <input
          style={{ marginRight: "1rem" }}
          type="text"
          placeholder="ID"
          value={newIssue.id}
          onChange={(e) => setNewIssue({ ...newIssue, id: e.target.value })}
        />
        <input
          style={{ marginRight: "1rem" }}
          type="text"
          placeholder="Title"
          value={newIssue.title}
          onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
        />
        <input
          style={{ marginRight: "1rem" }}
          type="text"
          placeholder="Description"
          value={newIssue.description}
          onChange={(e) =>
            setNewIssue({ ...newIssue, description: e.target.value })
          }
        />
        <button onClick={createIssue}>Create Issue</button>
      </div>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id} >
            {issue.id}: {issue.title} - {issue.description}
            <button onClick={() => updateIssue(issue.id)}>Update</button>
            <button onClick={() => deleteIssue(issue.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

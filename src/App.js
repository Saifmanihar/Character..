import React, { useState } from 'react';
import { Card, Input } from 'antd';
import 'antd/dist/reset.css';
import './App.css';

const swimlanes = {
  'To Do': [],
  'In Progress': [],
  'Completed': []
};

const App = () => {
  const [tasks, setTasks] = useState(swimlanes);

  const handleDragStart = (e, task, lane) => {
    e.dataTransfer.setData('task', JSON.stringify({ task, lane }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetLane) => {
    const source = e.dataTransfer.getData('task');
    const { task, lane } = JSON.parse(source);

    if (lane !== targetLane) {
      const newTasks = { ...tasks };
      const sourceTasks = newTasks[lane];
      const targetTasks = newTasks[targetLane];

      // Remove the task from the source lane
      const taskIndex = sourceTasks.indexOf(task);
      sourceTasks.splice(taskIndex, 1);

      // Add the task to the target lane
      targetTasks.push(task);

      setTasks(newTasks);
    }
  };

  const handleAddTask = (e, lane) => {
    if (e.key === 'Enter') {
      const task = e.target.value.trim();

      if (task) {
        const newTasks = { ...tasks };
        newTasks[lane].push(task);
        setTasks(newTasks);
        e.target.value = '';
      }
    }
  };

  return (
    <div className="board">
      {Object.keys(tasks).map((lane) => (
        <div
          key={lane}
          className="lane"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, lane)}
        >
          <h2>{lane}</h2>
          <div className="task-list">
            {tasks[lane].map((task, index) => (
              <Card
                key={index}
                className="task"
                draggable
                onDragStart={(e) => handleDragStart(e, task, lane)}
              >
                {task}
              </Card>
            ))}
          </div>
          <Input
            className="add-task"
            placeholder="Add task"
            onPressEnter={(e) => handleAddTask(e, lane)}
          />
        </div>
      ))}
    </div>
  );
};

export default App;

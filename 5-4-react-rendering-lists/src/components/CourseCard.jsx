import { useState } from "react";
import TaskItem from "./TaskItem";

export default function CourseCard({ course, index, onMutateCourse }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);

  function toggleTask(id) {
    onMutateCourse(index, prevTasks =>
      prevTasks.map(t => (t.id === id ? { ...t, isDone: !t.isDone } : t))
    );
  }

  function deleteTask(id) {
    onMutateCourse(index, prevTasks => prevTasks.filter(t => t.id !== id));
  }

  function addTask(e) {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const dateValue = date;
    if (!trimmedTitle || !dateValue) return;

    const newTask = {
      id: `${Date.now()}`,
      title: trimmedTitle,
      dueDate: dateValue,
      isDone: false,
    };

    onMutateCourse(index, prevTasks => [...prevTasks, newTask]);
    setTitle("");
    setDate("");
  }

  return (
    <article className="course card">
      <header className="cardHeader">
        <h2>{course.title}</h2>
        {course.tasks.length > 0 && course.tasks.every(t => t.isDone) && (
          <span className="badge">All caught up</span>
        )}

      
      </header>
   



      <form onSubmit={addTask} className="newTask">
        <input
          className="titleField"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task title"
          aria-label="Task title"
        />
        <div className="dateRow">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            aria-label="Due date"
          />
          <button type="submit" className="primary">Add</button>
        </div>
      </form>
      {course.tasks.length === 0 ? (
          <p>No tasks yet. Add your first one below.</p>
        ) : (
          <ul className="tasks">
            {course.tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        )}
    </article>
  );
}

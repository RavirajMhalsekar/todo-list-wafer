"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function TodoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    // In a real app, we would fetch the todo from an API
    // For now, we'll use mock data
    setTodo({
      id: parseInt(params.id),
      title: "Sample Todo",
      description: "This is a sample todo description",
      completed: false,
    });
  }, [params.id]);

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>TODO DETAILS</h1>
        <button className="add-todo-btn" onClick={() => router.back()}>
          Back
        </button>
      </div>
      <div className="todo-details">
        <div className="detail-item">
          <span className="detail-label">TITLE</span>
          <p className="detail-value">{todo.title}</p>
        </div>
        <div className="detail-item">
          <span className="detail-label">DESCRIPTION</span>
          <p className="detail-value">{todo.description}</p>
        </div>
        <div className="detail-item">
          <span className="detail-label">STATUS</span>
          <p
            className={`detail-value status-indicator ${
              todo.completed ? "completed" : ""
            }`}
          >
            {todo.completed ? "Completed" : "Incomplete"}
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import "./TodoForm.style.css";

interface TodoFormProps {
  onSubmit: (title: string, description: string, completed?: boolean) => void;
  onClose?: () => void;
}

export default function TodoForm({ onSubmit, onClose }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await onSubmit(title, description, completed);
      setTitle("");
      setDescription("");
      setCompleted(false);
      onClose?.();
    } catch (error) {
      console.error("Error submitting todo:", error);
    }
  };

  return (
    <div className="todo-form-container">
      <div className="todo-form-content">
        {/* Task Title */}
        <div className="form-group">
          <label className="form-label">TASK TITLE</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="form-input"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">DESCRIPTION</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add any additional details..."
            rows={6}
            className="form-textarea"
          />
        </div>

        {/* Mark as completed */}
        <div className="checkbox-group">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="form-checkbox"
          />
          <label className="checkbox-label">Mark as completed</label>
        </div>
      </div>

      {/* Buttons */}
      <div className="form-actions">
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          CREATE
        </button>
      </div>
    </div>
  );
}

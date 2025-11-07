"use client";

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export default function TodoList({
  todos,
  onToggleStatus,
  onDelete,
  onView,
}: TodoListProps) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div key={todo.id} className="todo-item">
          <div className="todo-content">
            <h3 className="todo-title">{todo.title}</h3>
            <p className="todo-description">{todo.description}</p>
          </div>
          <div className="todo-actions">
            <button
              className={`status-btn ${todo.completed ? "completed" : ""}`}
              onClick={() => onToggleStatus(todo.id)}
            >
              {todo.completed ? "✓" : "○"}
            </button>
            <button className="view-btn" onClick={() => onView(todo.id)}>
              VIEW
            </button>
            <button className="delete-btn" onClick={() => onDelete(todo.id)}>
              DELETE
            </button>
          </div>
        </div>
      ))}
      {todos.length === 0 && (
        <div className="empty-state">
          No todos yet. Click "Add Todo" to create one!
        </div>
      )}
    </div>
  );
}

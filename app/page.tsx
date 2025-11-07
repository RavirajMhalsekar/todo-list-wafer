"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TodoList from "./components/TodoList";
import { useAuth } from "./contexts/AuthContext";
import {
  getTodos,
  addTodo,
  updateTodoStatus,
  deleteTodo,
  Todo,
} from "../firebase/todos";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");
  const [sortBy, setSortBy] = useState<"createdAt" | "title">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");

  const loadTodos = async () => {
    if (!user) return;

    try {
      const fetchedTodos = await getTodos(
        user.uid,
        filter,
        sortBy,
        sortOrder,
        searchQuery
      );
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }

    loadTodos();
  }, [user, filter, sortBy, sortOrder, searchQuery]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  // Add todo is handled on /add-todo route

  const handleToggleStatus = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      await updateTodoStatus(id, !todo.completed);
      setTodos(
        todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    }
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleViewTodo = (id: string) => {
    router.push(`/todo/${id}`);
  };

  return (
    <main className="container">
      <div className="header">
        <h1>
          TODO <span className="accent">LIST</span>
        </h1>
        <div className="user-info">
          {user.email}
          <button onClick={() => router.push("/auth")} className="auth-btn">
            Sign Out
          </button>
        </div>
      </div>

      <div className="controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search todos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters">
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "all" | "completed" | "active")
            }
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "createdAt" | "title")}
          >
            <option value="createdAt">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>

          <button
            className="sort-order-btn"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>

        <button
          className="add-todo-btn"
          onClick={() => router.push("/add-todo")}
          title="Add new todo"
        >
          Add Todo ✚
        </button>
      </div>

      <TodoList
        todos={todos}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeleteTodo}
        onView={handleViewTodo}
      />

      {/* Add todo happens on /add-todo route now */}
    </main>
  );
}

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo, Filter, Priority } from "@/lib/types";
import { loadTodos, saveTodos } from "@/lib/localStorage";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [isLoading, setIsLoading] = useState(true);

  // Load todos from localStorage on initial render
  useEffect(() => {
    const loadedTodos = loadTodos();
    
    // If any existing todos don't have priority, add medium priority as default
    const updatedTodos = loadedTodos.map(todo => {
      if (!todo.priority) {
        return { ...todo, priority: "medium" as Priority };
      }
      return todo;
    });
    
    setTodos(updatedTodos);
    setIsLoading(false);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveTodos(todos);
    }
  }, [todos, isLoading]);

  // Add a new todo
  const addTodo = (text: string, priority: Priority = "medium") => {
    const newTodo: Todo = {
      id: uuidv4(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      priority,
    };
    setTodos([...todos, newTodo]);
  };

  // Toggle todo completion status
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit a todo
  const editTodo = (id: string, updates: Partial<Pick<Todo, 'text' | 'priority'>>) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  // Change priority of a todo
  const changePriority = (id: string, priority: Priority) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, priority } : todo))
    );
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // 'all' filter
  });

  // Sort todos by priority (high -> medium -> low)
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return {
    todos: sortedTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    changePriority,
    filter,
    setFilter,
    isLoading,
  };
}
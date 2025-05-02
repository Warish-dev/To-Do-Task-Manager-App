import { useState, useEffect } from "react";
import { Todo } from "@/lib/types";
import { loadTodos, saveTodos } from "@/lib/localStorage";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load todos from localStorage when component mounts
  useEffect(() => {
    try {
      const storedTodos = loadTodos();
      setTodos(storedTodos);
    } catch (error) {
      toast({
        title: "Error loading todos",
        description: "Could not load your todos from storage",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (!isLoading) {
      saveTodos(todos);
    }
  }, [todos, isLoading]);

  // Add a new todo
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    
    toast({
      title: "Task added",
      description: "Your new task has been added",
    });
  };

  // Toggle a todo's completed status
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    
    toast({
      title: "Task deleted",
      description: "Your task has been deleted",
    });
  };

  // Edit a todo
  const editTodo = (id: string, text: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      )
    );
    
    toast({
      title: "Task updated",
      description: "Your task has been updated",
    });
  };

  // Clear all completed todos
  const clearCompleted = () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    
    if (completedCount === 0) {
      toast({
        title: "No completed tasks",
        description: "There are no completed tasks to clear",
      });
      return;
    }
    
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    
    toast({
      title: "Completed tasks cleared",
      description: `${completedCount} completed task(s) have been removed`,
    });
  };

  // Count remaining (not completed) todos
  const remainingCount = todos.filter((todo) => !todo.completed).length;

  return {
    todos,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    remainingCount,
  };
}

import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import FilterTabs from "./FilterTabs";
import { useTodos } from "@/hooks/useTodos";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "@/lib/types";

const TodoApp = () => {
  const {
    todos,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    remainingCount,
  } = useTodos();
  const [currentFilter, setCurrentFilter] = useState<Filter>("all");

  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "all") return true;
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-12 bg-gray-100">
      <Card className="w-full max-w-md overflow-hidden shadow-lg animate-fadeIn">
        {/* App Header */}
        <div className="bg-primary text-white px-6 py-4">
          <h1 className="text-xl font-semibold">My Todo List</h1>
          <p className="text-sm opacity-80">Stay organized and productive</p>
        </div>

        {/* Todo Form */}
        <CardContent className="p-6 border-b">
          <TodoForm onAddTodo={addTodo} />
        </CardContent>

        {/* Filter Tabs */}
        <FilterTabs currentFilter={currentFilter} onFilterChange={setCurrentFilter} />

        {/* Todo List */}
        <TodoList
          todos={filteredTodos}
          isLoading={isLoading}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          filter={currentFilter}
        />

        {/* Footer Stats */}
        <div className="px-6 py-3 bg-gray-50 text-sm text-gray-500 flex justify-between items-center">
          <div>
            <span>{remainingCount}</span> items left
          </div>
          <button
            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        </div>
      </Card>
    </div>
  );
};

export default TodoApp;

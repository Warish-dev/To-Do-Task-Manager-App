import { useTodos } from "@/hooks/useTodos";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import FilterTabs from "./FilterTabs";
import { Title } from "@/components/ui/title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag } from "lucide-react";
import { Priority } from "@/lib/types";

const TodoApp = () => {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    filter,
    setFilter,
    isLoading,
  } = useTodos();

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  // Count by priority
  const priorityCounts = todos.reduce(
    (acc, todo) => {
      if (!todo.completed) {
        acc[todo.priority]++;
      }
      return acc;
    },
    { low: 0, medium: 0, high: 0 } as Record<Priority, number>
  );

  // Helper for priority styling
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high": return "text-red-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-blue-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Title className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary to-emerald-400 text-transparent bg-clip-text">
          Todo List App
        </Title>
        <p className="text-muted-foreground mt-2">
          A simple task management application
        </p>
      </div>

      <Card className="border-primary/20">
        <CardHeader className="pb-2 bg-primary/5 rounded-t-lg">
          <div className="flex justify-between items-center">
            <Title className="text-primary">My Tasks</Title>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-primary/10">
                {activeCount} active
              </Badge>
              <Badge variant="outline" className="bg-primary/10">
                {completedCount} completed
              </Badge>
            </div>
          </div>
          {activeCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className={`${getPriorityColor("high")} bg-red-100/50`}>
                <Flag size={12} className="mr-1" /> {priorityCounts.high} high priority
              </Badge>
              <Badge variant="outline" className={`${getPriorityColor("medium")} bg-yellow-100/50`}>
                <Flag size={12} className="mr-1" /> {priorityCounts.medium} medium priority
              </Badge>
              <Badge variant="outline" className={`${getPriorityColor("low")} bg-blue-100/50`}>
                <Flag size={12} className="mr-1" /> {priorityCounts.low} low priority
              </Badge>
            </div>
          )}
        </CardHeader>
        <CardContent className="pt-6">
          <TodoForm onAddTodo={addTodo} />
          
          <FilterTabs currentFilter={filter} onFilterChange={setFilter} />
          
          <div className="mt-4">
            <TodoList
              todos={todos}
              isLoading={isLoading}
              filter={filter}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={(id, updates) => {
                if (typeof updates === 'string') {
                  editTodo(id, { text: updates });
                } else {
                  editTodo(id, updates);
                }
              }}
            />
          </div>

          {totalCount > 0 && (
            <div className="mt-6 pt-4 border-t text-sm text-muted-foreground">
              {filter === "all" ? (
                <span>
                  {activeCount} tasks left to complete, {completedCount} completed
                </span>
              ) : filter === "active" ? (
                <span>{activeCount} active tasks</span>
              ) : (
                <span>{completedCount} completed tasks</span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>Double-click to edit a task • Data is saved in your browser</p>
      </footer>
    </div>
  );
};

export default TodoApp;
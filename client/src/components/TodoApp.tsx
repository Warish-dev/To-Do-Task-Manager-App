import { useTodos } from "@/hooks/useTodos";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import FilterTabs from "./FilterTabs";
import { Title } from "@/components/ui/title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Title className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary to-blue-700 text-transparent bg-clip-text">
          Todo List App
        </Title>
        <p className="text-muted-foreground mt-2">
          A simple task management application
        </p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <Title>My Tasks</Title>
            <div className="flex gap-2">
              <Badge variant="outline">{activeCount} active</Badge>
              <Badge variant="outline">{completedCount} completed</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TodoForm onAddTodo={addTodo} />
          
          <FilterTabs currentFilter={filter} onFilterChange={setFilter} />
          
          <div className="mt-4">
            <TodoList
              todos={todos}
              isLoading={isLoading}
              filter={filter}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
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
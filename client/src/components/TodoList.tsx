import { Todo, Filter } from "@/lib/types";
import TodoItem from "./TodoItem";
import { Skeleton } from "@/components/ui/skeleton";

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  filter: Filter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Pick<Todo, 'text' | 'description' | 'priority'>>) => void;
}

const TodoList = ({
  todos,
  isLoading,
  filter,
  onToggle,
  onDelete,
  onEdit,
}: TodoListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-md p-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        {filter === "all"
          ? "No tasks yet. Add a new task to get started!"
          : filter === "active"
          ? "No active tasks!"
          : "No completed tasks!"}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;
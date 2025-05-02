import { useState } from "react";
import TodoItem from "./TodoItem";
import { Todo, Filter } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { ClipboardList } from "lucide-react";

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  filter: Filter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const TodoList = ({
  todos,
  isLoading,
  filter,
  onToggle,
  onDelete,
  onEdit,
}: TodoListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = (id: string, text: string) => {
    onEdit(id, text);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && todos.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          <ClipboardList className="h-10 w-10 mx-auto mb-2 text-gray-400" />
          <p>No tasks found</p>
        </div>
      )}

      {/* Todo Items */}
      {!isLoading &&
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isEditing={editingId === todo.id}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ))}
    </div>
  );
};

export default TodoList;

import { useState } from "react";
import { Todo } from "@/lib/types";
import { Check, X, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onSave: (id: string, text: string) => void;
  onCancel: () => void;
}

const TodoItem = ({
  todo,
  isEditing,
  onToggle,
  onDelete,
  onEdit,
  onSave,
  onCancel,
}: TodoItemProps) => {
  const [editText, setEditText] = useState(todo.text);

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleEdit = () => {
    onEdit(todo.id);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onSave(todo.id, editText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && editText.trim()) {
      onSave(todo.id, editText);
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div className="px-6 py-4 flex items-center animate-slideIn group">
      {/* Checkbox */}
      <div className="relative">
        <input
          type="checkbox"
          className="opacity-0 absolute h-5 w-5 cursor-pointer"
          checked={todo.completed}
          onChange={handleToggle}
        />
        <span
          className={cn(
            "absolute top-0 left-0 h-5 w-5 border-2 rounded-sm",
            todo.completed
              ? "bg-secondary border-secondary"
              : "border-gray-300"
          )}
        >
          {todo.completed && (
            <Check className="h-4 w-4 text-white absolute -top-0.5 -left-0.5" />
          )}
        </span>
      </div>

      {/* Todo Content */}
      <div className="ml-3 flex-1">
        {isEditing ? (
          <Input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-1 border border-primary rounded focus:outline-none focus:ring-1 focus:ring-primary"
            autoFocus
          />
        ) : (
          <p
            className={cn(
              "text-gray-800",
              todo.completed && "text-gray-500 line-through"
            )}
          >
            {todo.text}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex space-x-1">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1 text-primary rounded-full hover:bg-gray-100 focus:outline-none"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={onCancel}
              className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="p-1 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100 focus:outline-none"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-gray-500 hover:text-destructive rounded-full hover:bg-gray-100 focus:outline-none"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;

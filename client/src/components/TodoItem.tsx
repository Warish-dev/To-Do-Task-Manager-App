import { useState } from "react";
import { Todo } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { format } from "date-fns";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const formattedDate = format(new Date(todo.createdAt), "MMM dd, yyyy");

  return (
    <div
      className={`border rounded-md p-4 mb-2 flex items-center justify-between transition-colors ${
        todo.completed ? "bg-muted" : "bg-card"
      }`}
    >
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1"
            autoFocus
          />
          <Button size="icon" variant="ghost" onClick={handleSave}>
            <Check size={18} className="text-green-500" />
          </Button>
          <Button size="icon" variant="ghost" onClick={handleCancel}>
            <X size={18} className="text-red-500" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 flex-1">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => onToggle(todo.id)}
              id={`todo-${todo.id}`}
            />
            <div className="flex flex-col">
              <label
                htmlFor={`todo-${todo.id}`}
                className={`text-base cursor-pointer ${
                  todo.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {todo.text}
              </label>
              <span className="text-xs text-muted-foreground">
                Created: {formattedDate}
              </span>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleEdit}
              disabled={todo.completed}
              className="h-8 w-8"
            >
              <Pencil size={16} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(todo.id)}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
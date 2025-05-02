import { useState } from "react";
import { Todo, Priority } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, X, Check, Flag } from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Pick<Todo, 'text' | 'description' | 'priority'>>) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDescription, setEditDescription] = useState(todo.description || "");
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
    setEditDescription(todo.description || "");
    setEditPriority(todo.priority);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, { 
        text: editText, 
        description: editDescription || undefined,
        priority: editPriority 
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
    setEditDescription(todo.description || "");
    setEditPriority(todo.priority);
  };

  const formattedDate = format(new Date(todo.createdAt), "MMM dd, yyyy");

  // Helper for priority styling
  const getPriorityStyles = (priority: Priority) => {
    switch (priority) {
      case "high":
        return {
          badge: "bg-red-100 text-red-700 hover:bg-red-200",
          icon: "text-red-500"
        };
      case "medium":
        return {
          badge: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
          icon: "text-yellow-500"
        };
      case "low":
        return {
          badge: "bg-blue-100 text-blue-700 hover:bg-blue-200",
          icon: "text-blue-500"
        };
      default:
        return {
          badge: "bg-gray-100 text-gray-700 hover:bg-gray-200",
          icon: "text-gray-500"
        };
    }
  };

  const priorityStyles = getPriorityStyles(todo.priority);

  return (
    <div
      className={`border rounded-md p-4 mb-2 flex items-center justify-between transition-colors ${
        todo.completed ? "bg-muted" : "bg-card"
      }`}
    >
      {isEditing ? (
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Priority:</label>
            <Select
              value={editPriority}
              onValueChange={(value) => setEditPriority(value as Priority)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
              <div className="flex items-center gap-2">
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`text-base cursor-pointer font-medium ${
                    todo.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {todo.text}
                </label>
                <Badge 
                  variant="outline" 
                  className={`text-xs font-normal ${priorityStyles.badge}`}
                >
                  <Flag size={12} className={`mr-1 ${priorityStyles.icon}`} />
                  {todo.priority}
                </Badge>
              </div>
              
              {todo.description && (
                <p className={`text-sm mt-1 ${
                  todo.completed ? "line-through text-muted-foreground" : "text-gray-600"
                }`}>
                  {todo.description}
                </p>
              )}
              
              <span className="text-xs text-muted-foreground mt-1">
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
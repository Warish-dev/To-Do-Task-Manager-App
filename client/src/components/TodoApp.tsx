import { useTodos } from "@/hooks/useTodos";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import FilterTabs from "./FilterTabs";
import SignupForm from "./SignupForm";
import { Title } from "@/components/ui/title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag, CheckCircle, AlertCircle, Trash2, Edit, SlidersHorizontal } from "lucide-react";
import { Priority, Todo, Filter } from "@/lib/types";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useToast } from "@/hooks/use-toast";

const TodoApp = () => {
  const { toast } = useToast();
  
  const {
    todos,
    addTodo: addTodoOriginal,
    toggleTodo: toggleTodoOriginal,
    deleteTodo: deleteTodoOriginal,
    editTodo: editTodoOriginal,
    filter,
    setFilter: setFilterOriginal,
    isLoading,
  } = useTodos();
  
  // Enhanced functions with toast notifications
  const addTodo = (text: string, description?: string, priority?: Priority) => {
    addTodoOriginal(text, description, priority);
    toast({
      title: "✅ Task added",
      description: "Your new task has been created."
    });
  };
  
  const toggleTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    toggleTodoOriginal(id);
    
    if (todo) {
      const newStatus = !todo.completed;
      toast({
        title: newStatus ? "✅ Task completed" : "🔄 Task reopened",
        description: newStatus ? "The task has been marked as completed." : "The task has been reopened."
      });
    }
  };
  
  const deleteTodo = (id: string) => {
    deleteTodoOriginal(id);
    toast({
      title: "🗑️ Task deleted",
      description: "The task has been permanently removed."
    });
  };
  
  const editTodo = (id: string, updates: Partial<Pick<Todo, 'text' | 'description' | 'priority'>>) => {
    editTodoOriginal(id, updates);
    toast({
      title: "✏️ Task updated",
      description: "Your changes have been saved."
    });
  };
  
  const setFilter = (newFilter: Filter) => {
    setFilterOriginal(newFilter);
    
    const filterMessages = {
      all: "Showing all tasks",
      active: "Showing active tasks only",
      completed: "Showing completed tasks only"
    };
    
    toast({
      title: "🔍 Filter changed",
      description: filterMessages[newFilter]
    });
  };

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

  // Handle user signup
  const handleUserSignup = (userData: any) => {
    console.log("User signed up:", userData);
    toast({
      title: "👋 Welcome!",
      description: `Hi ${userData.name}, your account has been created successfully!`
    });
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="text-center flex-1">
          <Title className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary to-emerald-400 text-transparent bg-clip-text">
            Todo List App
          </Title>
          <p className="text-muted-foreground mt-2">
            A simple task management application
          </p>
        </div>
        <div className="flex-shrink-0">
          <ThemeToggle />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Signup Form - Left Side */}
        <div className="md:col-span-1">
          <SignupForm onUserSignup={handleUserSignup} />
        </div>

        {/* Todo List - Right Side */}
        <div className="md:col-span-2">
          <Card className="border-primary/20 dark:border-primary/10">
            <CardHeader className="pb-2 bg-primary/5 dark:bg-primary/10 rounded-t-lg">
              <div className="flex justify-between items-center">
                <Title className="text-primary">My Tasks</Title>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-primary/10 dark:bg-primary/20">
                    {activeCount} active
                  </Badge>
                  <Badge variant="outline" className="bg-primary/10 dark:bg-primary/20">
                    {completedCount} completed
                  </Badge>
                </div>
              </div>
              {activeCount > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className={`${getPriorityColor("high")} bg-red-100/50 dark:bg-red-950/50`}>
                    <Flag size={12} className="mr-1" /> {priorityCounts.high} high priority
                  </Badge>
                  <Badge variant="outline" className={`${getPriorityColor("medium")} bg-yellow-100/50 dark:bg-yellow-950/50`}>
                    <Flag size={12} className="mr-1" /> {priorityCounts.medium} medium priority
                  </Badge>
                  <Badge variant="outline" className={`${getPriorityColor("low")} bg-blue-100/50 dark:bg-blue-950/50`}>
                    <Flag size={12} className="mr-1" /> {priorityCounts.low} low priority
                  </Badge>
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-6">
              <TodoForm onAddTodo={addTodo} />
              
              <div className="mt-6">
                <FilterTabs currentFilter={filter} onFilterChange={setFilter} />
              </div>
              
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
        </div>
      </div>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>Click the Edit button to update a task • Click Add New Task to create tasks with descriptions</p>
      </footer>
    </div>
  );
};

export default TodoApp;
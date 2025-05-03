import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Priority } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useThemeContext } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

// Form validation schema
const formSchema = z.object({
  text: z.string().min(1, { message: "Title cannot be empty" }),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Priority is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface TodoFormProps {
  onAddTodo: (text: string, description?: string, priority?: Priority) => void;
}

const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const { colorTheme } = useThemeContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      description: "",
      priority: "medium",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    onAddTodo(data.text, data.description, data.priority as Priority);
    form.reset({ text: "", description: "", priority: "medium" });
    setIsSubmitting(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full bg-gradient-to-r from-primary to-primary/70 hover:from-primary hover:to-primary/80 text-primary-foreground font-medium"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">Add New Task</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in the details for your new task. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter task title"
                      {...field}
                      disabled={isSubmitting}
                      className="text-base"
                    />
                  </FormControl>
                  <FormDescription>
                    The main title of your task.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter additional details about this task"
                      {...field}
                      disabled={isSubmitting}
                      className="text-base min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex justify-between gap-2"
                    >
                      <FormItem className="flex-1 space-y-0">
                        <FormControl>
                          <div className="flex flex-col items-center space-y-1">
                            <RadioGroupItem value="low" id="low" className="sr-only" />
                            <div className={`w-full py-3 px-3 rounded-md text-center border-2 transition-all cursor-pointer ${field.value === 'low' ? 'border-blue-500 bg-blue-50' : 'border-transparent bg-blue-100 hover:bg-blue-200'}`}>
                              <FormLabel className="font-medium text-blue-700 cursor-pointer w-full flex justify-center items-center gap-1" htmlFor="low">
                                <span>Low</span>
                              </FormLabel>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                      
                      <FormItem className="flex-1 space-y-0">
                        <FormControl>
                          <div className="flex flex-col items-center space-y-1">
                            <RadioGroupItem value="medium" id="medium" className="sr-only" />
                            <div className={`w-full py-3 px-3 rounded-md text-center border-2 transition-all cursor-pointer ${field.value === 'medium' ? 'border-yellow-500 bg-yellow-50' : 'border-transparent bg-yellow-100 hover:bg-yellow-200'}`}>
                              <FormLabel className="font-medium text-yellow-700 cursor-pointer w-full flex justify-center items-center gap-1" htmlFor="medium">
                                <span>Medium</span>
                              </FormLabel>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                      
                      <FormItem className="flex-1 space-y-0">
                        <FormControl>
                          <div className="flex flex-col items-center space-y-1">
                            <RadioGroupItem value="high" id="high" className="sr-only" />
                            <div className={`w-full py-3 px-3 rounded-md text-center border-2 transition-all cursor-pointer ${field.value === 'high' ? 'border-red-500 bg-red-50' : 'border-transparent bg-red-100 hover:bg-red-200'}`}>
                              <FormLabel className="font-medium text-red-700 cursor-pointer w-full flex justify-center items-center gap-1" htmlFor="high">
                                <span>High</span>
                              </FormLabel>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="mt-4"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="bg-gradient-to-r from-primary to-primary/70 hover:from-primary hover:to-primary/80 text-primary-foreground font-medium mt-4"
              >
                Save Task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoForm;
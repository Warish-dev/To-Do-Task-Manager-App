import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Priority } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Form validation schema
const formSchema = z.object({
  text: z.string().min(1, { message: "Task cannot be empty" }),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Priority is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface TodoFormProps {
  onAddTodo: (text: string, priority: Priority) => void;
}

const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      priority: "medium",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    onAddTodo(data.text, data.priority as Priority);
    form.reset({ text: "", priority: "medium" });
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mb-6"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="What needs to be done?"
                  {...field}
                  disabled={isSubmitting}
                  className="text-base"
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
                        <div className={`w-full py-2 px-3 rounded-md text-center border-2 transition-all cursor-pointer ${field.value === 'low' ? 'border-blue-500 bg-blue-50' : 'border-transparent bg-blue-100 hover:bg-blue-200'}`}>
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
                        <div className={`w-full py-2 px-3 rounded-md text-center border-2 transition-all cursor-pointer ${field.value === 'medium' ? 'border-yellow-500 bg-yellow-50' : 'border-transparent bg-yellow-100 hover:bg-yellow-200'}`}>
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
                        <div className={`w-full py-2 px-3 rounded-md text-center border-2 transition-all cursor-pointer ${field.value === 'high' ? 'border-red-500 bg-red-50' : 'border-transparent bg-red-100 hover:bg-red-200'}`}>
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
        
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-medium"
        >
          Add Task
        </Button>
      </form>
    </Form>
  );
};

export default TodoForm;
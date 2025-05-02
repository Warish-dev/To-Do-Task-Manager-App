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
                  className="flex space-x-1"
                >
                  <FormItem className="flex items-center space-x-1 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="low" id="low" />
                    </FormControl>
                    <FormLabel className="font-normal rounded-full px-2 py-1 bg-blue-100 text-blue-700" htmlFor="low">
                      Low
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-1 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="medium" id="medium" />
                    </FormControl>
                    <FormLabel className="font-normal rounded-full px-2 py-1 bg-yellow-100 text-yellow-700" htmlFor="medium">
                      Medium
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-1 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="high" id="high" />
                    </FormControl>
                    <FormLabel className="font-normal rounded-full px-2 py-1 bg-red-100 text-red-700" htmlFor="high">
                      High
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting} className="w-full">
          Add Task
        </Button>
      </form>
    </Form>
  );
};

export default TodoForm;
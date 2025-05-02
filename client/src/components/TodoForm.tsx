import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Form validation schema
const formSchema = z.object({
  text: z.string().min(1, { message: "Task cannot be empty" }),
});

type FormValues = z.infer<typeof formSchema>;

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    onAddTodo(data.text);
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex space-x-2 mb-6"
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
        <Button type="submit" disabled={isSubmitting}>
          Add Task
        </Button>
      </form>
    </Form>
  );
};

export default TodoForm;
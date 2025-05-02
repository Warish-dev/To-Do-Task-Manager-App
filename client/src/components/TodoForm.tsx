import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const formSchema = z.object({
  text: z.string().min(1, { message: "Please enter a task" }),
});

type FormValues = z.infer<typeof formSchema>;

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    onAddTodo(data.text);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center">
        <div className="relative flex-1">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Add a new task..."
                    className="w-full p-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-error text-xs mt-1" />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="ml-2 bg-primary text-white p-2 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </form>
    </Form>
  );
};

export default TodoForm;


import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Clock, CheckCircle2 } from 'lucide-react';

interface TodoItem {
  id: string;
  title: string;
  due: string;
  completed: boolean;
  course: string;
  type: "assignment" | "quiz" | "reading" | "exam";
}

interface TaskSettingsFormProps {
  tasks: TodoItem[];
  courses: { id: string; name: string; }[];
  onSave: (tasks: TodoItem[]) => void;
}

const formSchema = z.object({
  title: z.string().min(2, { message: "Task title must be at least 2 characters." }),
  due: z.string(),
  course: z.string(),
  type: z.enum(["assignment", "quiz", "reading", "exam"]),
});

const TaskSettingsForm: React.FC<TaskSettingsFormProps> = ({ tasks, courses, onSave }) => {
  const { toast } = useToast();
  const [userTasks, setUserTasks] = useState<TodoItem[]>(tasks);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      due: '',
      course: courses.length > 0 ? courses[0].name : '',
      type: 'assignment' as const,
    },
  });

  const handleEditTask = (task: TodoItem) => {
    setEditingTaskId(task.id);
    form.reset({
      title: task.title,
      due: task.due,
      course: task.course,
      type: task.type,
    });
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = userTasks.filter(task => task.id !== taskId);
    setUserTasks(updatedTasks);
    onSave(updatedTasks);
    toast({
      title: "Task deleted",
      description: "The task has been removed from your list.",
    });
  };

  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = userTasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setUserTasks(updatedTasks);
    onSave(updatedTasks);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    let updatedTasks;
    
    if (editingTaskId) {
      // Edit existing task
      updatedTasks = userTasks.map(task => 
        task.id === editingTaskId 
          ? { 
              ...task, 
              title: values.title,
              due: values.due,
              course: values.course,
              type: values.type,
            }
          : task
      );
      toast({
        title: "Task updated",
        description: `"${values.title}" has been updated successfully.`,
      });
    } else {
      // Add new task
      const newTask: TodoItem = {
        id: Date.now().toString(),
        title: values.title,
        due: values.due,
        completed: false,
        course: values.course,
        type: values.type,
      };
      updatedTasks = [...userTasks, newTask];
      toast({
        title: "Task added",
        description: `"${values.title}" has been added to your tasks.`,
      });
    }
    
    setUserTasks(updatedTasks);
    onSave(updatedTasks);
    form.reset({
      title: '',
      due: '',
      course: courses.length > 0 ? courses[0].name : '',
      type: 'assignment' as const,
    });
    setEditingTaskId(null);
  }

  const getTaskTypeLabel = (type: "assignment" | "quiz" | "reading" | "exam") => {
    switch (type) {
      case 'assignment':
        return 'Assignment';
      case 'quiz':
        return 'Quiz';
      case 'reading':
        return 'Reading';
      case 'exam':
        return 'Exam';
      default:
        return type;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Management</CardTitle>
        <CardDescription>
          Add, edit, or remove your tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Complete Calculus Assignment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="due"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Tomorrow, 11:59 PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courses.length > 0 ? (
                          courses.map((course) => (
                            <SelectItem key={course.id} value={course.name}>
                              {course.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="None">No courses available</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange as (value: string) => void} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select task type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="reading">Reading</SelectItem>
                        <SelectItem value="exam">Exam</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit">
                {editingTaskId ? 'Update Task' : 'Add Task'}
              </Button>
              {editingTaskId && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => { 
                    setEditingTaskId(null); 
                    form.reset({
                      title: '',
                      due: '',
                      course: courses.length > 0 ? courses[0].name : '',
                      type: 'assignment' as const,
                    }); 
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Your Tasks</h3>
          {userTasks.length === 0 ? (
            <p className="text-sm text-muted-foreground">No tasks added yet.</p>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {userTasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`p-4 border rounded-md ${task.completed ? 'bg-muted/30' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskCompletion(task.id)}
                        className="mt-1"
                      />
                      <div>
                        <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </h4>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          Due: {task.due}
                        </div>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {task.course}
                          </Badge>
                          <Badge
                            variant={
                              task.type === 'exam'
                                ? 'destructive'
                                : task.type === 'quiz'
                                ? 'secondary'
                                : 'default'
                            }
                            className="text-xs"
                          >
                            {getTaskTypeLabel(task.type)}
                          </Badge>
                          {task.completed && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditTask(task)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskSettingsForm;

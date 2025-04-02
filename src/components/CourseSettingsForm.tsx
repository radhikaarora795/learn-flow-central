
import React from 'react';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, PlusCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Course {
  id: string;
  name: string;
  progress: number;
  nextClass: string;
  deadlines: {
    title: string;
    date: string;
    type: "assignment" | "exam" | "project";
  }[];
}

interface CourseSettingsFormProps {
  courses: Course[];
  onSave: (courses: Course[]) => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Course name must be at least 2 characters." }),
  nextClass: z.string().optional(),
});

const CourseSettingsForm: React.FC<CourseSettingsFormProps> = ({ courses, onSave }) => {
  const { toast } = useToast();
  const [userCourses, setUserCourses] = React.useState<Course[]>(courses);
  const [editingCourseId, setEditingCourseId] = React.useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      nextClass: '',
    },
  });

  const handleEditCourse = (course: Course) => {
    setEditingCourseId(course.id);
    form.reset({
      name: course.name,
      nextClass: course.nextClass,
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    const updatedCourses = userCourses.filter(course => course.id !== courseId);
    setUserCourses(updatedCourses);
    onSave(updatedCourses);
    toast({
      title: "Course deleted",
      description: "The course has been removed from your profile.",
    });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    let updatedCourses;
    
    if (editingCourseId) {
      // Edit existing course
      updatedCourses = userCourses.map(course => 
        course.id === editingCourseId 
          ? { ...course, name: values.name, nextClass: values.nextClass || course.nextClass }
          : course
      );
      toast({
        title: "Course updated",
        description: `"${values.name}" has been updated successfully.`,
      });
    } else {
      // Add new course
      const newCourse: Course = {
        id: Date.now().toString(),
        name: values.name,
        progress: 0,
        nextClass: values.nextClass || 'Not scheduled',
        deadlines: [],
      };
      updatedCourses = [...userCourses, newCourse];
      toast({
        title: "Course added",
        description: `"${values.name}" has been added to your courses.`,
      });
    }
    
    setUserCourses(updatedCourses);
    onSave(updatedCourses);
    form.reset();
    setEditingCourseId(null);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Management</CardTitle>
        <CardDescription>
          Add, edit, or remove your courses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Advanced Mathematics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="nextClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Next Class (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Tomorrow, 2:00 PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex gap-2">
              <Button type="submit">
                {editingCourseId ? 'Update Course' : 'Add Course'}
              </Button>
              {editingCourseId && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => { 
                    setEditingCourseId(null); 
                    form.reset(); 
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Your Courses</h3>
          {userCourses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No courses added yet.</p>
          ) : (
            <div className="space-y-4">
              {userCourses.map((course) => (
                <div key={course.id} className="p-4 border rounded-md flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{course.name}</h4>
                      <p className="text-sm text-muted-foreground">Next: {course.nextClass}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditCourse(course)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  
                  {course.deadlines.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-medium mb-2">Deadlines:</p>
                      <div className="flex flex-wrap gap-2">
                        {course.deadlines.map((deadline, idx) => (
                          <Badge 
                            key={idx} 
                            variant={
                              deadline.type === 'exam' 
                                ? 'destructive' 
                                : deadline.type === 'project' 
                                ? 'secondary' 
                                : 'default'
                            }
                            className="text-xs flex items-center gap-1"
                          >
                            {deadline.title} - {deadline.date}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseSettingsForm;

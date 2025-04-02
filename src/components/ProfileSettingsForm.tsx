
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  grade: z.string(),
  learningStyle: z.string(),
  avatarUrl: z.string().optional(),
});

interface ProfileSettingsFormProps {
  initialData: {
    name: string;
    email?: string;
    grade: string;
    learningStyle: string;
    avatarUrl?: string;
    overallProgress: number;
  };
  onSave: (data: z.infer<typeof formSchema>) => void;
}

const ProfileSettingsForm: React.FC<ProfileSettingsFormProps> = ({ initialData, onSave }) => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name,
      email: initialData.email || '',
      grade: initialData.grade,
      learningStyle: initialData.learningStyle,
      avatarUrl: initialData.avatarUrl || '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(values);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your personal information and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="h-16 w-16 border-2 border-learn-primary">
            <AvatarImage src={initialData.avatarUrl} alt={initialData.name} />
            <AvatarFallback className="bg-learn-primary text-white text-lg">
              {initialData.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Profile Photo</p>
            <p className="text-xs text-muted-foreground mt-1">
              Upload a new photo or update your profile information below
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade / Year</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your grade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Freshman Year">Freshman Year</SelectItem>
                        <SelectItem value="Sophomore Year">Sophomore Year</SelectItem>
                        <SelectItem value="Junior Year">Junior Year</SelectItem>
                        <SelectItem value="Senior Year">Senior Year</SelectItem>
                        <SelectItem value="Graduate Student">Graduate Student</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="learningStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Learning Style</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your learning style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Visual Learner">Visual Learner</SelectItem>
                        <SelectItem value="Auditory Learner">Auditory Learner</SelectItem>
                        <SelectItem value="Reading/Writing Learner">Reading/Writing Learner</SelectItem>
                        <SelectItem value="Kinesthetic Learner">Kinesthetic Learner</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="avatarUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/avatar.jpg" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a URL for your profile picture, or leave blank to use initials
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full md:w-auto">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettingsForm;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Bell, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TodoItem {
  id: string;
  title: string;
  due: string;
  completed: boolean;
  course: string;
  type: 'assignment' | 'quiz' | 'reading' | 'exam';
}

interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
  type: 'deadline' | 'feedback' | 'update';
}

interface TodoListProps {
  todos: TodoItem[];
  notifications: Notification[];
}

const TodoList: React.FC<TodoListProps> = ({ todos, notifications }) => {
  const [todoItems, setTodoItems] = useState(todos);
  const [notificationItems, setNotificationItems] = useState(notifications);

  const toggleTodoCompletion = (id: string) => {
    setTodoItems(
      todoItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotificationItems(
      notificationItems.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotificationItems(
      notificationItems.map((item) => ({ ...item, read: true }))
    );
  };

  return (
    <Card className="shadow-md h-full animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <CheckSquare className="mr-2 h-5 w-5 text-learn-primary" />
          Tasks & Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="todo">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="todo" className="flex items-center">
              <CheckSquare className="mr-2 h-4 w-4" />
              To-Do
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
              {notificationItems.filter((n) => !n.read).length > 0 && (
                <Badge className="ml-2 bg-learn-warning">
                  {notificationItems.filter((n) => !n.read).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="todo" className="space-y-3">
            {todoItems.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No pending tasks. Great job!
              </div>
            ) : (
              todoItems.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-start space-x-3 p-3 rounded-md border ${
                    todo.completed ? 'bg-muted/50' : ''
                  }`}
                >
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodoCompletion(todo.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div
                      className={`font-medium ${
                        todo.completed ? 'line-through text-muted-foreground' : ''
                      }`}
                    >
                      {todo.title}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      Due: {todo.due}
                    </div>
                    <div className="flex mt-2 space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {todo.course}
                      </Badge>
                      <Badge
                        variant={
                          todo.type === 'exam'
                            ? 'destructive'
                            : todo.type === 'quiz'
                            ? 'secondary'
                            : 'default'
                        }
                        className="text-xs"
                      >
                        {todo.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="notifications">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {notificationItems.filter((n) => !n.read).length} unread
              </span>
              {notificationItems.filter((n) => !n.read).length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllNotificationsAsRead}
                >
                  Mark all as read
                </Button>
              )}
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {notificationItems.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-md border ${
                    notification.read ? 'bg-muted/30' : 'bg-card border-l-4 border-l-learn-accent'
                  }`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex justify-between">
                    <span
                      className={`font-medium ${
                        notification.read ? 'text-muted-foreground' : ''
                      }`}
                    >
                      {notification.message}
                    </span>
                    <Badge
                      variant={
                        notification.type === 'deadline'
                          ? 'destructive'
                          : notification.type === 'feedback'
                          ? 'secondary'
                          : 'outline'
                      }
                      className="text-xs"
                    >
                      {notification.type}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TodoList;

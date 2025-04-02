
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Course {
  id: string;
  name: string;
  progress: number;
  nextClass: string;
  deadlines: {
    title: string;
    date: string;
    type: 'assignment' | 'exam' | 'project';
  }[];
}

interface CourseOverviewProps {
  courses: Course[];
}

const CourseOverview: React.FC<CourseOverviewProps> = ({ courses }) => {
  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Course Overview</CardTitle>
          <span className="text-sm text-muted-foreground">
            {courses.length} active courses
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="border rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold flex items-center">
                  <Book className="h-4 w-4 mr-2 text-learn-primary" />
                  {course.name}
                </h3>
                <Badge variant="outline">{course.progress}% complete</Badge>
              </div>
              <Progress value={course.progress} className="h-2 mb-3" />
              <div className="text-sm text-muted-foreground flex items-center mb-2">
                <Clock className="h-4 w-4 mr-1" />
                <span>Next class: {course.nextClass}</span>
              </div>
              {course.deadlines.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">
                    Upcoming Deadlines
                  </p>
                  <div className="space-y-1">
                    {course.deadlines.map((deadline, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm">{deadline.title}</span>
                        <div className="flex items-center">
                          <Badge
                            variant={
                              deadline.type === 'exam'
                                ? 'destructive'
                                : deadline.type === 'project'
                                ? 'secondary'
                                : 'default'
                            }
                            className="text-xs mr-2"
                          >
                            {deadline.type}
                          </Badge>
                          <span className="text-xs font-medium">
                            {deadline.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseOverview;

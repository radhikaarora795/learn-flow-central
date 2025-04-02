
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Clock, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface SubjectProgress {
  subject: string;
  mastery: number;
  timeSpent: number; // in hours
  recentGrades: {
    title: string;
    score: string;
    date: string;
  }[];
  skills: {
    name: string;
    level: number;
  }[];
}

interface ProgressTrackingProps {
  subjects: SubjectProgress[];
}

const ProgressTracking: React.FC<ProgressTrackingProps> = ({ subjects }) => {
  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <BarChart className="mr-2 h-5 w-5 text-learn-primary" />
          Progress & Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mastery">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="mastery">Skill Mastery</TabsTrigger>
            <TabsTrigger value="grades">Recent Grades</TabsTrigger>
            <TabsTrigger value="time">Time Spent</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mastery" className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{subject.subject}</h3>
                  <Badge variant="outline">
                    {subject.mastery}% Mastery
                  </Badge>
                </div>
                <Progress value={subject.mastery} className="h-2" />
                
                <div className="mt-2 space-y-1.5">
                  {subject.skills.map((skill, idx) => (
                    <div key={idx} className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={14}
                              className={`${
                                star <= skill.level
                                  ? 'fill-learn-accent text-learn-accent'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="grades">
            <div className="space-y-4">
              {subjects.map((subject, index) => (
                <div key={index}>
                  <h3 className="font-medium mb-2">{subject.subject}</h3>
                  <div className="space-y-2">
                    {subject.recentGrades.map((grade, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-2 border rounded"
                      >
                        <span className="text-sm">{grade.title}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            {grade.date}
                          </span>
                          <Badge
                            variant={
                              grade.score.includes('A')
                                ? 'default'
                                : grade.score.includes('B')
                                ? 'secondary'
                                : 'outline'
                            }
                          >
                            {grade.score}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="time">
            <div className="space-y-4">
              {subjects.map((subject, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium flex items-center">
                      <Clock size={16} className="mr-2 text-learn-info" />
                      {subject.subject}
                    </h3>
                    <span className="text-sm font-medium">
                      {subject.timeSpent} hours
                    </span>
                  </div>
                  <Progress
                    value={(subject.timeSpent / 10) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProgressTracking;


import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UserProfileCardProps {
  name: string;
  avatarUrl?: string;
  grade: string;
  learningStyle: string;
  overallProgress: number;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  name,
  avatarUrl,
  grade,
  learningStyle,
  overallProgress,
}) => {
  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-learn-primary">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="bg-learn-primary text-white text-lg">
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge variant="secondary">{grade}</Badge>
              <Badge variant="outline">{learningStyle}</Badge>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm">Overall Progress</span>
            <span className="text-sm font-medium">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Star, Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  completed: boolean;
  icon: 'award' | 'star' | 'flame';
}

interface AchievementsCardProps {
  achievements: Achievement[];
  streak: number;
  level: number;
  xp: number;
  nextLevelXp: number;
}

const AchievementsCard: React.FC<AchievementsCardProps> = ({
  achievements,
  streak,
  level,
  xp,
  nextLevelXp,
}) => {
  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'award':
        return <Award className="h-4 w-4 text-purple-500" />;
      case 'star':
        return <Star className="h-4 w-4 text-yellow-500" />;
      case 'flame':
        return <Flame className="h-4 w-4 text-orange-500" />;
      default:
        return <Award className="h-4 w-4" />;
    }
  };

  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Award className="mr-2 h-5 w-5 text-learn-primary" />
          Achievements & Motivation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-learn-primary text-white flex items-center justify-center text-xl font-bold">
              {level}
            </div>
            <div className="ml-3">
              <p className="font-medium">Level {level}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{xp}/{nextLevelXp} XP to next level</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center">
              <Flame className="h-5 w-5 text-orange-500 mr-1" />
              <span className="font-bold text-xl">{streak}</span>
            </div>
            <p className="text-xs text-muted-foreground">Day streak</p>
          </div>
        </div>

        <Progress value={(xp / nextLevelXp) * 100} className="h-2 mb-4" />

        <div className="space-y-3">
          <p className="text-sm font-medium">Recent Achievements</p>
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-start p-2 border rounded-lg"
            >
              <div className="mr-3 mt-1">{renderIcon(achievement.icon)}</div>
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-medium">{achievement.title}</h3>
                  {achievement.completed && (
                    <Badge className="ml-2 bg-green-500 text-white">
                      Completed
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {achievement.description}
                </p>
                {!achievement.completed && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-1.5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsCard;

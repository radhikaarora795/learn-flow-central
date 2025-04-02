
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Calendar, Play, Pause, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface StudySession {
  id: string;
  subject: string;
  time: string;
  duration: number; // in minutes
}

interface StudyPlannerProps {
  todaySessions: StudySession[];
}

const StudyPlanner: React.FC<StudyPlannerProps> = ({ todaySessions }) => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [currentSession, setCurrentSession] = useState<StudySession | null>(
    null
  );

  // Simulate timer functionality
  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    setTimerMinutes(25);
    setTimerSeconds(0);
  };

  const startSession = (session: StudySession) => {
    setCurrentSession(session);
    setTimerMinutes(session.duration);
    setTimerSeconds(0);
    setIsTimerActive(true);
  };

  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <Card className="shadow-md h-full animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-learn-primary" />
          Study Planner
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center py-6 bg-muted/30 rounded-lg">
            <div className="text-3xl font-bold mb-2">
              {formatTime(timerMinutes, timerSeconds)}
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {currentSession
                ? `Studying: ${currentSession.subject}`
                : 'Pomodoro Timer'}
            </p>
            <Progress
              value={
                currentSession
                  ? ((currentSession.duration - timerMinutes) /
                      currentSession.duration) *
                    100
                  : 0
              }
              className="h-1.5 mb-4 max-w-56 mx-auto"
            />
            <div className="flex justify-center space-x-2">
              <Button
                variant={isTimerActive ? 'default' : 'outline'}
                size="sm"
                onClick={toggleTimer}
              >
                {isTimerActive ? (
                  <Pause className="h-4 w-4 mr-1" />
                ) : (
                  <Play className="h-4 w-4 mr-1" />
                )}
                {isTimerActive ? 'Pause' : 'Start'}
              </Button>
              <Button variant="outline" size="sm" onClick={resetTimer}>
                <SkipForward className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center mb-2">
              <Calendar className="h-4 w-4 mr-2 text-learn-accent" />
              <h3 className="font-medium">Today's Study Schedule</h3>
            </div>
            <div className="space-y-2">
              {todaySessions.map((session) => (
                <div
                  key={session.id}
                  className="flex justify-between items-center p-2 border rounded-md"
                >
                  <div>
                    <p className="font-medium">{session.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.time} • {session.duration} min
                    </p>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startSession(session)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Start study session</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyPlanner;

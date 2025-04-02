
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudyTimerProps {
  focusTime?: number; // in minutes
  breakTime?: number; // in minutes
  soundEnabled?: boolean;
}

type TimerMode = 'focus' | 'break';

const StudyTimer: React.FC<StudyTimerProps> = ({
  focusTime = 25,
  breakTime = 5,
  soundEnabled = true,
}) => {
  const [timeLeft, setTimeLeft] = useState(focusTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>('focus');
  const [isMuted, setIsMuted] = useState(!soundEnabled);
  const timerRef = useRef<number | null>(null);
  const { toast } = useToast();
  
  // Sound effects
  const alarmRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    alarmRef.current = new Audio('/alarm.mp3'); // Placeholder for an alarm sound
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Set initial time when focusTime or breakTime props change
  useEffect(() => {
    if (!isActive) {
      setTimeLeft(mode === 'focus' ? focusTime * 60 : breakTime * 60);
    }
  }, [focusTime, breakTime, mode, isActive]);

  // Timer logic
  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            const nextMode = mode === 'focus' ? 'break' : 'focus';
            const message = mode === 'focus' 
              ? 'Focus session completed. Time for a break!' 
              : 'Break time over. Ready to focus again?';
            
            // Play sound if not muted
            if (!isMuted && alarmRef.current) {
              alarmRef.current.play().catch(err => console.error('Error playing audio:', err));
            }
            
            // Show notification
            toast({
              title: 'Timer Completed',
              description: message,
            });
            
            // Switch modes
            setMode(nextMode);
            setIsActive(false);
            return nextMode === 'focus' ? focusTime * 60 : breakTime * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, mode, isMuted, focusTime, breakTime, toast]);

  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const calculateProgress = (): number => {
    const totalSeconds = mode === 'focus' ? focusTime * 60 : breakTime * 60;
    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? focusTime * 60 : breakTime * 60);
  };

  const toggleMode = () => {
    const newMode = mode === 'focus' ? 'break' : 'focus';
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'focus' ? focusTime * 60 : breakTime * 60);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Study Timer</span>
          <div className="flex items-center space-x-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-7 px-2" 
              onClick={toggleMode}
            >
              {mode === 'focus' ? 'Focus Mode' : 'Break Mode'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-4">
          <div className="text-5xl font-bold mb-6 font-mono">
            {formatTime(timeLeft)}
          </div>
          
          <Progress 
            value={calculateProgress()} 
            className="w-full h-2 mb-6" 
            indicatorColor={mode === 'focus' ? 'bg-learn-primary' : 'bg-learn-accent'}
          />
          
          <div className="flex space-x-4">
            <Button
              variant={isActive ? "outline" : "default"}
              size="icon"
              onClick={toggleTimer}
            >
              {isActive ? <Pause /> : <Play />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={resetTimer}
            >
              <RotateCcw />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            {mode === 'focus' 
              ? `Stay focused for ${focusTime} minutes`
              : `Take a ${breakTime} minute break`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyTimer;

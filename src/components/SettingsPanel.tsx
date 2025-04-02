
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bell, Moon, Sun, Volume2, Clock, Monitor } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettingsPanelProps {
  onSave: (settings: {
    notifications: boolean;
    darkMode: boolean;
    soundEffects: boolean;
    soundVolume: number;
    focusTime: number;
    breakTime: number;
  }) => void;
  defaultSettings: {
    notifications: boolean;
    darkMode: boolean;
    soundEffects: boolean;
    soundVolume: number;
    focusTime: number;
    breakTime: number;
  };
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  onSave, 
  defaultSettings 
}) => {
  const { toast } = useToast();
  const [settings, setSettings] = React.useState(defaultSettings);

  const handleToggleChange = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleVolumeChange = (value: number[]) => {
    setSettings(prev => ({
      ...prev,
      soundVolume: value[0]
    }));
  };

  const handleTimeChange = (key: 'focusTime' | 'breakTime', value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setSettings(prev => ({
        ...prev,
        [key]: numValue
      }));
    }
  };

  const handleSaveSettings = () => {
    onSave(settings);
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid grid-cols-3 w-full mb-8">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="studyTimer">Study Timer</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Manage your appearance and system preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
                <div className="text-sm text-muted-foreground">
                  Switch between light and dark theme
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch 
                  id="dark-mode" 
                  checked={settings.darkMode}
                  onCheckedChange={() => handleToggleChange('darkMode')}
                />
                <Moon className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sound-effects" className="text-base">Sound Effects</Label>
                <div className="text-sm text-muted-foreground">
                  Enable or disable system sounds
                </div>
              </div>
              <Switch 
                id="sound-effects" 
                checked={settings.soundEffects}
                onCheckedChange={() => handleToggleChange('soundEffects')}
              />
            </div>
            
            {settings.soundEffects && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="volume-slider" className="text-sm">Volume</Label>
                  <span className="text-sm text-muted-foreground">{settings.soundVolume}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    id="volume-slider"
                    defaultValue={[settings.soundVolume]}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className="flex-1"
                  />
                </div>
              </div>
            )}
            
            <div className="pt-4">
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Manage how and when you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications" className="text-base">Enable Notifications</Label>
                <div className="text-sm text-muted-foreground">
                  Receive notifications for assignments and deadlines
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <Switch 
                  id="notifications" 
                  checked={settings.notifications}
                  onCheckedChange={() => handleToggleChange('notifications')}
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="studyTimer">
        <Card>
          <CardHeader>
            <CardTitle>Study Timer Settings</CardTitle>
            <CardDescription>
              Configure your study session and break times
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="focus-time" className="text-base">Focus Time (minutes)</Label>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input 
                  id="focus-time" 
                  type="number" 
                  min={1}
                  value={settings.focusTime}
                  onChange={(e) => handleTimeChange('focusTime', e.target.value)}
                  className="w-24"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="break-time" className="text-base">Break Time (minutes)</Label>
              <div className="flex items-center space-x-2">
                <Monitor className="h-4 w-4 text-muted-foreground" />
                <Input 
                  id="break-time" 
                  type="number" 
                  min={1}
                  value={settings.breakTime}
                  onChange={(e) => handleTimeChange('breakTime', e.target.value)}
                  className="w-24"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SettingsPanel;

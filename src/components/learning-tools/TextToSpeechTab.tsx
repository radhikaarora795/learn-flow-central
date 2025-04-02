
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TextToSpeechTabProps {}

const TextToSpeechTab: React.FC<TextToSpeechTabProps> = () => {
  const [textToSpeak, setTextToSpeak] = useState('');
  const { toast } = useToast();

  const handleTextToSpeech = () => {
    if (!textToSpeak.trim()) return;
    
    toast({
      title: "Text to Speech",
      description: "Converting text to speech...",
      duration: 3000,
    });
    
    // In a real app, this would call a text-to-speech API
    setTimeout(() => {
      toast({
        title: "Speech Generated",
        description: "Text successfully converted to speech",
        duration: 3000,
      });
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm mb-1">
          Enter text to convert to speech
        </label>
        <Textarea
          value={textToSpeak}
          onChange={(e) => setTextToSpeak(e.target.value)}
          placeholder="Enter text to be converted to speech..."
          className="h-[100px] resize-none"
        />
      </div>
      <Button
        onClick={handleTextToSpeech}
        className="w-full"
        disabled={!textToSpeak.trim()}
      >
        <Volume2 className="h-4 w-4 mr-2" />
        Convert to Speech
      </Button>
      <div className="text-sm text-center text-muted-foreground">
        <Lightbulb className="h-4 w-4 inline mr-1" />
        Perfect for auditory learners and accessibility
      </div>
    </div>
  );
};

export default TextToSpeechTab;


import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import AIChatbox from '@/components/AIChatbox';

interface DashboardHeaderProps {
  title: string;
  isMobileChatOpen: boolean;
  setIsMobileChatOpen: (open: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  isMobileChatOpen,
  setIsMobileChatOpen,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      
      <div className="md:hidden">
        <Drawer open={isMobileChatOpen} onOpenChange={setIsMobileChatOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh]">
            <div className="p-4 h-full">
              <AIChatbox />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default DashboardHeader;

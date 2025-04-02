
import React from 'react';
import AchievementsCard from '@/components/AchievementsCard';
import { mockAchievements } from '@/data/mockData';

const AchievementsSection: React.FC = () => {
  return (
    <div>
      <AchievementsCard 
        achievements={mockAchievements} 
        streak={7} 
        level={12} 
        xp={2450} 
        nextLevelXp={3000}
      />
    </div>
  );
};

export default AchievementsSection;


import React from 'react';
import ProfileSettingsForm from '@/components/ProfileSettingsForm';
import { useDashboard } from '@/contexts/DashboardContext';

const ProfileSection: React.FC = () => {
  const { userProfile, handleProfileUpdate } = useDashboard();

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <ProfileSettingsForm 
          initialData={userProfile} 
          onSave={handleProfileUpdate}
        />
      </div>
    </div>
  );
};

export default ProfileSection;

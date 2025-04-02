
import React from 'react';
import CourseOverview from '@/components/CourseOverview';
import ProgressTracking from '@/components/ProgressTracking';
import { useDashboard } from '@/contexts/DashboardContext';
import { mockSubjects } from '@/data/mockData';

const CoursesSection: React.FC = () => {
  const { userCourses } = useDashboard();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <CourseOverview courses={userCourses} />
      </div>
      <div className="md:col-span-1">
        <ProgressTracking subjects={mockSubjects} />
      </div>
    </div>
  );
};

export default CoursesSection;

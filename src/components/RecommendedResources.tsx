
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, BookmarkPlus, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Resource {
  id: string;
  title: string;
  source: string;
  type: 'video' | 'article' | 'practice' | 'book';
  relevantSubject: string;
  saved: boolean;
  url: string;
}

interface RecommendedResourcesProps {
  resources: Resource[];
  onSaveResource: (id: string) => void;
}

const RecommendedResources: React.FC<RecommendedResourcesProps> = ({
  resources,
  onSaveResource,
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎬';
      case 'article':
        return '📝';
      case 'practice':
        return '🏋️';
      case 'book':
        return '📚';
      default:
        return '📌';
    }
  };

  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-learn-primary" />
          Recommended Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="p-3 border rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium flex items-center">
                    <span className="mr-2">{getTypeIcon(resource.type)}</span>
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {resource.source}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSaveResource(resource.id)}
                  className={resource.saved ? 'text-learn-accent' : ''}
                >
                  <BookmarkPlus size={18} />
                </Button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <Badge variant="outline">{resource.relevantSubject}</Badge>
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0"
                  asChild
                >
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-learn-primary"
                  >
                    Open <ExternalLink size={12} className="ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedResources;

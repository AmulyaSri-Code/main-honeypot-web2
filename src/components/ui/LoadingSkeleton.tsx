import React from 'react';
import { Card } from './Card';
import { cn } from '../../lib/utils';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#1f2937]/50", className)}
      {...props}
    />
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-32 p-6 flex flex-col justify-between">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-32 mt-4" />
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 h-[400px]">
          <Skeleton className="h-6 w-32 mb-6" />
          <Skeleton className="h-[300px] w-full" />
        </Card>
        <Card className="h-[400px]">
          <Skeleton className="h-6 w-32 mb-6" />
          <Skeleton className="h-[300px] w-full" />
        </Card>
      </div>
    </div>
  );
};

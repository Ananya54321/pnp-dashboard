'use client'

import { Button } from "@/components/ui/button"

interface LoadingStateProps {
  message?: string;
}

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export const LoadingState = ({ message = "Loading creators..." }: LoadingStateProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black p-6">
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{message}</p>
        </div>
      </div>
    </div>
  );
};

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black p-6">
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 text-lg mb-4">{error}</p>
          {onRetry && (
            <Button onClick={onRetry}>Try Again</Button>
          )}
        </div>
      </div>
    </div>
  );
};

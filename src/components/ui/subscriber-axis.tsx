"use client";
import { Avatar } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  avatar: string;
  subscribers: number;
}

interface SubscriberAxisProps {
  currentUser: User;
  className?: string;
}

export const SubscriberAxis = ({ currentUser, className }: SubscriberAxisProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Mock data for other users - you can replace this with real data
  const allUsers: User[] = [
    { id: "1", name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", subscribers: 4500 },
    currentUser,
    { id: "5", name: "Emma Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", subscribers: 4700 },
    { id: "6", name: "David Wilson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", subscribers: 5500 },
    { id: "7", name: "Lisa Brown", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", subscribers: 6000 },
    { id: "8", name: "Tom Anderson", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face", subscribers: 6200 },
  ];

  // Sort users by subscriber count
  const sortedUsers = allUsers.sort((a, b) => a.subscribers - b.subscribers);
  
  // Get min and max subscribers for scaling
  const minSubscribers = Math.min(...sortedUsers.map(u => u.subscribers));
  const maxSubscribers = Math.max(...sortedUsers.map(u => u.subscribers));
  
  // Calculate position for each user (0-100%)
  const getUserPosition = (subscribers: number) => {
    if (maxSubscribers === minSubscribers) return 50;
    return ((subscribers - minSubscribers) / (maxSubscribers - minSubscribers)) * 100;
  };

  const formatSubscriberCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6", className)}>
      <div className="relative">
        {/* X-axis line */}
        <div className={cn(
          "w-full h-0.5 relative mb-4",
          isDarkMode ? "bg-gray-700" : "bg-gray-300"
        )}>
          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map((position) => (
            <div
              key={position}
              className={cn(
                "absolute w-0.5 h-3 -top-1",
                isDarkMode ? "bg-gray-600" : "bg-gray-400"
              )}
              style={{ left: `${position}%` }}
            />
          ))}
        </div>

        {/* User avatars */}
        <div className="relative h-24">
          {sortedUsers.map((user) => {
            const position = getUserPosition(user.subscribers);
            const isCurrentUser = user.id === currentUser.id;
            
            return (
              <div
                key={user.id}
                className="absolute transform -translate-x-1/2 -translate-y-full"
                style={{ left: `${position}%`, top: "0%" }}
              >
                <div className="flex flex-col items-center space-y-2">
                  {/* Avatar */}
                  <div className={cn(
                    "relative",
                    isCurrentUser && "ring-4 ring-blue-500 rounded-full"
                  )}>
                    <Avatar className={cn(
                      "transition-all duration-300 hover:scale-110",
                      isCurrentUser ? "w-16 h-16" : "w-12 h-12"
                    )}>
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </Avatar>
                    {isCurrentUser && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Subscriber count */}
                  <div className={cn(
                    "text-center",
                    isCurrentUser ? "font-bold text-blue-600" : ""
                  )}>
                    <div className={cn(
                      "text-sm font-semibold",
                      isDarkMode ? "text-gray-200" : "text-gray-800"
                    )}>
                      {formatSubscriberCount(user.subscribers)}
                    </div>
                    <div className={cn(
                      "text-xs",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      {isCurrentUser ? "You" : user.name.split(' ')[0]}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

    
      </div>
    </div>
  );
};

import React from 'react';
import { FolderKanban, Users, Calendar, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <div
      className={cn(
        'border-r bg-gray-50 flex flex-col transition-all duration-300',
        isOpen ? 'w-64' : 'w-16'
      )}
    >
      <nav className="flex-1 px-2 py-4">
        <div className="space-y-1">
          <SidebarItem icon={FolderKanban} text="Projects" isOpen={isOpen} link="/projects" />
          <SidebarItem icon={Users} text="Teams" isOpen={isOpen} link="/teams" />
          <SidebarItem icon={Calendar} text="Calendar" isOpen={isOpen} link="/calendar" />
        </div>
      </nav>
      <div className="border-t p-2">
        <SidebarItem icon={Settings} text="Settings" isOpen={isOpen} link="/settings" />
      </div>
    </div>
  );
}

interface SidebarItemProps {
  icon: React.ElementType;
  text: string;
  link: string;
  isOpen: boolean;
}

function SidebarItem({ icon: Icon, text, isOpen, link }: SidebarItemProps) {
  const navigate = useNavigate(); // Hook to navigate between routes
  const location = useLocation(); // Hook to get the current route

  const handleClick = () => {
    navigate(link); // Navigate to the specified link when clicked
  };

  // Check if the current location matches the sidebar item's link
  const isActive = location.pathname === link;

  return (
    <button
      onClick={handleClick}
      className={cn(
        'w-full flex items-center px-2 py-2 text-gray-700 rounded-md hover:bg-gray-200 group',
        isActive && 'bg-blue-50' // Active item styling
      )}
    >
      <Icon className="w-5 h-5" />
      {isOpen && <span className="ml-3">{text}</span>}
    </button>
  );
}

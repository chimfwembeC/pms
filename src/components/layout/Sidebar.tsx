import React from 'react';
import { FolderKanban, Users, Calendar, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

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
          <SidebarItem icon={FolderKanban} text="Projects" isOpen={isOpen} />
          <SidebarItem icon={Users} text="Teams" isOpen={isOpen} />
          <SidebarItem icon={Calendar} text="Calendar" isOpen={isOpen} />
        </div>
      </nav>
      <div className="border-t p-2">
        <SidebarItem icon={Settings} text="Settings" isOpen={isOpen} />
      </div>
    </div>
  );
}

interface SidebarItemProps {
  icon: React.ElementType;
  text: string;
  isOpen: boolean;
}

function SidebarItem({ icon: Icon, text, isOpen }: SidebarItemProps) {
  return (
    <button className="w-full flex items-center px-2 py-2 text-gray-700 rounded-md hover:bg-gray-200 group">
      <Icon className="w-5 h-5" />
      {isOpen && <span className="ml-3">{text}</span>}
    </button>
  );
}
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Home, Server, Settings, Shield, Bot, Award, Code, Smile, MessageSquarePlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebar = () => {
  const { serverId } = useParams();

  const navLinks = [
    { to: '/dashboard/servers', icon: Server, label: 'My Servers' },
    { to: `/dashboard/servers/${serverId}`, icon: Home, label: 'Dashboard', requiresServer: true },
    { to: `/dashboard/servers/${serverId}/leaderboard`, icon: Award, label: 'Leaderboard', requiresServer: true },
    { to: `/dashboard/servers/${serverId}/embed-creator`, icon: MessageSquarePlus, label: 'Embed Creator', requiresServer: true },
    { to: `/dashboard/servers/${serverId}/modules`, icon: Settings, label: 'Modules', requiresServer: true },
    { to: `/dashboard/servers/${serverId}/moderation`, icon: Shield, label: 'Moderation', requiresServer: true },
    { to: `/dashboard/servers/${serverId}/commands`, icon: Code, label: 'Custom Commands', requiresServer: true },
    { to: `/dashboard/servers/${serverId}/reaction-roles`, icon: Smile, label: 'Reaction Roles', requiresServer: true },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <aside className="hidden md:flex flex-col w-64 bg-card/50 border-r border-border">
        <div className="flex items-center justify-center h-16 border-b border-border">
          <Bot className="h-8 w-8 text-primary" />
          <span className="ml-2 text-2xl font-bold text-foreground">DiscordBot</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navLinks.map((link) => {
            if (link.requiresServer && !serverId) return null;
            return (
              <Tooltip key={link.to}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={link.disabled ? '#' : link.to}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center px-4 py-3 rounded-lg transition-colors',
                        isActive
                          ? 'bg-primary/20 text-primary'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                        link.disabled ? 'opacity-50 cursor-not-allowed' : ''
                      )
                    }
                    onClick={(e) => link.disabled && e.preventDefault()}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="ml-4 font-medium">{link.label}</span>
                  </NavLink>
                </TooltipTrigger>
                {link.disabled && (
                  <TooltipContent side="right">
                    <p>Coming Soon!</p>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>
      </aside>
    </TooltipProvider>
  );
};

export default Sidebar;
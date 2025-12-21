"use client"

import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Dock, DockIcon } from "@/components/ui/dock"
import {
  Home,
  History,
  User,
  LogOut,
  Upload,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const FloatingNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is authenticated
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user")) || {};
  const userName = user.name || "User";

  // Don't show nav if user is not authenticated
  if (!token) {
    return null;
  }

  const DATA = {
    navbar: [
      { href: "/", icon: Home, label: "Home" },
      { href: "/upload", icon: Upload, label: "Upload" },
      { href: "/history", icon: History, label: "History" },
    ],
    userActions: [
      {
        href: "/profile",
        label: "Profile",
        customIcon: (
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt={userName} />
            <AvatarFallback className="text-sm">
              {userName?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        )
      },
      {
        name: "Logout",
        onClick: () => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate('/login');
        },
        icon: LogOut
      },
    ],
    actions: [
      {
        name: "Logout",
        onClick: () => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate('/login');
        },
        icon: LogOut
      },
    ],
  };

  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null; // Don't show nav on auth pages
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <TooltipProvider>
        <Dock direction="middle">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => navigate(item.href)}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  >
                    <item.icon className="size-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full" />
          {DATA.userActions.map((item) => (
            <DockIcon key={item.label || item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={item.onClick || (() => navigate(item.href))}
                    aria-label={item.label || item.name}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  >
                    {item.customIcon ? (
                      item.customIcon
                    ) : (
                      <item.icon className="size-4" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label || item.name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </TooltipProvider>
    </div>
  )
}

export default FloatingNav;
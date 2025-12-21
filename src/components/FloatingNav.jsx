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

const FloatingNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const DATA = {
    navbar: [
      { href: "/", icon: Home, label: "Home" },
      { href: "/history", icon: History, label: "History" },
      { href: "/profile", icon: User, label: "Profile" },
      { href: "/", icon: Upload, label: "Upload" },
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
          {DATA.actions.map((action) => (
            <DockIcon key={action.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={action.onClick}
                    aria-label={action.name}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  >
                    <action.icon className="size-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{action.name}</p>
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
/*Sidebar component renders a dynamic sidebar menu with navigation items. 
It handles conditional navigation based on whether a route requires a "pro" 
subscription and provides visual feedback to the user as they interact with the menu. */

"use client";

import { Home, Plus, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useProModal } from "@/app/hooks/use-pro-modal";

interface SideBarProps {
    isPro: boolean;
}

export const Sidebar = ({ isPro }: SideBarProps) => {

    const pathname = usePathname();
    const router = useRouter();
    const proModal = useProModal(); //custom hook to handle modal dialog for Pro feature

    const routes = [
        //array of route objects
        {
            icon: Home, //icon for the route
            href: '/', //url for the route
            label: "Home", //name for the route
            pro: false, //whether it requires a pro subscription
        },
        {
            icon: Plus,
            href: '/companion/new',
            label: "Create",
            pro: true,
        },
        {
            icon: Settings,
            href: '/settings',
            label: "Settings",
            pro: false,
        },
    ];

    const onNavigate = (url: string, pro: boolean) => {
        //hanlde navigation when a sidebar link is clicked. Takes a URL and PRO parameter
        if (pro && !isPro) {
            //if the link is marked is pro and the user is not a Pro user, it appears to open the Pro modal dialog
            return proModal.onOpen();
        }
        //if link is not pro or the user is a Pro user, it navigates to the specified url
        return router.push(url);
    }

    return (
        <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
            <div className="p-3 flex-1 flex justify-center">
                <div className="space-y-2">
                    {routes.map((route) => (
                        <div
                            onClick={() => onNavigate(route.href, route.pro)}
                            key={route.href}
                            className={cn(
                                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                                pathname === route.href && "bg-primary/10 text-primary",
                            )}
                        >
                            <div className="flex flex-col gap-y-2 items-center flex-1">
                                <route.icon className="h-5 w-5" />
                                {route.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
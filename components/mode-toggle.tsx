/*the ModeToggle component provides a user-friendly way to toggle between different 
themes (light, dark, and system) in a web application. It uses the "next-themes" 
package to control and manage theme changes */

"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {

    const { setTheme } = useTheme()/*uses the useTheme hook to access the setTheme 
    function which allows for changing the application's theme dynamically*/

    return (
        <DropdownMenu>
            {/*Dropdown menu */}
            <DropdownMenuTrigger asChild>
                {/*Dropdown menu displayed when clicked on */}
                <Button variant="secondary" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            {/*Content of drop down */}
            <DropdownMenuContent align="end">
                {/*Light theme */}
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                {/*Dark theme */}
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                {/*Theme as that of the system */}
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

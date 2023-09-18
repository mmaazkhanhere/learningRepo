/*ThemeProvider component serves as a wrapper around the NextThemesProvider component 
from the "next-themes" package. It takes the same props as NextThemesProvider, ensuring 
that any child components can be easily themed using the capabilities provided by "next-themes." 
This component can be used in a React application to manage and switch themes effectively. */

"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

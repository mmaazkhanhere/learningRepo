"use client"

import { Menu, Sparkles } from "lucide-react"
import Link from "next/link";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { useProModal } from "@/app/hooks/use-pro-modal";

const font = Poppins({
    weight: "600",
    subsets: ["latin"]
});

interface NavbarProps {
    isPro: boolean
} //interface for Navbar

const Navbar = ({ isPro }: NavbarProps) => {

    const proModal = useProModal(); //custom hook to handle the Pro version

    return (
        <div className="fixed w-full z-50 flex justify-between
        items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
            <div className="flex items-center">
                <MobileSidebar isPro={isPro} />
                <Link href="/">
                    <h1 className={cn(`hidden md:block text-xl md:text-3xl font-bold
                    text-primary`,
                        font.className
                    )}>
                        companion.ai
                    </h1>
                </Link>
            </div>
            <div className="flex items-center gap-x-3">
                {
                    //displayed only if the user is not a Pro user
                    !isPro && (
                        <Button
                            variant={'premium'}
                            size='sm'
                            onClick={proModal.onOpen}
                        >
                            Upgrade
                            <Sparkles className="h-4 w-4 fillw-hite text-white ml-2" />
                        </Button>
                    )
                }
                <ModeToggle /> {/*Component to toggle theme */}
                <UserButton afterSignOutUrl="/" /> {/*Component from Clerk to handle user account details */}
            </div>
        </div>
    );
}

export default Navbar;
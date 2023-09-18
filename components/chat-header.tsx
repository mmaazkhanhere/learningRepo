/*the ChatHeader component renders the header of a chat page, including companion information, 
navigation options, and actions like editing and deleting the companion.  */

"use client"

import { Button } from "@/components/ui/button";
import { Companion, Message } from "@prisma/client"
import { ChevronLeft, Edit, MessageSquare, MoreVertical, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import BotAvatar from "@/components/bot-avatar";

interface ChatHeaderProps {
    companion: Companion & { //companion is an object prop that represents a companion including message and total messages
        messages: Message[];
        _count: {
            messages: number;
        };
    };
};

export const ChatHeader = ({ companion }: ChatHeaderProps) => {

    const router = useRouter();
    const { user } = useUser();
    const { toast } = useToast();

    const onDelete = async () => {
        //function that runs when clicked on delete icon
        try {
            //sends a DELETE http request at the end point
            await axios.delete(`/api/companion/${companion.id}`);
            toast({
                description: 'Success'
            });
            router.refresh();
            router.push("/");
        } catch (error) {
            //toast runs when error
            toast({
                description: "Something went wrong",
                variant: "destructive"
            })
        }
    }

    return (
        <div className="flex w-full justify-between items-center border-b
        border-primary/10 pb-4">
            <div
                onClick={() => router.back()}
                className="flex gap-x-2 items-center"
            >
                <Button size="icon" variant="ghost">
                    <ChevronLeft className="h-8 w-8" />
                </Button>
                <BotAvatar src={companion.src} />
                <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold">
                            {companion.name}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            {companion._count.messages}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Created by {companion.userName}
                    </p>
                </div>
            </div>
            {
                user?.id === companion.userId && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon">
                                <MoreVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/companion/${companion.id}`)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={onDelete}>
                                <Trash className="w-4 h-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        </div>
    )
}
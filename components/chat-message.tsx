/*The ChatMessage component is used to display individual chat messages with various features, 
including copying text to the clipboard, loading indicators, avatars, and conditional rendering 
based on the message role. */

"use client"

import React from 'react'
import { useToast } from './ui/use-toast';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { BeatLoader } from "react-spinners"

import BotAvatar from './bot-avatar';
import UserAvatar from './user-avatar';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';

export interface ChatMessageProps {
    role: "system" | "user", // role of the message sender
    content?: string; //optional parameter representing content of the message
    isLoading?: boolean; //indicates whether message is in loading state
    src?: string; //optional string represent the avatar image associated with the message sender
}

const ChatMessage = ({ role, content, isLoading, src }: ChatMessageProps) => {

    const { toast } = useToast();
    const { theme } = useTheme();

    const onCopy = () => {
        //function for the copy functionality
        if (!content) {
            //if no content is there to copy, return nothing
            return;
        }
        navigator.clipboard.writeText(content);/*If content exists using the method to copy the
        content to the clipboard */
        toast({
            description: 'Message copied to clipboard',
        });
        //toast message
    }

    return (
        <div className={cn(`group flex items-start gap-x-3 py-4 w-full`,
            role === "user" && "justify-end"
        )}>
            {/*If role is user then display bot avatar */}
            {role !== "user" && src && <BotAvatar src={src} />}
            <div className='rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10'>
                {
                    //if in loading state display the beat spinner else display the content
                    isLoading ? <BeatLoader color={theme === 'light' ? 'black' : 'white'}
                        size={5}
                    />
                        : content
                }
            </div>
            {/*If role is user, use the user avatar */}
            {
                role === "user" && <UserAvatar />
            }
            {
                /*if role is user and it is not in loading state, copy functionality should 
                be available. Only bot content can be copied */
                role !== "user" && !isLoading && (
                    <Button
                        onClick={onCopy}
                        className='opacity-0 group-hover:opacity-100 transition'
                        size="icon"
                        variant="ghost"
                    >
                        <Copy className='w-4 h-4' />
                    </Button>
                )
            }
        </div>
    )
}

export default ChatMessage
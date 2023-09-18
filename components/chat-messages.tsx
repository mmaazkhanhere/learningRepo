/* the ChatMessages component is responsible for rendering a chat conversation. It 
simulates loading behavior, automatically scrolls to new messages, and uses the 
ChatMessage component to display both user-generated and system messages in the chat.*/

"use client"

import { Companion } from '@prisma/client';
import React, { ElementRef, useEffect, useRef, useState } from 'react'
import ChatMessage, { ChatMessageProps } from './chat-message';

interface ChatMessagesProps {
    messages: ChatMessageProps[];//message prop is an array of chat messages
    isLoading: boolean; //loading state
    companion: Companion; //represents the information about the chat companion
};

const ChatMessages = ({ messages = [], isLoading, companion }: ChatMessagesProps) => {

    const scrollRef = useRef<ElementRef<"div">>(null);
    /*Initalises a scrollRef using the useRef which is used to reference an empty div element
    tjhat as scroll anchor ensruing that the chat always scroll to the most recent message */

    const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false);
    /*if there are no messages, fakeLoading is true indicating that loading is in process */

    useEffect(() => {
        //useEffect used to control the loading behavior
        const timeout = setTimeout(() => {
            setFakeLoading(false);
        }, 1000); //change the loading state to fale after every 1 sec

        return () => {
            clearTimeout(timeout); /*clean up function ensures that the timeout is cleared when the 
            component unmounts */
        }
    }, []);

    useEffect(() => {
        //useEffect to scroll to the most recent chat message when new messages are added
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
        /*listens to messages.length property. When new messages are added, it scrolls to the 
        scrollRef element with smooth scrolling behavior */
    }, [messages.length]);

    return (
        <div className='flex-1 overflow-y-auto pr-4'>
            <ChatMessage
                isLoading={fakeLoading}
                src={companion.src}
                role='system'
                content={`Hello, I am ${companion.name}, ${companion.description}`}
            />
            {
                messages.map((message) => (
                    <ChatMessage
                        role={message.role}
                        key={message.role}
                        content={message.content}
                        src={message.src}
                    />
                ))
            }
            {
                //renders if isLoading is true
                isLoading && (
                    <ChatMessage
                        role='system'
                        src={companion.src}
                        isLoading
                    />
                )
            }
            <div ref={scrollRef} />
        </div>
    )
}

export default ChatMessages
"use client"
import { Companion, Message } from '@prisma/client'
import React, { FormEvent, useState } from 'react'
import { ChatHeader } from '@/components/chat-header';
import { useCompletion } from "ai/react"
import { useRouter } from 'next/navigation';
import ChatForm from '@/components/ui/chat-form';
import ChatMessages from '@/components/chat-messages';

interface ChatClientProps {
    companion: Companion & {
        messages: Message[];
        _count: {
            messages: number;
        };
    };
};

const ChatClient = ({ companion }: ChatClientProps) => {

    const router = useRouter();
    const [messages, setMessages] = useState<any[]>(companion.messages);

    const { input, isLoading, handleInputChange, handleSubmit, setInput } = useCompletion({
        api: `/api/chat/${companion.id}`,
        onFinish(prompt, completion) {
            const systemMessage = {
                role: "system",
                content: completion
            };

            setMessages((current) => [...current, systemMessage]);
            setInput("");
        }
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        const userMessage = {
            role: "user",
            content: input,
        };

        setMessages((current) => [...current, userMessage]);

        handleSubmit(e);
    }

    return (
        <div className='flex flex-col h-full p-4 space-y-2'>
            <ChatHeader companion={companion} />
            <div>
                Messages TODO
            </div>
            <ChatMessages
                companion={companion}
                isLoading={isLoading}
                messages={messages}
            />
            <ChatForm
                isLoading={isLoading}
                input={input}
                handleInputChange={handleInputChange}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default ChatClient
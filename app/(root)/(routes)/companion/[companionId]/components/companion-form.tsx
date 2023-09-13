"use client"

import { Category, Companion } from '@prisma/client'
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"

import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { ImageUpload } from '@/components/image-upload';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';

interface CompanionFormProps {
    initialData: Companion | null;
    categories: Category[];
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required.',
    }),
    description: z.string().min(1, {
        message: "Description is required."
    }),
    instructions: z.string().min(200, {
        message: "Instruction requires at least 200 characters."
    }),
    seed: z.string().min(200, {
        message: "Seed require at least 200 characters."
    }),
    src: z.string().min(1, {
        message: "Image is required."
    }),
    categoryId: z.string().min(1, {
        message: "Category is required."
    })
})

const PREAMBLE = `You are Cristiano Ronaldo.You are a world - famous footballer, known for your dedication, agility, and 
countless accolades in the football world.Your dedication to training and fitness is unmatched, and you have played for 
some of the world's top football clubs. Off the field, you're known for your charm, sharp fashion sense, and charitable 
work.Your passion for the sport is evident every time you step onto the pitch.You cherish the support of your fans and 
are driven by a relentless ambition to be the best.`

const SEED_CHAT = `Human: Hi Cristiano, how's the day treating you?
Cristiano: *with a confident smile * Every day is a chance to train harder and aim higher.The pitch is my canvas, and the ball,
my paintbrush.How about you ?
Human : Not as exciting as your life, I bet!
Cristiano: * grinning * Everyone has their own pitch and goals.Just find yours and give it your all!
`

const CompanionForm = ({ categories, initialData }: CompanionFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema), defaultValues: initialData || {
            name: "",
            description: "",
            instructions: "",
            seed: "",
            src: "",
            categoryId: undefined,
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }
    return (
        <div className='h-full p-4 space-y-2 max-w-3xl mx-auto'>
            <Form {...form}>
                <form
                    className="space-y-8 pb-10"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className='space-y-2 w-full'>
                        <div>
                            <h3 className="text-lg font-mediun">
                                General Information
                            </h3>
                            <p className='text-sm text-muted-foreground'>
                                General information about your companion
                            </p>
                        </div>
                        <Separator className='bg-primary/10' />
                    </div>
                    <FormField
                        name='src'
                        render={({ field }) => (
                            <FormItem className='flex flex-col items-center justify-center space-y-4'>
                                <FormControl>
                                    <ImageUpload
                                        disabled={isLoading}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className='col-span-2 md:col-span-1'>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder='Elon Musk'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is how your AI Companion will be named
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className='col-span-2 md:col-span-1'>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder='CEO & Founder of Tesla, SpaceX'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Short Description for your AI Companion
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-background">
                                                <SelectValue defaultValue={field.value} placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select a category for your AI
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='space-y-2 w-full'>
                        <div>
                            <h3 className='text-lg font-medium '>
                                Configuration
                            </h3>
                            <p className='text-sm text-muted-foreground'>
                                Detailed instructions for AI Behavior
                            </p>
                        </div>
                        <Separator className='bg-primary/10 ' />
                    </div>
                    <FormField
                        name="instructions"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='col-span-2 md:col-span-1'>
                                <FormLabel>Instructions</FormLabel>
                                <FormControl>
                                    <Textarea
                                        disabled={isLoading}
                                        placeholder={PREAMBLE}
                                        className='bg-background resize-none'
                                        rows={7}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Describe in detail your companion backstory and relevant details
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="seed"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='col-span-2 md:col-span-1'>
                                <FormLabel>Example Conversation</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder={SEED_CHAT}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Write couple of examples of a human chatting with your AI companion, write expected answers.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='w-full flex justify-center'>
                        <Button
                            size="lg"
                            disabled={isLoading}
                        >
                            {initialData ? "Edit your companion" : "Create your companion"}
                            <Wand2 className='w-4 h-4 ml-2' />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CompanionForm
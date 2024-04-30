/*A react component responsible for rendering a list of chapters for a course. It
efficiently manages the re-ordering of chapters, providing a user friendly
interface for managing course chapters */


/*Install pangea library for re-ordering the list of chapters functionality */

"use client"

import { Chapter } from '@prisma/client'
import React, { useEffect, useState } from 'react'

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { cn } from '@/lib/utils'
import { Grip, Pencil } from 'lucide-react'
import { Badge } from '@/components/ui/badge'


type Props = {
    items: Chapter[];
    onReorder: (updateDate: { id: string; position: number }[]) => void;/*A function
    that handles the re-ordering of chapters. It receives an array of objects
    with the updated positions of the chapters */

    onEdit: (id: string) => void;/*a function that handles editing a specific chapter.
    It receives the id of the chapter to be edited */
}

const ChapterList = ({ items, onReorder, onEdit }: Props) => {

    const [isMounted, setIsMounted] = useState(false);/*A boolean state to trach
    whether the component has mounted or not */

    const [chapters, setChapters] = useState(items);/*a state variable to store the
    chapters. */

    /*set the isMounted to true when the component is mounted (first rendered) */
    useEffect(() => {
        setIsMounted(true);
    }, [])

    /*the chapters is assigned the value item received in prop when the component
    is rendered and when the value of items changes */
    useEffect(() => {
        setChapters(items);
    }, [items])


    /*This function is invoked when a draggable item is dropped and handles
    the reordering of chapters based on the drop result */
    const onDragEnd = (result: DropResult) => {

        if (!result.destination) return;/*first checks if there is a valid destination
        for the dropped item. If not, it returns early, indicating that no further
        action is needed */

        const items = Array.from(chapters); /*Creates a copy of the chapters. This
        ensures immutability, allowing us to safely modify the array. */

        const [reorderedItem] = items.splice(result.source.index, 1);/*removes the
        dragged item from its original position in the array using splice */

        items.splice(result.destination.index, 0, reorderedItem);/*Inserts the dragged
        item into its new position in the array using splice. This action places the 
        item at the index indicated by the drop result */

        /*calculate the start and end index */
        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);


        const updatedChapters = items.slice(startIndex, endIndex + 1);

        setChapters(items);

        /*Creates an array of objects where each object represents a chapter
        and its updated position in the list */
        const bulkUpdateData = updatedChapters.map((chapter) => ({
            id: chapter.id, //id of each chapter is extracted
            position: items.findIndex((item) => item.id === chapter.id) /*position
            is determined using findIndex based on the original array of chapters */
        }));

        onReorder(bulkUpdateData); /*calls the re-order function with bulkUpdateData
        array. This function is responsible for handling the backend update of
        chapter positions */

    }

    if (!isMounted) {
        return null;
    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <Droppable
                droppableId='chapters'
            >
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {
                            chapters.map((chapter, index) => (
                                <Draggable
                                    key={chapter.id}
                                    draggableId={chapter.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            className={cn(
                                                'flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm',
                                                chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                                            )}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                        >
                                            <div
                                                className={cn(
                                                    "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                                    chapter.isPublished && "border-r-sky-200 hover:bg-sky-200"
                                                )}
                                                {...provided.dragHandleProps}
                                            >
                                                <Grip className='h-5 w-5' />
                                            </div>
                                            {chapter.title}
                                            <div
                                                className='ml-auto pr-2 flex items-center gap-x-2'
                                            >
                                                {
                                                    chapter.isFree && (
                                                        <Badge>
                                                            Free
                                                        </Badge>
                                                    )
                                                }
                                                <Badge
                                                    className={cn(`bg-slate-500`,
                                                        chapter.isPublished && "bg-sky-700"
                                                    )}
                                                >
                                                    {
                                                        chapter.isPublished ? "Published" : "Draft"
                                                    }
                                                </Badge>
                                                <Pencil
                                                    onClick={() => onEdit(chapter.id)}
                                                    className='w-4 h-4 cursor-pointer hover:opacity-75'
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default ChapterList
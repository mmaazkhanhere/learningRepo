/*This component facilitates enrolling in a course by rendering a button that
when clicked, triggers a checkout process. */

"use client"

import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/format';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

type Props = {
    courseId: string;
    price: number;
}

const CourseEnrollButton = ({ courseId, price }: Props) => {

    const [isLoading, setIsLoading] = useState(false); //loading state

    /*an async function that is called when user clicks on enroll button. It makes
    a post request to the specified api endpoint. If success response, it redirects
    the user to that url */
    const onClick = async () => {
        try {
            setIsLoading(true);

            const response = await axios.post(`/api/courses/${courseId}/checkout`);
            window.location.assign(response.data.url);

        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={onClick}
            size='sm'
            disabled={isLoading}
            className='w-full md:w-auto'
        >
            Enroll for {formatPrice(price)}
        </Button>
    )
}

export default CourseEnrollButton
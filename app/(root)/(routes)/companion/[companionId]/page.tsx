import prismadb from '@/lib/prismadb';
import React from 'react'
import CompanionForm from './components/companion-form';
import { auth, redirectToSignIn } from '@clerk/nextjs';

interface CompanionIdPageProps {
    params: {
        companionId: string
    };
};

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {

    //todo check subscription

    const { userId } = auth();

    if (!userId) {
        return redirectToSignIn();
    }

    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.companionId,
            userId
        }
    });

    const categories = await prismadb.category.findMany();

    return (
        <div>
            <CompanionForm initialData={companion} categories={categories} />
        </div>
    )
}

export default CompanionIdPage
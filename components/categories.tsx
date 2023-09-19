/*this component provides a user interface for selecting and filtering content by category. 
When a user clicks on a category button, it updates the URL with the selected category, making 
it possible to filter and display content accordingly. */

"use client"

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client"
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string"

interface CategoriesProps {
    data: Category[]; //an array of category objects
};

export const Categories = ({ data }: CategoriesProps) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId") //searches for the parameter cateogryId in the url

    const onClick = (id: string | undefined) => {
        //function defined to handle url based on category selected
        const query = { categoryId: id }; //constructs a query object containing the categoryId to be updated
        const url = qs.stringifyUrl({
            /*Uses qs to generate a new URL based on the current URL and the updated query */
            url: window.location.href,
            query,
        },
            { skipNull: true }); //ensures that null or undefined value are not included

        router.push(url); //navigate to the new url
    }

    return (
        <div className="w-full overflow-x-auto space-x-2 flex p-1">
            <button className={cn(`flex items-center tex-center text-xs md:text-sm px-2 md:px-4
            py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition`,
                !categoryId ? 'bg-primary/25' : 'bg-primary/10'
            )}
                onClick={() => onClick(undefined)}

            >
                Newest
            </button>
            {
                data.map((item) => (
                    <button className={cn(`flex items-center tex-center text-xs md:text-sm px-2 md:px-4
                        py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition`,
                        item.id === categoryId ? "bg-primary/25" : 'bg-primary/10'
                    )}
                        key={item.id}
                        onClick={() => onClick(item.id)}
                    >
                        {item.name}
                    </button>
                ))
            }
        </div>
    )
}
"use client"

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client"
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string"

interface CategoriesProps {
    data: Category[];
};

export const Categories = ({ data }: CategoriesProps) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId")

    const onClick = (id: string | undefined) => {

        const query = { categoryId: id };
        const url = qs.stringifyUrl({
            url: window.location.href,
            query,
        },
            { skipNull: true });

        router.push(url);
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
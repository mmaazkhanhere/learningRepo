import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/*Specifies variants for the badge's background, such as different colors and 
sizes. cva is a utility that is commonly used in React applications to manage
variants or variations of component styles or behaviors */
const backgroundVariants = cva(
    'rounded-full flex items-center justify-center',
    {
        variants: {
            variant: { //defines the background color for the component
                default: 'bg-sky-100', //bg color if variant is default
                success: 'bg-emerald-100', //bg color if variant is success
            },
            iconVariant: { //defines different text colors for the icon within the component
                default: 'text-sky-700', //colors for the icon if variant is default
                success: 'text-emerald-700' //colors for the icon if variant is success
            },
            size: { //defines different padding values for the component
                default: 'p-2',
                sm: 'p-1'
            }
        },
        defaultVariants: { //specifies the default value for each variant
            variant: 'default',
            size: 'default'
        }
    }
)

//specifies variants for the icon's color and size
const iconVariants = cva(
    "", //when no variant is provided, only the base class will be present
    {
        variants: {
            variant: { //handles the color of the icon for different variants
                default: 'text-sky-700',
                success: 'text-emerald-700',
            },
            size: { //handles the size of the icon
                default: 'h-8 w-8',
                sm: 'h-4 w-4',
            }
        },
        defaultVariants: { //specifies the default value for each variant
            variant: 'default',
            size: 'default'
        }
    }
);

/*Variant prop is utility that automatically infers the type of variant props
defined within the variant objected and creates a type represent the props */

type BackgroundVariantProps = VariantProps<typeof backgroundVariants>;
/*A type alias defined to represent the props associated with the background
variants of the component */


type IconVariantProps = VariantProps<typeof iconVariants>;/*represents the props
associated with icon variants of the component */



interface IconBadgeProps extends BackgroundVariantProps, IconVariantProps {
    icon: LucideIcon;
}/*interface for the component which extends the above type which includes 
an icon (Lucide icon to display), variant (background color variant), and
size (size variant) */

export const IconBadge = ({
    icon: Icon,
    variant,
    size,
}: IconBadgeProps) => {
    return (
        <div
            className={cn(backgroundVariants({ variant, size }))}
        >
            <Icon className={cn(iconVariants({ variant, size }))} />
        </div>
    )

}
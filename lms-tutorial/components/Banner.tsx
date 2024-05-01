/*A reuseable component for displaying alert message or notification with different
variants such as warning or success, enhancing visual feedback in UI components */

import { AlertTriangle, CheckCircleIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*banner variant object is created using cva which defines different styles for the
banner based on the provided variant  */
const bannerVariants = cva(
    "border text-center p-4 text-sm flex items-center w-full", {
    variants: {
        /*variant property specifies different variant of the banner with
        corresponding styles */
        variant: {
            //styles when the variant is warning
            warning: "bg-yellow-200/80 border-yellow-30 text-primary",
            //styles when the variant is success
            success: "bg-emerald-700 border-emerald-800 text-secondary",
        }
    },
    //default variant is warning
    defaultVariants: {
        variant: "warning"
    }
}
);

/*Banner props extends variant props (imported from class variance authority) and
a label string is passed which represents the text content of the banner */
interface BannerProps extends VariantProps<typeof bannerVariants> {
    label: string;
}

//Icon for the banner variants
const iconMap = {
    warning: AlertTriangle,
    success: CheckCircleIcon
}

export const Banner = ({ label, variant }: BannerProps) => {

    const Icon = iconMap[variant || "warning"] /*display the variant icon passed
    or else display the warning icon */
    return (
        <div
            className={cn(bannerVariants({ variant }))}
        >
            <Icon className="w-4 h-4 mr-2" />
            {label}
        </div>
    )
}
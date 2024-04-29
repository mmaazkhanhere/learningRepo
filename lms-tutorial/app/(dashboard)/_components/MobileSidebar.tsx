/*A react component that represents a sidebar that is displayed only in the mobile
screen. It uses the sheet component from the shadcn ui component library
and displays the sidebar */

import React from 'react'
import { Menu } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from '@/components/ui/sheet'
import Sidebar from './Sidebar'

type Props = {}

const MobileSidebar = (props: Props) => {
    return (
        <Sheet>
            {/*Icon */}
            <SheetTrigger
                className='md:hidden pr-4 hover:opacity-75 transition'
            >
                <Menu />
            </SheetTrigger>

            {/*Sidebar is displayed from the left */}
            <SheetContent side={'left'} className='p-0 bg-white'>
                <Sidebar />
            </SheetContent>
        </Sheet>

    )
}

export default MobileSidebar
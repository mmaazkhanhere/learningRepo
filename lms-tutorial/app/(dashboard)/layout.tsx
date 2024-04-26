/*The following react component defines a layout for all the routes. It creates the 
main page of the application that has a sidebar and a navigation bar */

import Navbar from "./_components/Navbar"
import Sidebar from "./_components/Sidebar"

type Props = {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
    return (
        <div className="h-full">
            {/*Navbar that consists of user avatar and teacher button */}
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                {/*The navbar will have height of 80px with left padding (to
                    come get next to the sidebar). It will have z-index of 50
                    and insert-y-0 positing at the top of the container and other
                    elements
                )  */}

                <Navbar />
            </div>

            {/*Sidebar that consists of navigable routes */}
            <div className="hidden md:flex w-56 flex-col fixed inset-y-0 z-50">
                {/*The sidebar is hidden in small screen but visible in large screen.
                It is fixed with z-index of  meaning that will be placed above
                all elements. It will have width of 224px. The content will
                be flex and the direction will be column */}

                <Sidebar />
            </div>

            {/*Content of the dashboard routes */}
            <main className="pt-[80px] md:pl-56 h-full">
                {/*The children will have a padding of 80px (to get below the navbar)
                and left padding (to get next to the sidebar) */}
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout
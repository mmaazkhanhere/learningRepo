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
                <Navbar />
            </div>

            {/*Sidebar that consists of navigable routes */}
            <div className="hidden md:flex w-56 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>

            {/*Content of the dashboard routes */}
            <main className="pt-[80px] md:pl-56 h-full">
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout
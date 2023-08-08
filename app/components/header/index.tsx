import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";

export async function Header() {
    const auth = await useAuth.fromServer();

    return (
        <header>
            <div className="text-3xl font-bold text-center">
                <Link href="/">Logo</Link>
            </div>
            <nav className="flex items-center justify-center flex-col">
                {auth ? (
                    <Link href="/panel" className="text-2xl underline decoration-sky-500 text-center mt-10">
                        Panel (Protected Route)
                    </Link>
                ) : (
                    <Link href="/login" className="text-2xl underline decoration-sky-500 text-center mt-10">
                        Login
                    </Link>
                )}
            </nav>
        </header>
    );
}

export default Header;
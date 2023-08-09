import Link from "next/link";
import { useAuth } from "./hook/useAuth";

export async function Header() {
  const auth = await useAuth.fromServer();

  return (
    <section>
      <nav className="flex items-center justify-center gap-10">
        <div className="text-2xl font-bold">
          <Link href="/">Logo</Link>
        </div>
        <div className="text-2xl">
          {auth ? (
            <Link href="/panel">Panel (Protected Route)</Link>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </nav>

    </section>
  );
}

export default Header;
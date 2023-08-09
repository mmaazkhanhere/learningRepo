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
            <Link href="/wallet">Create Wallet</Link>
          ) : (
            <div className="flex items-center justify-center gap-10">
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </div>
          )}
        </div>
      </nav>

    </section>
  );

}

export default Header;
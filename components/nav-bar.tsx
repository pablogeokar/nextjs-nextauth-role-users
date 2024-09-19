import { ShieldCheck, LogOut, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";

const linkItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Auth (Client)",
    path: "/auth-client",
  },
  {
    label: "Auth (Server)",
    path: "/auth-server",
  },
  {
    label: "Admin Only",
    path: "/admin-only",
  },
] as const;

type LinkType = (typeof linkItems)[number];

const NavBar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header>
      <nav className="container my-2 py-2 flex items-center justify-around border-b-[0.5px]  shadow-b--md shadow-green-100/20">
        <Button variant={"ghost"} size={"icon"}>
          <ShieldCheck
            color={session ? "green" : "red"}
            className="w-24 h-24"
          />
        </Button>
        <div className="flex space-x-2">
          {linkItems.map(({ label, path }: LinkType) => (
            <Link
              className="bg-green-800/40  p-2 rounded-sm"
              key={label}
              href={path}
            >
              {label}
            </Link>
          ))}
        </div>
        <Button variant="ghost" size="icon">
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">
              <LogOut color="red" className="w-10 h-10" /> Sair
            </Link>
          ) : (
            <Link href="/api/auth/signin?callbackUrl=/">
              <LogIn color="green" className="w-10 h-10" /> Entrar
            </Link>
          )}
        </Button>
      </nav>
    </header>
  );
};

export default NavBar;

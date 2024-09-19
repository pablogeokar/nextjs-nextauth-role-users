import NavBar from "@/components/nav-bar";
import "./globals.css";
import AuthProvider from "@/components/providers/auth-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark">
        <NavBar />
        <AuthProvider>
          <main className="grid h-screen w-screen place-content-center">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

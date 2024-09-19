import { auth as authOptions } from "@/lib/auth-config";
import { getServerSession } from "next-auth";

export default async function AuthServerPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="text-center text-6xl text-green-700">
      <span>Server Authentication</span>
      {session && (
        <div className="text-sm">{JSON.stringify(session, null, 2)}</div>
      )}
    </div>
  );
}

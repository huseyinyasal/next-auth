
import UseCard from "./components/UseCard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options"; 

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? (
        <UseCard user={session.user} pagetype="Anasayfa" />
      ) : (
        <div>giriş yapılmadı</div>
      )}
    </main>
  );
}

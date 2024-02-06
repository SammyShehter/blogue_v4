import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello!</h1>
      <a href="/login">Login</a>
      <a href="/login">Tags</a>
      <a href="/logout">Logout</a>
    </main>
  );
}

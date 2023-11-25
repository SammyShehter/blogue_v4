export default function LoginLayout({ children }: {children: any}) {
    return (
      <main className="w-full flex flex-col items-center justify-between">
        {children}
      </main>
    );
  }
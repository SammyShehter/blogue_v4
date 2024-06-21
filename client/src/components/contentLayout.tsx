export default function ContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <div className="p-4 flex-1 ml-16 mt-12">
        {children}
    </div>
}

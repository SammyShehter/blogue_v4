import NavBar from "../components/navbar";

export default function Template({children}: {children: React.ReactNode}) {
    return (
        <div className="container mx-auto px-4">
            <NavBar />
            {children}
        </div>
    )
}

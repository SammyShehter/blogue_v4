export default function NavBar () {
  return (
    <nav className="container mx-auto px-4 py-3 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">Sammy Shehter Blogue</a>
        <div className="flex space-x-4 items-center">
          <a href="/posts" className="hover:text-gray-700">Posts</a>
          <a href="/tags" className="hover:text-gray-700">Tags</a>
          <form>
            <input type="search" placeholder="Search" className="px-2 py-1 border rounded"/>
          </form>
        </div>
      </div>
    </nav>
  )
}

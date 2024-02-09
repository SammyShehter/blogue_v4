export default function Footer () {
    return (
      <nav className="mx-auto mb-5 py-3 border-t">
        <div className="mx-auto flex justify-between items-center">
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
  
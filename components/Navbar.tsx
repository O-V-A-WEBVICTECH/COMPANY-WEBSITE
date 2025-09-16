function Navbar() {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">
              O.V.A WebvicTech QWEN3
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {["Home", "About Us", "Our Team", "Blog", "Careers", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

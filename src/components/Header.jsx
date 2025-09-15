import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          O.V.A.WebvicTech
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link
                to="/solutions"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Solutions
              </Link>
            </li>
            <li>
              <Link
                to="/process"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Process
              </Link>
            </li>
            <li>
              <Link
                to="/work"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-700 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

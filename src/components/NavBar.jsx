// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// const NavBar = () => {
//   const { isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };
//   return (
//     <div className="flex justify-around items-center p-4 bg-[#0c0a09] text-white outline outline-1 outline-white sticky top-0 z-50 mx-auto">
//       <h2>Vish Path</h2>
//       <div className="flex items-center p-2 gap-10 rounded">
//         <Link to="/dashboard">
//           <h2 className="hover:outline hover:outline-2">Home</h2>
//         </Link>
//         <Link to="/chatbot">
//           <h2>AI Advisor</h2>
//         </Link>
//       </div>
//       <div className="flex gap-5 mr-10">
//         {isAuthenticated ? (
//           <>
//             <Link
//               to="/profile"
//               className="ring-2 ring-green-500 hover:bg-green-700 rounded-full px-4 py-2"
//             >
//               <h2>Profile</h2>
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="bg-green-500/75 hover:bg-green-700 rounded-full px-4 py-2"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className={s["navbar-item"]}>
//               Login
//             </Link>
//             <Link to="/signup" className={s["navbar-item"]}>
//               Sign Up
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };
// export default NavBar;
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Github } from "lucide-react";

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-black border-b border-gray-800 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <span className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent">
                Vish Path
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/dashboard" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/chatbot" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              AI Advisor
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="px-4 py-2 rounded-full border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-emerald-500 text-black hover:bg-emerald-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-full bg-emerald-500 text-black hover:bg-emerald-600 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
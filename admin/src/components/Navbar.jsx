import logo from "../assets/logo.png";

const Navbar = () => (
  <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-32" />
        <span className="hidden sm:block text-xs font-semibold text-white bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] px-2.5 py-1 rounded-full">
          Admin
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Live
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] flex items-center justify-center text-white font-bold text-sm shadow-lg">
          A
        </div>
      </div>
    </div>
  </header>
);

export default Navbar;

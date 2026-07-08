"use client";

export default function NavBar() {
  const links = [
    { label: "ABOUT", href: "#about" },
    { label: "WORK", href: "#work" },
    { label: "RESUME", href: "#resume" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-gray-300 border-b-4 border-black shadow-md">
      <div className="flex items-center justify-between px-3 py-1.5">
        {/* System branding — plain, no nested border box */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-700 border border-black" />
          <span className="font-bold text-m tracking-wide">ZOHA_OS</span>
        </div>

        {/* Nav — styled like menu bar items */}
        <nav className="hidden md:flex gap-1 font-bold text-m">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-colors duration-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Hire-me, styled like a raised button */}
        <a
          href="#contact"
          className="px-3 py-1 bg-gray-300 border-2 border-gray-500 border-t-white border-l-white text-m font-bold hover:bg-gray-200 transition-colors duration-100 active:border-t-gray-500 active:border-l-gray-500 active:border-b-white active:border-r-white"
        >
          HIRE ME
        </a>
      </div>
    </header>
  );
}
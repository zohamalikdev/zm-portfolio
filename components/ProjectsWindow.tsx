"use client";

import RetroWindow from "@/components/RetroWindow";

const projects = [
  {
    icon: "🌐",
    name: "Bazzar-Shop.exe",
    type: "Website",
    stack: "Node/PG",
    href: "https://zohamalikdev.github.io/Bazzar-Shop/index.html",
  },
  {
    icon: "🌐",
    name: "ArtWala.exe",
    type: "Website",
    stack: "PHP/MySQL",
    href: "https://artwala.page.gd",
  },
  {
    icon: "🌐",
    name: "DrinkCo.exe",
    type: "Website",
    stack: "HTML/CSS/JS",
    href: "https://zohamalikdev.github.io/DrinkCo/index.html",
  },
  {
    icon: "📁",
    name: "Todo-List",
    type: "App",
    stack: "JS",
    href: "#",
  },
];

export default function WorkSection() {
  return (
    <section id="work" className="relative bg-transparent bg-center px-4 md:px-12 py-16 cursor-none">
      {/* Offset right + down instead of dead-center — reads as a window
          placed on the desktop rather than a boxed page section */}
      <div className="md:ml-auto md:mr-16 max-w-2xl">
        <RetroWindow
          title="PROJECTS.ASI"
          menuItems={["File", "Edit", "View", "Sort"]}
          statusText="Loading projects..."
        >
          <div className="font-mono text-sm">
            <div className="grid grid-cols-[1fr_100px_100px] gap-4 border-b-2 border-black pb-2 mb-2 font-bold text-xs text-gray-600">
              <span>NAME</span>
              <span>TYPE</span>
              <span>STACK</span>
            </div>

            {projects.map((project) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[1fr_100px_100px] gap-4 items-center py-2 px-1 hover:bg-blue-600 hover:text-white transition-colors duration-100 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>{project.icon}</span>
                  {project.name}
                </span>
                <span className="text-xs opacity-70">{project.type}</span>
                <span className="text-xs opacity-70">{project.stack}</span>
              </a>
            ))}

            <p className="text-xs text-gray-500 mt-4">
              4 item(s) — click a project to open it
            </p>
          </div>
        </RetroWindow>
      </div>
    </section>
  );
}
import { useEffect, useState } from "react";
import { PaletteIcon } from "lucide-react";
//const should be all upper case
const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

function ThemeSelector() {
  const [theme, setTheme] = useState(() => {
    //if the window is defined show the theme from the local storgae else show default forest theme 
    //this is the diffrent use of use state
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "forest";
    }
    return "forest";
  });
//before we did it in the index.html file but now we are doing it here so that we can change the theme dynamically
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    //update local storgae when you select the theme
    localStorage.setItem("theme", theme);
  }, [theme]);
//properties of dropdown come from daisy ui 
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1">
        <PaletteIcon className="size-4" />
        <span className="hidden sm:inline">Theme</span>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-50 w-56 p-2 shadow-xl max-h-96 overflow-y-auto flex-nowrap"
      >
        {/* this is destrcutruing the theme values we have above  */}
        {THEMES.map((t) => (
          <li key={t}>
            <button
              onClick={() => setTheme(t)}
              className={`flex justify-between ${
                theme === t ? "bg-primary text-primary-content" : ""
              }`}
            >
              <span className="capitalize">{t}</span>
              <div className="flex gap-0.5" data-theme={t}>
                <span className="w-2 h-4 rounded-sm bg-primary" />
                <span className="w-2 h-4 rounded-sm bg-secondary" />
                <span className="w-2 h-4 rounded-sm bg-accent" />
                <span className="w-2 h-4 rounded-sm bg-neutral" />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ThemeSelector;
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

function ThemeSwitch() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  const [enabled, setEnabled] = useState(theme == "light");

  const handleThemeChange = (enabled: boolean) => {
    setTheme(enabled ? "light" : "dark");
    setEnabled(enabled);
  };

  return (
    <div className="flex items-center bg-secondary_dark p-2.5 rounded-md">
      {theme === "dark" ? (
        <button onClick={() => handleThemeChange(true)}>
          <Moon size={"16"} />
        </button>
      ) : (
        <button onClick={() => handleThemeChange(false)}>
          <Sun size={"16"} />
        </button>
      )}
    </div>
  );
}

export default ThemeSwitch;

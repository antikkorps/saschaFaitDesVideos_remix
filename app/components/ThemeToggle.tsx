import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "~/contexts/ThemeContext"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      onClick={toggleTheme}
      className="relative rounded-full p-2 transition-colors duration-500 hover:bg-gray-200 dark:hover:bg-gray-700 overflow-hidden"
      aria-label="Toggle dark mode"
    >
      <div
        className={`transform transition-all duration-500 ${
          isDark ? "rotate-[360deg] scale-100" : "rotate-0 scale-100"
        }`}
      >
        {isDark ? (
          <SunIcon className="h-8 w-8 text-yellow-500 animate-[wiggle_1s_ease-in-out]" />
        ) : (
          <MoonIcon className="h-8 w-8 text-gray-600 animate-[wiggle_1s_ease-in-out]" />
        )}
      </div>
    </button>
  )
}

export default ThemeToggle

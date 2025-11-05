function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;
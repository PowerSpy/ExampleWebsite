import { useState, useEffect } from 'react'
import './App.css'
import Banner from './components/Banner'
import TodoList from './components/TodoList'
import ThemeToggle from './components/ThemeToggle'
import InteractiveForm from './components/InteractiveForm'
import ImageGallery from './components/ImageGallery'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light'
  }, [darkMode])

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <Banner />
      <main className="container">
        <section className="section">
          <TodoList />
        </section>
        <section className="section">
          <InteractiveForm />
        </section>
        <section className="section">
          <ImageGallery />
        </section>
      </main>
    </div>
  )
}

export default App

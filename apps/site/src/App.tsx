import { Link, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { HomePage } from './pages/Home'
import { AboutPage } from './pages/About'
import { ProjectsPage } from './pages/Projects'
import { siteContent } from './siteContent'

function Nav() {
  const [open, setOpen] = useState(false)

  function NavLinks({ onClick }: { onClick?: () => void }) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 text-sm text-base-content/70">
        <Link to="/" onClick={onClick} className="py-1 sm:py-0">Home</Link>
        <Link to="/about" onClick={onClick} className="py-1 sm:py-0">About</Link>
        <Link to="https://blog.viswamedha.com" target="_blank" rel="noreferrer" className="py-1 sm:py-0">Blog</Link>
        <Link to="/projects" onClick={onClick} className="py-1 sm:py-0">Projects</Link>
        <Link to="https://photos.viswamedha.com" target="_blank" rel="noreferrer" className="py-1 sm:py-0">Photos</Link>
      </div>
    )
  }

  return (
    <nav className="border-b border-white/10 bg-[#0c1015]/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-2 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm font-medium uppercase tracking-[0.22em] text-base-content">
            {siteContent.title}
          </Link>
        </div>

        <div className="sm:hidden">
          <button aria-label="Toggle menu" className="p-2" onClick={() => setOpen((v) => !v)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={open ? 'M6 18L18 6M6 6l12 12' : 'M3 12h18M3 6h18M3 18h18'} /></svg>
          </button>
        </div>

        <div className={`hidden sm:flex items-center`}> 
          <NavLinks />
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="sm:hidden bg-[#0c1015]/95 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <NavLinks onClick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </nav>
  )
}

export function App() {
  return (
    <div className="min-h-screen bg-[#090c10] text-base-content">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </div>
  )
}

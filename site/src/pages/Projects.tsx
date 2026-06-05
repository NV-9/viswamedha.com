import { useEffect, useState } from 'react'
import { siteContent } from '../siteContent'

type Repo = {
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  updated_at: string
}

export function ProjectsPage() {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const c = new AbortController()
    fetch(`https://api.github.com/users/${siteContent.github.username}/repos?per_page=100&type=owner&sort=updated`, { signal: c.signal })
      .then((r) => {
        if (!r.ok) throw new Error('failed')
        return r.json()
      })
      .then((data) => setRepos(data))
      .catch(() => setRepos(null))
      .finally(() => setLoading(false))
    return () => c.abort()
  }, [])

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">Loading...</div>
  if (!repos) return <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">No repositories found or GitHub username not configured.</div>

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="border-t border-white/10 pt-8">
        <h1 className="text-2xl font-semibold sm:text-3xl">Projects</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-base-content/75 sm:text-base">
          Public repositories from my GitHub account
        </p>
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {repos.map((r) => (
          <div key={r.name} className="space-y-3 border-t border-white/10 pt-4">
            <a href={r.html_url} target="_blank" rel="noreferrer" className="text-lg font-semibold text-base-content underline decoration-white/20 underline-offset-4 hover:text-base-content/80">{r.name}</a>
            {r.description && <p className="text-sm text-base-content/70">{r.description}</p>}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-[0.18em] text-base-content/45">
              {r.language && <span>{r.language}</span>}
              <span>★ {r.stargazers_count}</span>
              <span>{new Date(r.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

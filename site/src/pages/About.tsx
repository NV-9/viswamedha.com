import { siteContent } from '../siteContent'

export function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="border-t border-white/10 pt-8">
        <h1 className="text-2xl font-semibold sm:text-3xl">About</h1>
        <div className="mt-4 max-w-3xl space-y-4 text-sm leading-7 text-base-content/75 sm:text-base">
          {siteContent.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

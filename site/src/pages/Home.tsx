import { siteContent } from '../siteContent'

function ProfileLink({ href, label }: { href: string; label: string }) {
  return (
    <a className="inline-flex items-center gap-2 text-sm text-base-content/80 underline decoration-white/20 underline-offset-4 hover:text-base-content" href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  )
}

export function HomePage() {
  const { profile, skills, experience, certifications, education } = siteContent

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-6">
          <div className="inline-flex max-w-full flex-wrap items-center gap-2 text-xs uppercase tracking-[0.28em] text-base-content/45">
            <span className="whitespace-nowrap">{siteContent.headline}</span>
          </div>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
            {profile.summary.map((line) => (
              <p key={line} className="max-w-3xl text-sm leading-7 text-base-content/70 sm:text-base lg:text-lg">
                {line}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
            {profile.links.map((link) => (
              <ProfileLink key={`${link.name}-${link.url}`} href={link.url} label={link.name} />
            ))}
            
          </div>
        </div>

        <div className="justify-self-start lg:justify-self-end">
          <img
            src="/profile.png"
            alt={profile.name}
            className="aspect-[4/5] w-full max-w-[360px] object-cover object-top rounded-xl mx-auto lg:mx-0"
          />
        </div>
      </section>

      <main className="mt-10 space-y-10">

        <section className="border-t border-white/10 pt-8">
          <h2 className="text-lg font-semibold sm:text-xl">Skills</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {skills.map((group) => (
              <div key={group.title} className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-base-content/45">{group.title}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="text-sm text-base-content/75">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {experience.length > 0 && (
          <section className="border-t border-white/10 pt-8">
            <h2 className="text-lg font-semibold sm:text-xl">Employment History</h2>
            <div className="mt-4 grid gap-6">
              {experience.map((item) => (
                <div key={`${item.role}-${item.organization}`} className="space-y-2">
                  <p className="font-semibold text-base-content">{item.role}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-base-content/45">{item.organization} · {item.dates}</p>
                  <ul className="space-y-2 text-sm leading-7 text-base-content/75">
                    {item.bullets.map((line) => (
                      <li key={line}>- {line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}


        {certifications.length > 0 && (
          <section className="border-t border-white/10 pt-8">
            <h2 className="text-lg font-semibold sm:text-xl">Certifications</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {certifications.map((cert) => (
                <div key={cert.title} className="space-y-2">
                  <p className="font-semibold text-base-content">{cert.title}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-base-content/45">{cert.issuer}</p>
                  {cert.url ? (
                    <a className="text-sm text-base-content/70 underline decoration-white/20 underline-offset-4 hover:text-base-content" href={cert.url} target="_blank" rel="noreferrer">
                      View credential
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="border-t border-white/10 pt-8">
            <h2 className="text-lg font-semibold sm:text-xl">Education</h2>
            <div className="mt-4 grid gap-6">
              {education.map((item) => (
                <div key={`${item.institution}-${item.dates}`} className="space-y-2">
                  <p className="font-semibold text-base-content">{item.institution}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-base-content/45">{item.dates}</p>
                  <p className="text-sm text-base-content/75">{item.degree}</p>
                  <p className="text-sm leading-7 text-base-content/70">{item.note}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

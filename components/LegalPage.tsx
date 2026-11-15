import { Link } from "@/i18n/navigation";
import { getLegalCopy, type LegalBlock, type LegalDocKey } from "@/lib/legal";

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/^\d+\.\s*/, "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Turns [text](href) into links; internal hrefs get the visitor's locale.
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!m) return part;
        const [, label, href] = m;
        return href.startsWith("/") ? (
          <Link key={i} href={href}>{label}</Link>
        ) : (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
        );
      })}
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    return <p><RichText text={block} /></p>;
  }
  if (Array.isArray(block)) {
    return (
      <ul>
        {block.map((item) => (
          <li key={item}><RichText text={item} /></li>
        ))}
      </ul>
    );
  }
  return (
    <div className="legal-form">
      {block.form.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}

export default function LegalPage({ locale, doc: key }: { locale: string; doc: LegalDocKey }) {
  const copy = getLegalCopy(locale);
  const doc = copy.docs[key];
  const sections = doc.sections.map((s) => ({ ...s, id: s.id ?? slug(s.heading) }));

  return (
    <article className="legal">
      <header className="legal-head">
        <nav className="legal-crumbs" aria-label="Breadcrumb">
          <Link href="/">{copy.home}</Link> / {doc.title}
        </nav>
        <h1>{doc.title}</h1>
        <p className="legal-intro">{doc.intro}</p>
      </header>

      <div className="legal-body">
        <div className="legal-text">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="legal-section">
              <h2>{s.heading}</h2>
              {s.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </section>
          ))}
          <p className="legal-updated">
            {copy.updatedLabel}: {copy.updated}
          </p>
        </div>

        <nav className="legal-toc" aria-label={doc.title}>
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.heading}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  );
}

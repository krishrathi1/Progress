/**
 * Notes are stored as static markdown files in `public/notes/<subjectId>/<slug>.md`
 * and fetched on demand, so 1000+ notes never bloat the app bundle.
 * `public/notes/manifest.json` lists every available `subjectId:slug` key.
 */

export function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type TopicLike = { subjectId: string; name: string };

export function noteKey(topic: TopicLike): string {
  return `${topic.subjectId}:${slug(topic.name)}`;
}

export function noteUrl(topic: TopicLike): string {
  return `/notes/${topic.subjectId}/${slug(topic.name)}.md`;
}

// Manifest is fetched once and cached for the session.
let manifestPromise: Promise<Set<string>> | null = null;
export function loadManifest(): Promise<Set<string>> {
  if (!manifestPromise) {
    manifestPromise = fetch("/notes/manifest.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((arr: string[]) => new Set(arr))
      .catch(() => new Set<string>());
  }
  return manifestPromise;
}

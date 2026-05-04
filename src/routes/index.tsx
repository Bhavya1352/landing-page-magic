import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amara Signature Living — Premium 2 & 3 BHK in Keshavnagar, Pune" },
      {
        name: "description",
        content:
          "Amara Signature Living — premium 2 & 3 BHK residences in Keshavnagar, Pune. Crafted interiors, signature amenities, and timeless architecture.",
      },
      { property: "og:title", content: "Amara Signature Living" },
      {
        property: "og:description",
        content: "Premium 2 & 3 BHK residences in Keshavnagar, Pune.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Raleway:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch the static HTML and inject body + scripts so all interactivity works.
    let cancelled = false;
    (async () => {
      const res = await fetch("/amara.html");
      const html = await res.text();
      if (cancelled || !ref.current) return;

      const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
      const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
      const scriptMatches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];

      // Inject styles
      if (styleMatch) {
        const style = document.createElement("style");
        style.setAttribute("data-amara", "true");
        style.textContent = styleMatch[1];
        document.head.appendChild(style);
      }

      // Inject body content
      if (bodyMatch) {
        ref.current.innerHTML = bodyMatch[1];
      }

      // Run scripts
      scriptMatches.forEach((m) => {
        const s = document.createElement("script");
        s.textContent = m[1];
        document.body.appendChild(s);
      });
    })();

    return () => {
      cancelled = true;
      document.querySelectorAll('style[data-amara="true"]').forEach((n) => n.remove());
    };
  }, []);

  return <div ref={ref} />;
}

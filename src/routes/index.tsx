import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { AMARA_STYLE, AMARA_BODY, AMARA_SCRIPT } from "@/amara-content";

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
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Raleway:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,500&display=block",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject the page-specific stylesheet once.
    const style = document.createElement("style");
    style.setAttribute("data-amara", "true");
    style.textContent = AMARA_STYLE;
    document.head.appendChild(style);

    // Run the page's inline scripts (nav scrolling, intersection animations, etc.)
    const script = document.createElement("script");
    script.setAttribute("data-amara", "true");
    script.textContent = AMARA_SCRIPT;
    document.body.appendChild(script);

    return () => {
      document
        .querySelectorAll('style[data-amara="true"], script[data-amara="true"]')
        .forEach((n) => n.remove());
    };
  }, []);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: AMARA_BODY }} />;
}

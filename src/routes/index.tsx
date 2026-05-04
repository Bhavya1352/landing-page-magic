import { createFileRoute } from "@tanstack/react-router";

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
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/amara.html"
      title="Amara Signature Living"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
        margin: 0,
        padding: 0,
      }}
    />
  );
}

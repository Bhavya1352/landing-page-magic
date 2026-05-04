import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Amara Signature Living — Premium 2 & 3 BHK in Keshavnagar, Pune" },
      { name: "description", content: "Luxury residences in the heart of Keshavnagar, Pune. Premium 2 & 3 BHK homes with world-class amenities." },
      { name: "author", content: "Amara Signature Living" },
      { property: "og:title", content: "Amara Signature Living" },
      { property: "og:description", content: "Luxury residences in the heart of Keshavnagar, Pune." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@AmaraLiving" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style id="fouc-fix">{`html { opacity: 0 !important; transition: opacity 0.25s ease-in; }`}</style>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var reveal = function() {
                  document.documentElement.style.setProperty('opacity', '1', 'important');
                  var style = document.getElementById('fouc-fix');
                  if (style) {
                    // Disable the stylesheet instead of removing the node to prevent React crash
                    style.disabled = true;
                  }
                };

                var check = function() {
                  if (document.querySelector('style[data-amara="true"]')) {
                    reveal();
                  } else {
                    requestAnimationFrame(check);
                  }
                };
                
                check();
                setTimeout(reveal, 2000);
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}

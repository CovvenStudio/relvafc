import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="text-display text-gold text-7xl">404</div>
        <h2 className="mt-2 text-xl">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">Esta página saiu de campo. Volta ao centro.</p>
        <Link to="/" className="mt-6 inline-flex items-center rounded-md bg-gold-gradient text-background px-4 py-2 text-sm font-bold">Voltar à relva</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div>
        <h1 className="text-xl">Algo correu mal</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-4 rounded-md bg-gold-gradient text-background px-4 py-2 text-sm font-bold">Tentar de novo</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ProFootPlay — Uma relva. Milhares de histórias." },
      { name: "description", content: "Plataforma portuguesa de descoberta de talento futebolístico. Liga jogadores, clubes, scouts e agentes em todas as divisões." },
      { property: "og:title", content: "ProFootPlay — Uma relva. Milhares de histórias." },
      { property: "og:description", content: "Plataforma portuguesa de descoberta de talento futebolístico. Liga jogadores, clubes, scouts e agentes em todas as divisões." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ProFootPlay — Uma relva. Milhares de histórias." },
      { name: "twitter:description", content: "Plataforma portuguesa de descoberta de talento futebolístico. Liga jogadores, clubes, scouts e agentes em todas as divisões." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3f2f4761-2062-491a-a0e7-24d5a3642b43/id-preview-a32fe00d--fb3693b3-fbdc-4a43-81c9-94ea6a1d1bcf.lovable.app-1778362044851.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3f2f4761-2062-491a-a0e7-24d5a3642b43/id-preview-a32fe00d--fb3693b3-fbdc-4a43-81c9-94ea6a1d1bcf.lovable.app-1778362044851.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1"><Outlet /></main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}

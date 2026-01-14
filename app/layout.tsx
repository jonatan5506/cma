import type { Metadata } from 'next';
import './globals.css';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Centro Médico Avançado',
  description: 'Centro Médico Avançado - Portal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          /* Prevenir FOUC ocultando o corpo até o Tailwind ser carregado */
          html:not(.tw-ready) body { opacity: 0; }
          body { font-family: 'Inter', sans-serif; transition: opacity 0.2s ease-in; }
        `}</style>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          // Detecção imediata de tema para evitar Flash do modo claro
          (function() {
            try {
              const saved = localStorage.getItem('cma_theme');
              if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            } catch (e) {}
          })();

          // Adicionar classe quando o Tailwind estiver pronto (v3 CDN hooks)
          window.addEventListener('load', () => document.documentElement.classList.add('tw-ready'));
          // Fallback caso o evento load demore muito
          setTimeout(() => document.documentElement.classList.add('tw-ready'), 1000);
        `,
          }}
        />
      </head>
      <body className="bg-gray-50">
        <div id="root">{children}</div>
        <WhatsAppButton />
      </body>
    </html>
  );
}

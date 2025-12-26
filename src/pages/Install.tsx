import { useState, useEffect } from 'react';
import { Download, Smartphone, Share, Check, Apple, Chrome } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
  };

  const features = [
    { icon: Smartphone, text: 'Acesso rápido pela tela inicial' },
    { icon: Download, text: 'Funciona offline com dados em cache' },
    { icon: Check, text: 'Experiência de app nativo' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          {/* App Icon */}
          <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent shadow-lg">
            <img 
              src="/pwa-192x192.png" 
              alt="PokéGuide" 
              className="h-24 w-24 rounded-2xl"
            />
          </div>

          <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Instalar PokéGuide
          </h1>
          
          <p className="mb-8 text-lg text-muted-foreground">
            Adicione o PokéGuide à sua tela inicial para uma experiência completa de app nativo!
          </p>

          {/* Features */}
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.text}
                className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Install Section */}
          {isInstalled ? (
            <div className="rounded-2xl border border-border bg-muted/50 p-8">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-pokemon-grass text-primary-foreground">
                <Check className="h-8 w-8" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-foreground">
                App Instalado!
              </h2>
              <p className="text-muted-foreground">
                O PokéGuide já está instalado no seu dispositivo.
              </p>
            </div>
          ) : isIOS ? (
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted text-foreground">
                <Apple className="h-8 w-8" />
              </div>
              <h2 className="mb-4 text-xl font-bold text-foreground">
                Instalar no iPhone/iPad
              </h2>
              <ol className="mb-6 space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    1
                  </span>
                  <span className="text-muted-foreground">
                    Toque no botão <Share className="inline h-4 w-4" /> <strong>Compartilhar</strong> na barra do Safari
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    2
                  </span>
                  <span className="text-muted-foreground">
                    Role para baixo e toque em <strong>"Adicionar à Tela de Início"</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    3
                  </span>
                  <span className="text-muted-foreground">
                    Toque em <strong>"Adicionar"</strong> para confirmar
                  </span>
                </li>
              </ol>
            </div>
          ) : deferredPrompt ? (
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted text-foreground">
                <Chrome className="h-8 w-8" />
              </div>
              <h2 className="mb-4 text-xl font-bold text-foreground">
                Pronto para instalar!
              </h2>
              <p className="mb-6 text-muted-foreground">
                Clique no botão abaixo para adicionar o PokéGuide à sua tela inicial.
              </p>
              <Button size="lg" onClick={handleInstall} className="gap-2">
                <Download className="h-5 w-5" />
                Instalar Agora
              </Button>
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted text-foreground">
                <Chrome className="h-8 w-8" />
              </div>
              <h2 className="mb-4 text-xl font-bold text-foreground">
                Instalar no Android/Desktop
              </h2>
              <ol className="mb-6 space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    1
                  </span>
                  <span className="text-muted-foreground">
                    Abra o menu do navegador (três pontos no canto superior)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    2
                  </span>
                  <span className="text-muted-foreground">
                    Toque em <strong>"Instalar app"</strong> ou <strong>"Adicionar à tela inicial"</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    3
                  </span>
                  <span className="text-muted-foreground">
                    Confirme a instalação
                  </span>
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

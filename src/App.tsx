import { BackgroundDecor } from './components/BackgroundDecor';
import { BusinessInfo } from './components/BusinessInfo';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InstagramGlyph, WhatsAppGlyph } from './components/BrandIcons';
import { LinkCard } from './components/LinkCard';
import { MenuCard } from './components/MenuCard';
import { OpeningHours } from './components/OpeningHours';
import { site } from './data/site';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <BackgroundDecor />

      <a
        href="#menu-link"
        className="sr-only focus:not-sr-only focus:absolute focus:left-1/2 focus:top-3 focus:z-50 focus:-translate-x-1/2 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-card"
      >
        Skip to the menu
      </a>

      <div id="top" className="mx-auto w-full max-w-column px-5 sm:px-6">
        <Header theme={theme} onToggleTheme={toggleTheme} />

        <main>
          <Hero />

          <div className="mt-8 space-y-3 sm:mt-10">
            <MenuCard delay={320} />

            <LinkCard
              href={site.links.instagram}
              title="Follow Our Journey"
              subtitle="Food, flavours & moments."
              icon={<InstagramGlyph className="h-[1.15rem] w-[1.15rem] text-white" />}
              iconClassName="bg-[linear-gradient(135deg,#F9A826_0%,#E1306C_52%,#8134AF_100%)] shadow-sm"
              delay={400}
            />

            <LinkCard
              href={site.links.whatsapp}
              title="Join Our WhatsApp Community"
              subtitle="Stay connected with CHICHA’S."
              icon={<WhatsAppGlyph className="h-[1.2rem] w-[1.2rem] text-white" />}
              iconClassName="bg-[#25D366] shadow-sm"
              delay={470}
            />
          </div>

          <div className="mt-3 space-y-3">
            <BusinessInfo delay={540} />
            <OpeningHours delay={610} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

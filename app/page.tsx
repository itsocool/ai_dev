import SkipLink from "@/components/skip-link";
import SiteHeader from "@/components/site-header";
import Hero from "@/components/hero";
import Work from "@/components/work";
import About from "@/components/about";
import Contact from "@/components/contact";
import SiteFooter from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

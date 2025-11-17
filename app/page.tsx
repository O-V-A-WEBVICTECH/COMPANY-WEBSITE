import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WebsiteAnalysis from "@/components/WebsiteAnalysis";
import About from "@/components/About";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Features />
        <WebsiteAnalysis />
        <About />
        <Portfolio />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import WebsiteAnalysis from './components/WebsiteAnalysis'
import About from './components/About'
import Team from './components/Team'
import Blog from './components/Blog'
import Careers from './components/Careers'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <WebsiteAnalysis />
        <About />
        <Team />
        <Blog />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

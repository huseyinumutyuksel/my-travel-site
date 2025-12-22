import { HashRouter } from 'react-router-dom';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import TravelSimulator from './components/TravelSimulator';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-cyan-500/30">
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        <TopBar />
        <main className="relative z-10 pb-24">
          <Hero />
          <TravelSimulator />
        </main>

        <footer className="relative z-10 py-8 text-center text-gray-500 text-sm border-t border-white/5 mt-auto">
          <p>© 2025 AeroTime. Built with React & Tailwind v4.</p>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;

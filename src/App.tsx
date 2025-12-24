import { HashRouter } from 'react-router-dom';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import TravelSimulator from './components/TravelSimulator';
import { WeatherProvider } from './context/WeatherContext';
import { WeatherScene } from './components/weather/WeatherScene';

function App() {
  return (
    <HashRouter>
      <WeatherProvider>
        <div className="relative min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white selection:bg-cyan-500/30 transition-colors duration-300 overflow-hidden">
          <WeatherScene />
          <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 pointer-events-none z-10" />

          <div className="relative z-20">
            <TopBar />
            <main className="pb-24">
              <Hero />
              <TravelSimulator />
            </main>

            <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-200 dark:border-white/5 mt-auto">
              <p>© 2025 AeroTime. Built with React & Tailwind v4.</p>
            </footer>
          </div>
        </div>
      </WeatherProvider>
    </HashRouter>
  );
}

export default App;

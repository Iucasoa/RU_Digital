import { useState } from 'react';

// Dados dos tópicos para mapear na tela
const topics = [
  { icon: '🚀', title: 'Cinemática', desc: 'Estude movimento, velocidade e aceleração de forma intuitiva.' },
  { icon: '⚡', title: 'Eletromagnetismo', desc: 'Explore cargas, campos magnéticos e correntes elétricas.' },
  { icon: '🌌', title: 'Física Quântica', desc: 'Mergulhe no mundo microscópico dos átomos e partículas.' },
  { icon: '🌍', title: 'Termodinâmica', desc: 'Entenda calor, temperatura e as leis da energia.' },
];

const formulas = [
  { name: '2ª Lei de Newton', formula: 'F = m · a' },
  { name: 'Energia Cinética', formula: 'Ec = mv² / 2' },
  { name: 'Efeito Doppler', formula: 'f = f₀ (v ± vo) / (v ∓ vs)' },
  { name: 'Relatividade', formula: 'E = mc²' },
];

function App() {
  const [activeFormula, setActiveFormula] = useState(0);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative selection:bg-cyan-500 selection:text-slate-900">
      
      {/* Fundo com grade e orbes brilhantes */}
      <div className="absolute inset-0 bg-grid pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

      {/* Navbar */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tight">
          <span className="text-cyan-400">🧲</span> Fisica<span className="text-cyan-400">Lab</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-slate-300 font-medium">
          <a href="#" className="hover:text-cyan-400 transition-colors">Início</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Conteúdos</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Fórmulas</a>
        </div>
        <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2 rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)]">
          Começar Agora
        </button>
      </nav>

      {/* Seção Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Texto Principal */}
        <div>
          <span className="inline-block bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            O Universo em suas mãos
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
            Desvende os <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Segredos da Física
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-lg">
            Uma plataforma interativa que transforma conceitos complexos em experiências visuais incríveis. Aprenda Física como nunca antes.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-slate-900 font-bold px-8 py-4 rounded-full hover:bg-slate-200 transition-colors">
              Explorar Tópicos
            </button>
            <button className="border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 font-bold px-8 py-4 rounded-full transition-all">
              Ver Demonstração ▶
            </button>
          </div>
        </div>

        {/* Visual Criativo (Átomo em CSS puro com Tailwind) */}
        <div className="relative flex items-center justify-center h-[400px]">
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Núcleo */}
            <div className="absolute w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full shadow-[0_0_60px_rgba(6,182,212,0.8)] animate-float z-10 flex items-center justify-center text-4xl">
              ⚛️
            </div>
            
            {/* Anéis orbitais */}
            <div className="absolute inset-0 border border-cyan-500/40 rounded-full animate-spin-slow" style={{ transform: 'rotateX(60deg) rotateZ(45deg)' }}></div>
            <div className="absolute inset-8 border border-purple-500/40 rounded-full animate-spin-slow" style={{ transform: 'rotateX(60deg) rotateZ(-45deg)', animationDirection: 'reverse' }}></div>
            
            {/* Elétrons */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_cyan] animate-pulse"></div>
            <div className="absolute bottom-4 left-10 w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_20px_purple] animate-pulse"></div>
            <div className="absolute top-1/2 right-0 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_white] animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Seção de Tópicos */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Domine os <span className="text-cyan-400">Fundamentos</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <div key={index} className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.3)]">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{topic.icon}</div>
              <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{topic.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Fórmulas Interativas */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
          
          <h2 className="text-3xl font-bold mb-4">Fórmulas que Movem o Mundo</h2>
          <p className="text-slate-400 mb-10">Clique nas equações abaixo para explorar.</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {formulas.map((f, index) => (
              <button 
                key={index} 
                onClick={() => setActiveFormula(index)}
                className={`px-6 py-3 rounded-full font-mono text-sm transition-all border ${
                  activeFormula === index 
                  ? 'bg-cyan-500 text-slate-950 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]' 
                  : 'border-slate-700 text-slate-400 hover:border-cyan-500 hover:text-cyan-400'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>

          <div className="text-5xl md:text-7xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 animate-pulse">
            {formulas[activeFormula].formula}
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="relative z-10 border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        © 2026 FisicaLab. Construído com React, TypeScript e Tailwind CSS v4.
      </footer>
    </div>
  );
}

export default App;
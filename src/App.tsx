import { useState, useEffect } from 'react';
import axios from 'axios';
import { QrCode, Utensils, Wallet, CheckCircle2, History, MapPin, Coffee, Globe, Plus, ArrowRightLeft } from 'lucide-react';

interface ApiDish {
  name: string;
  category: string;
  origin: string;
}

export default function App() {
  // Controle de Navegação
  const [activeTab, setActiveTab] = useState<'acesso' | 'carteira' | 'extrato'>('acesso');
  
  // Estados de Acesso
  const [ticketActive, setTicketActive] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(30);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // Estados da API
  const [chefSuggestion, setChefSuggestion] = useState<ApiDish | null>(null);
  const [loadingApi, setLoadingApi] = useState<boolean>(true);

  // Relógio
  useEffect(() => {
    const clockInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Cronômetro do QR Code
  useEffect(() => {
    let countdown: ReturnType<typeof setInterval>;
    if (ticketActive && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setTicketActive(false);
      setTimer(30);
    }
    return () => clearInterval(countdown);
  }, [ticketActive, timer]);

  // API do Prato Internacional
  useEffect(() => {
    const fetchDailySuggestion = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
        const meal = response.data.meals[0];
        setChefSuggestion({ name: meal.strMeal, category: meal.strCategory, origin: meal.strArea });
      } catch (error) {
        console.error('Erro na API:', error);
      } finally {
        setLoadingApi(false);
      }
    };
    fetchDailySuggestion();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8 flex justify-center items-center">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden flex flex-col h-[800px]">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-500/20 blur-[80px] pointer-events-none" />

        {/* Cabeçalho Fixo */}
        <header className="flex justify-between items-center mb-6 relative z-10">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">RU Digital</h1>
            <p className="text-sm text-slate-400 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" /> Campus Pau dos Ferros
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-mono font-medium text-slate-200">
              {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </header>

        {/* ÁREA DE RENDERIZAÇÃO CONDICIONAL */}
        <main className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          
          {/* TELA 1: ACESSO & CARDÁPIO */}
          {activeTab === 'acesso' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <section className={`relative p-6 rounded-3xl border transition-all duration-500 mb-6 ${
                ticketActive 
                  ? 'bg-emerald-950/40 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]' 
                  : 'bg-slate-950 border-slate-800'
              }`}>
                <div className="flex flex-col items-center justify-center text-center gap-4">
                  <div className={`p-4 rounded-2xl transition-colors duration-500 ${ticketActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-900 text-slate-600'}`}>
                    <QrCode className="w-16 h-16" />
                  </div>
                  <div>
                    <h2 className={`text-lg font-bold ${ticketActive ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {ticketActive ? 'Acesso Liberado' : 'Gerar Confirmação'}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1 h-5">
                      {ticketActive ? `Catraca atualiza em ${timer}s` : 'Aproxime na catraca do refeitório'}
                    </p>
                  </div>
                  <button 
                    onClick={() => { setTicketActive(true); setTimer(30); }}
                    disabled={ticketActive}
                    className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                      ticketActive ? 'bg-emerald-500/20 text-emerald-400 cursor-default' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    {ticketActive ? <><CheckCircle2 className="w-5 h-5" /> Ticket Ativo</> : 'Confirmar Refeição'}
                  </button>
                </div>
              </section>

              <section className="bg-slate-950 border border-slate-800 rounded-3xl p-5 mb-4">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
                  <h3 className="font-bold text-slate-200 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-orange-400" /> Cardápio Base
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-slate-500 font-mono mb-1">Prato Principal</p>
                    <p className="text-slate-300 font-medium">Iscas de Frango Grelhado</p>
                  </div>
                  <div className="flex items-start gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800/50 mt-2">
                    <Coffee className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 font-mono mb-0.5">Sobremesa</p>
                      <p className="text-slate-300 text-xs font-medium">Pão com Doce de Leite e Banana</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-indigo-950/30 border border-indigo-900/50 rounded-3xl p-5 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-bold text-indigo-300 text-sm">Sugestão Externa (API)</h3>
                </div>
                {!loadingApi && chefSuggestion && (
                  <div>
                    <p className="text-slate-200 font-medium text-sm">{chefSuggestion.name}</p>
                    <p className="text-xs text-indigo-400 mt-1">{chefSuggestion.origin} • {chefSuggestion.category}</p>
                  </div>
                )}
              </section>
            </div>
          )}

          {/* TELA 2: CARTEIRA */}
          {activeTab === 'carteira' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col gap-4 h-full">
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-indigo-500">
                  <Wallet className="w-24 h-24" />
                </div>
                <p className="text-slate-400 text-sm font-mono mb-1">Saldo SIGAA</p>
                <div className="flex items-baseline gap-2 mb-6">
                  <h2 className="text-5xl font-bold text-white">14</h2>
                  <span className="text-slate-400">refeições</span>
                </div>
                
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Plus className="w-5 h-5" /> Adicionar Saldo (PIX)
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 flex-1">
                <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4" /> Movimentações Recentes
                </h3>
                <div className="space-y-4">
                  {[
                    { tipo: 'Consumo', local: 'Almoço', valor: '-1', data: 'Hoje, 12:30' },
                    { tipo: 'Recarga', local: 'PIX Institucional', valor: '+10', data: 'Ontem, 09:15', isAdd: true },
                    { tipo: 'Consumo', local: 'Jantar', valor: '-1', data: 'Terça, 18:45' }
                  ].map((mov, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-slate-800/50 pb-3 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-slate-200">{mov.tipo} • {mov.local}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{mov.data}</p>
                      </div>
                      <span className={`font-mono font-bold ${mov.isAdd ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {mov.valor}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TELA 3: EXTRATO (Placeholder) */}
          {activeTab === 'extrato' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col items-center justify-center h-full text-center text-slate-500">
              <History className="w-12 h-12 mb-4 opacity-50" />
              <p>Histórico completo de refeições</p>
              <p className="text-xs mt-2">Sincronizando com o banco de dados...</p>
            </div>
          )}

        </main>
        
        {/* BARRA DE NAVEGAÇÃO FUNCIONAL */}
        <nav className="mt-4 flex justify-around items-center pt-4 border-t border-slate-800/80">
          <button 
            onClick={() => setActiveTab('acesso')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'acesso' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <QrCode className="w-6 h-6" />
            <span className="text-[10px] font-medium">Acesso</span>
          </button>
          <button 
            onClick={() => setActiveTab('carteira')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'carteira' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Wallet className="w-6 h-6" />
            <span className="text-[10px] font-medium">Carteira</span>
          </button>
          <button 
            onClick={() => setActiveTab('extrato')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'extrato' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <History className="w-6 h-6" />
            <span className="text-[10px] font-medium">Extrato</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
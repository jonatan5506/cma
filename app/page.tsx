'use client';

import * as React from 'react';
const { useState, useEffect } = React;
import Link from 'next/link';
import { CLINIC_NAME, CLINIC_SUBTITLE, TREATMENTS } from '../constants';

const LandingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('cma_theme');
    setIsDarkMode(saved === 'dark');
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    localStorage.setItem('cma_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDarkMode, mounted]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % TREATMENTS.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const themeClass = isDarkMode
    ? 'bg-slate-950 text-slate-100'
    : 'bg-white text-gray-900';
  const headerClass = scrolled
    ? isDarkMode
      ? 'bg-slate-900/95 border-slate-800'
      : 'bg-white/95 border-gray-100 shadow-md'
    : isDarkMode
    ? 'bg-slate-950/50 border-transparent'
    : 'bg-white/80 border-transparent';

  const insurancePlans = [
    { name: 'Unimed', color: 'bg-emerald-600' },
    { name: 'Bradesco', color: 'bg-red-600' },
    { name: 'SulAmérica', color: 'bg-orange-500' },
    { name: 'Porto Seguro', color: 'bg-sky-700' },
    { name: 'Caberj', color: 'bg-blue-800' },
    { name: '+', color: 'bg-slate-700' },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${themeClass}`}
    >
      {/* Top Bar Profissional */}
      <div
        className={`hidden md:flex ${
          isDarkMode ? 'bg-slate-900 text-slate-400' : 'bg-sky-950 text-sky-200'
        } text-[10px] py-2 px-12 justify-between items-center uppercase tracking-widest font-black border-b ${
          isDarkMode ? 'border-slate-800' : 'border-sky-900'
        }`}
      >
        <span>Excelência Médica e Tecnologia Hospitalar</span>
        <div className="flex gap-8">
          <span className="flex items-center gap-2">📞 (21) 99892-9900</span>
          <span className="flex items-center gap-2">
            📍 Niterói - Rio de Janeiro
          </span>
        </div>
      </div>

      {/* Header Principal */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md border-b top-0 ${
          scrolled ? 'py-3' : 'py-6 md:top-8'
        } ${headerClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div
            className="flex items-center gap-4 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-11 h-11 bg-sky-600 rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-xl shadow-sky-500/30 group-hover:rotate-6 transition-transform">
              CMA
            </div>
            <div className="hidden sm:flex flex-col">
              <h1
                className={`text-lg font-black tracking-tight leading-none ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {CLINIC_NAME}
              </h1>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-sky-500">
                {CLINIC_SUBTITLE}
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:flex items-center gap-6 mr-4 border-r border-gray-200 dark:border-slate-800 pr-6">
              {['Tratamentos', 'Quem Somos'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={(e) =>
                    scrollToSection(e, item.toLowerCase().replace(' ', '-'))
                  }
                  className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                    isDarkMode
                      ? 'text-slate-400 hover:text-sky-400'
                      : 'text-gray-500 hover:text-sky-600'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>

            <Link href="/agendar">
              <button className="px-4 py-2.5 bg-sky-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-sky-500/20 hover:bg-sky-500 transition active:scale-95 flex items-center gap-2">
                Agendar
              </button>
            </Link>

            <Link href="/entrar">
              <button
                className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all active:scale-95 ${
                  isDarkMode
                    ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                Paciente
              </button>
            </Link>

            <Link href="/staff/login">
              <button
                className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all active:scale-95 ${
                  isDarkMode
                    ? 'border-sky-500/30 text-sky-400 hover:bg-sky-500/10'
                    : 'border-sky-200 text-sky-700 hover:bg-sky-50'
                }`}
              >
                Colaborador
              </button>
            </Link>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`hidden sm:flex ml-2 items-center justify-center w-10 h-10 rounded-xl transition-colors ${
                isDarkMode
                  ? 'bg-slate-800 text-yellow-400'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {TREATMENTS.map((treatment, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index
                ? 'opacity-100 scale-105'
                : 'opacity-0 scale-100'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear"
              style={{
                backgroundImage: `url(${treatment.image})`,
                transform: currentSlide === index ? 'scale(1.1)' : 'scale(1)',
              }}
            ></div>
            <div
              className={`absolute inset-0 bg-gradient-to-t ${
                isDarkMode
                  ? 'from-slate-950 via-slate-950/60'
                  : 'from-sky-950 via-sky-950/40'
              } to-transparent opacity-80`}
            ></div>
          </div>
        ))}

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className="animate-fade-in-up">
            <span className="inline-block px-6 py-2 rounded-full bg-sky-400/20 border border-sky-400/30 text-sky-300 text-[10px] font-black uppercase tracking-[0.4em] mb-10 backdrop-blur-sm">
              Centro de Excelência em Dermatologia
            </span>
            <h2 className="text-6xl md:text-[8rem] font-black text-white mb-10 leading-[0.9] tracking-tighter drop-shadow-2xl">
              {TREATMENTS[currentSlide].title.split(' ').slice(0, 2).join(' ')}
              <br />
              <span className="text-sky-400 opacity-90">
                {TREATMENTS[currentSlide].title.split(' ').slice(2).join(' ')}
              </span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
              <Link
                href="/agendar"
                className="px-16 py-6 bg-white text-sky-900 rounded-full font-black text-xs shadow-2xl hover:bg-sky-50 transition active:scale-95 uppercase tracking-widest"
              >
                Iniciar Agendamento
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {TREATMENTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentSlide === i
                  ? 'w-12 bg-sky-400'
                  : 'w-3 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Seção Quem Somos */}
      <section
        id="quem-somos"
        className={`py-32 px-6 relative overflow-hidden transition-colors duration-500 ${
          isDarkMode ? 'bg-slate-950' : 'bg-zinc-50'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="w-full lg:w-1/2 relative group animate-fade-in-left">
              <div className="absolute -inset-4 bg-sky-500/10 rounded-[3rem] blur-2xl group-hover:bg-sky-500/20 transition-all duration-700"></div>
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 aspect-[4/5] lg:aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
                  alt="Clínica CMA Interior"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-sky-600 text-white p-10 rounded-[2.5rem] shadow-2xl hidden md:block">
                <p className="text-4xl font-black mb-1">30+</p>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">
                  + de 30 anos de experiência
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-10 animate-fade-in-right">
              <div>
                <span className="text-sky-500 font-black text-[10px] uppercase tracking-[0.5em] block mb-6">
                  Nossa História
                </span>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
                  Compromisso Real com a{' '}
                  <span className="text-sky-500">Sua Saúde</span> e Autoestima.
                </h2>
                <div className={`w-20 h-2 bg-sky-500 rounded-full mb-10`}></div>
                <p
                  className={`text-lg font-medium leading-relaxed opacity-80 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  Fundado no coração de Niterói, o Centro Médico Avançado (CMA)
                  nasceu com a missão de elevar os padrões de atendimento
                  dermatológico. Combinamos mais de 30 anos de expertise clínica
                  com as tecnologias mais modernas do mercado global.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                  className={`p-8 rounded-3xl border ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-zinc-200'
                  } shadow-sm`}
                >
                  <div className="text-3xl mb-4">🏥</div>
                  <h4 className="font-black text-xs uppercase tracking-widest mb-3">
                    Infraestrutura
                  </h4>
                  <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wider">
                    Salas equipadas com tecnologia hospitalar de última geração.
                  </p>
                </div>
                <div
                  className={`p-8 rounded-3xl border ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-zinc-200'
                  } shadow-sm`}
                >
                  <div className="text-3xl mb-4">🤝</div>
                  <h4 className="font-black text-xs uppercase tracking-widest mb-3">
                    Humanização
                  </h4>
                  <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wider">
                    Atendimento personalizado focado no bem-estar integral do
                    paciente.
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <button className="flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-sky-600 text-white rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    →
                  </div>
                  <span className="font-black text-xs uppercase tracking-[0.3em] group-hover:text-sky-500 transition-colors">
                    Saiba mais sobre nós
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Profissional */}
      <footer className="bg-slate-950 text-white pt-24 pb-12 px-6 border-t border-slate-900 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-sky-500/20">
                C
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tighter">
                  {CLINIC_NAME}
                </h3>
                <p className="text-[9px] font-black uppercase tracking-widest text-sky-400">
                  {CLINIC_SUBTITLE}
                </p>
              </div>
            </div>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Tecnologia avançada e cuidado humanizado no coração de Niterói.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Institucional
            </h4>
            <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <li>
                <Link
                  href="/agendar"
                  className="hover:text-white transition-colors"
                >
                  Agendamento
                </Link>
              </li>
              <li>
                <Link
                  href="/entrar"
                  className="hover:text-white transition-colors"
                >
                  Portal Paciente
                </Link>
              </li>
              <li>
                <Link
                  href="/staff/login"
                  className="hover:text-white transition-colors"
                >
                  Portal Colaborador
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Localização
            </h4>
            <p className="text-slate-500 text-xs font-bold leading-relaxed uppercase tracking-widest">
              Av. Amaral Peixoto 55, salas 203 e 205
              <br />
              Centro - Niterói - RJ
              <br />
              CEP 24020-070
              <br />
              (21) 99892-9900
            </p>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Conecte-se
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/centromedicoavancado_dermato/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label="Instagram"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:border-transparent">
                  <svg
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="insta-grad"
                        x1="2"
                        y1="22"
                        x2="22"
                        y2="2"
                      >
                        <stop offset="0%" stopColor="#f9ce34" />
                        <stop offset="50%" stopColor="#ee2a7b" />
                        <stop offset="100%" stopColor="#6228d7" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                      stroke="url(#insta-grad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z"
                      stroke="url(#insta-grad)"
                      strokeWidth="2"
                    />
                    <path
                      d="M17.5 6.51L17.51 6.49889"
                      stroke="url(#insta-grad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </a>

              <a
                href="https://wa.me/5521998929900"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label="WhatsApp"
              >
                <div className="absolute inset-0 bg-[#25D366] rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:border-transparent group-hover:bg-[#25D366]/10">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03a11.934 11.934 0 001.576 6.12L0 24l6.101-1.6a11.83 11.83 0 005.942 1.586h.005c6.635 0 12.032-5.396 12.035-12.03a11.84 11.84 0 00-3.517-8.487z"
                      fill="#25D366"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Seção Convênios Aceitos */}
        <div className="max-w-7xl mx-auto mb-16 relative z-10 border-y border-slate-900 py-10 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="shrink-0">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2">
                Convênios Aceitos
              </h4>
              <div className="w-12 h-1 bg-sky-600 rounded-full"></div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 md:gap-12 opacity-50 hover:opacity-100 transition-opacity duration-500">
              {insurancePlans.map((plan, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 group cursor-default"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${plan.color} shadow-sm group-hover:scale-150 transition-transform`}
                  ></div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
                    {plan.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-slate-900">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center font-black text-xs">
              C
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">
              © {new Date().getFullYear()} Centro Médico Avançado • Niterói, RJ
            </p>
          </div>
        </div>

        <div className="relative z-20 mt-12 flex justify-center">
          <blockquote className="space-y-2">
            <p className="text-lg text-center">&ldquo;.&rdquo;</p>
            <footer className="text-center text-sm">
              Desenvolvido por{' '}
              <a
                href="https://argustech.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-all"
              >
                Argus{' '}
                <span className="font-bold" style={{ color: '#0000FF' }}>
                  Tech
                </span>
              </a>
            </footer>
          </blockquote>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-left { animation: fade-in-left 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-right { animation: fade-in-right 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default LandingPage;

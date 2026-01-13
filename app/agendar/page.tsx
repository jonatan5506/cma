'use client';

import * as React from 'react';
const { useState, useEffect } = React;
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, UserRole } from '../../types';
import { SERVICE_CATEGORIES, DOCTORS_DATA, CLINIC_NAME } from '../../constants';

const BookingPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    category: '',
    service: null as any,
    date: '',
    time: '',
    doctor: null as any,
    paymentMethod: '',
    patientInfo: {
      name: '',
      whatsapp: '',
      cpf: '',
    },
  });

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem('cma_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const onLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('cma_user', JSON.stringify(userData));
  };

  const steps = [
    { n: 1, label: 'Serviço' },
    { n: 2, label: 'Agenda' },
    { n: 3, label: 'Médico' },
    { n: 4, label: 'Identificação' },
    { n: 5, label: 'Pagamento' },
    { n: 6, label: 'Concluído' },
  ];

  const handlePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      const newUser: User = {
        id: 'new-p-' + Date.now(),
        name: bookingData.patientInfo.name,
        username: bookingData.patientInfo.whatsapp,
        role: UserRole.PATIENT,
        whatsapp: bookingData.patientInfo.whatsapp,
        cpf: bookingData.patientInfo.cpf,
      };
      onLogin(newUser);
    }
    setStep(5);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    setBookingData({
                      ...bookingData,
                      category: cat.id,
                      service: null,
                    })
                  }
                  className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${
                    bookingData.category === cat.id
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20 shadow-lg shadow-sky-500/10'
                      : 'border-zinc-100 dark:border-zinc-800 hover:border-sky-200 bg-white dark:bg-zinc-900'
                  }`}
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="font-black text-[10px] uppercase tracking-widest">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>

            {bookingData.category && (
              <div className="grid grid-cols-1 gap-3 animate-in fade-in zoom-in-95">
                {SERVICE_CATEGORIES.find(
                  (c) => c.id === bookingData.category,
                )?.services.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => {
                      setBookingData({ ...bookingData, service: svc });
                      setStep(2);
                    }}
                    className={`p-6 rounded-3xl border flex justify-between items-center transition-all ${
                      bookingData.service?.id === svc.id
                        ? 'border-sky-500 bg-sky-600 text-white shadow-xl scale-[1.02]'
                        : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-sky-200'
                    }`}
                  >
                    <div className="text-left">
                      <span className="font-black text-xs uppercase tracking-widest block mb-1">
                        Procedimento
                      </span>
                      <span className="font-bold text-sm">{svc.name}</span>
                    </div>
                    <span className="font-black text-xs bg-black/10 px-3 py-1 rounded-full">
                      R$ {svc.price},00
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        );

      case 2:
        const times = ['08:00', '09:00', '10:30', '14:00', '15:30', '17:00'];
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-xl">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 block mb-4">
                Selecione o Dia
              </label>
              <input
                type="date"
                className="w-full bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl p-5 font-black text-sm outline-none focus:ring-2 focus:ring-sky-500 dark:text-white"
                onChange={(e) =>
                  setBookingData({ ...bookingData, date: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {times.map((t) => (
                <button
                  key={t}
                  disabled={!bookingData.date}
                  onClick={() => {
                    setBookingData({ ...bookingData, time: t });
                    setStep(3);
                  }}
                  className={`py-5 rounded-2xl border-2 font-black text-xs transition-all ${
                    !bookingData.date ? 'opacity-30 cursor-not-allowed' : ''
                  } ${
                    bookingData.time === t
                      ? 'border-sky-500 bg-sky-500 text-white shadow-lg'
                      : 'border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-sky-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="col-span-full mb-4">
              <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest text-center">
                Especialistas disponíveis em {bookingData.date} às{' '}
                {bookingData.time}
              </p>
            </div>
            {DOCTORS_DATA.map((doc) => (
              <button
                key={doc.name}
                onClick={() => {
                  setBookingData({ ...bookingData, doctor: doc });
                  setStep(4);
                }}
                className={`group p-8 rounded-[3rem] border-2 transition-all flex flex-col items-center gap-6 ${
                  bookingData.doctor?.name === doc.name
                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20 shadow-2xl scale-[1.05]'
                    : 'border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-sky-200'
                }`}
              >
                <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white shadow-lg group-hover:rotate-3 transition-transform">
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="font-black text-[10px] uppercase tracking-widest text-sky-600 mb-1">
                    Médica
                  </p>
                  <p className="font-black text-sm">{doc.name}</p>
                </div>
                <div className="text-[9px] font-black uppercase text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-3 py-1 rounded-full">
                  Disponível
                </div>
              </button>
            ))}
          </div>
        );

      case 4:
        if (user) {
          return (
            <div className="bg-white dark:bg-zinc-900 p-12 rounded-[3.5rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl text-center animate-in fade-in zoom-in-95">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-8 shadow-inner">
                👤
              </div>
              <h3 className="text-2xl font-black mb-2 tracking-tight">
                Identificado como {user.name}
              </h3>
              <p className="text-zinc-500 text-sm font-medium mb-10">
                Seus dados de paciente serão utilizados para este agendamento.
              </p>
              <button
                onClick={() => setStep(5)}
                className="w-full bg-zinc-900 dark:bg-sky-600 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-xl"
              >
                Continuar para Pagamento
              </button>
            </div>
          );
        }
        return (
          <form
            onSubmit={handlePatientSubmit}
            className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-xl space-y-6">
              <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest mb-4">
                Informações de Contato
              </p>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-4">
                  Nome Completo
                </label>
                <input
                  required
                  type="text"
                  className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-2xl border-none font-bold text-sm outline-none focus:ring-2 focus:ring-sky-500"
                  value={bookingData.patientInfo.name}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      patientInfo: {
                        ...bookingData.patientInfo,
                        name: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-4">
                    WhatsApp
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="(21) 99999-9999"
                    className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-2xl border-none font-bold text-sm outline-none focus:ring-2 focus:ring-sky-500"
                    value={bookingData.patientInfo.whatsapp}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        patientInfo: {
                          ...bookingData.patientInfo,
                          whatsapp: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-4">
                    CPF
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="000.000.000-00"
                    className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-2xl border-none font-bold text-sm outline-none focus:ring-2 focus:ring-sky-500"
                    value={bookingData.patientInfo.cpf}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        patientInfo: {
                          ...bookingData.patientInfo,
                          cpf: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-sky-600 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-sky-500 transition-all mt-6"
              >
                Confirmar Meus Dados
              </button>
            </div>
          </form>
        );

      case 5:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-zinc-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 blur-3xl rounded-full"></div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-8">
                Checkout Final
              </h3>
              <div className="space-y-5">
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                    Procedimento
                  </span>
                  <span className="font-bold text-sm">
                    {bookingData.service?.name}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                    Profissional
                  </span>
                  <span className="font-bold text-sm">
                    {bookingData.doctor?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                    Horário
                  </span>
                  <span className="font-bold text-sm text-sky-400">
                    {bookingData.date} às {bookingData.time}
                  </span>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t-2 border-dashed border-white/10 flex justify-between items-center">
                <span className="text-xl font-black uppercase tracking-tighter">
                  Valor Total
                </span>
                <span className="text-4xl font-black text-sky-400">
                  R$ {bookingData.service?.price},00
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                {
                  id: 'pix',
                  name: 'PAGAR COM PIX',
                  icon: '📱',
                  sub: 'Aprovação instantânea',
                },
                {
                  id: 'card',
                  name: 'CARTÃO DE CRÉDITO',
                  icon: '💳',
                  sub: 'Até 10x sem juros',
                },
                {
                  id: 'local',
                  name: 'PAGAR NA CLÍNICA',
                  icon: '🏢',
                  sub: 'No dia do procedimento',
                },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() =>
                    setBookingData({ ...bookingData, paymentMethod: method.id })
                  }
                  className={`p-6 rounded-[2.5rem] border-2 transition-all flex items-center justify-between group bg-white dark:bg-zinc-900 ${
                    bookingData.paymentMethod === method.id
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-xl'
                      : 'border-zinc-100 dark:border-zinc-800 hover:border-sky-200'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-3xl bg-zinc-50 dark:bg-zinc-800 p-3 rounded-2xl">
                      {method.icon}
                    </span>
                    <div className="text-left">
                      <p className="font-black text-xs tracking-widest uppercase mb-1">
                        {method.name}
                      </p>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase">
                        {method.sub}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      bookingData.paymentMethod === method.id
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : 'border-zinc-200'
                    }`}
                  >
                    {bookingData.paymentMethod === method.id && '✓'}
                  </div>
                </button>
              ))}
            </div>

            {bookingData.paymentMethod && (
              <button
                onClick={() => setStep(6)}
                className="w-full bg-emerald-600 text-white py-7 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/30 hover:bg-emerald-500 transition-all active:scale-95 animate-in zoom-in-95"
              >
                Concluir Agendamento
              </button>
            )}
          </div>
        );

      case 6:
        return (
          <div className="bg-white dark:bg-zinc-900 p-16 rounded-[4rem] border-4 border-emerald-500/20 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-700">
            <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center text-5xl mx-auto mb-10 shadow-2xl animate-bounce">
              ✓
            </div>
            <h2 className="text-4xl font-black mb-4 tracking-tighter">
              Reserva Confirmada!
            </h2>
            <p className="text-zinc-500 font-medium mb-12 max-w-sm mx-auto">
              Parabéns! Seu horário foi reservado com sucesso. Enviamos um
              resumo detalhado para seu WhatsApp.
            </p>

            <div className="bg-zinc-50 dark:bg-zinc-800 p-8 rounded-3xl mb-12 flex flex-col gap-3">
              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-zinc-400">
                <span>ID da Transação</span>
                <span>
                  #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span>{bookingData.service?.name}</span>
                <span>R$ {bookingData.service?.price},00</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/')}
              className="px-12 py-6 bg-zinc-900 dark:bg-sky-600 text-white rounded-full font-black text-xs uppercase tracking-[0.3em] hover:opacity-90 transition-all shadow-xl"
            >
              Voltar para a Home
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 pb-32">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white font-black group-hover:rotate-12 transition-transform shadow-lg shadow-sky-500/20">
              C
            </div>
            <span className="font-black text-[11px] uppercase tracking-tighter hidden sm:block">
              Centro Médico Avançado
            </span>
          </Link>
          <div className="flex gap-2">
            {steps.map((s) => (
              <div
                key={s.n}
                className={`h-1.5 rounded-full transition-all duration-700 ${
                  step >= s.n
                    ? 'w-8 md:w-12 bg-sky-500'
                    : 'w-3 md:w-6 bg-zinc-200 dark:bg-zinc-800'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => router.push('/')}
            className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-red-500 transition-colors"
          >
            Sair
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-16">
        {step < 6 && (
          <header className="text-center mb-16 animate-in fade-in slide-in-from-top-4">
            <span className="text-sky-500 font-black text-[10px] uppercase tracking-[0.4em] block mb-4">
              Fluxo de Reserva • Passo {step} de 5
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              {steps.find((s) => s.n === step)?.label}
            </h1>
            <div className="w-12 h-1.5 bg-sky-500 mx-auto rounded-full"></div>
          </header>
        )}

        {renderStep()}

        {step > 1 && step < 6 && (
          <button
            onClick={() => setStep(step - 1)}
            className="mt-16 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-zinc-900 flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Corrigir passo anterior
          </button>
        )}
      </div>

      <style>{`
        ::-webkit-calendar-picker-indicator {
          filter: invert(0.5);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default BookingPage;

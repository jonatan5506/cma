'use client';

import * as React from 'react';
const { useState, useEffect } = React;
import { useRouter } from 'next/navigation';
import { User, UserRole, Appointment } from '../../../types';

type AccentColor = 'blue' | 'indigo' | 'rose';

const StaffDashboard: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('visão-geral');
  const [accentColor, setAccentColor] = useState<AccentColor>('blue');

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem('cma_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.role !== UserRole.PATIENT) {
        setUser(parsedUser);
      } else {
        router.push('/dashboard');
      }
    } else {
      router.push('/staff/login');
    }

    const savedAccent = localStorage.getItem('cma_staff_accent');
    if (savedAccent) {
      setAccentColor(savedAccent as AccentColor);
    }
  }, [router]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cma_staff_accent', accentColor);
    }
  }, [accentColor, mounted]);

  const appointments: Appointment[] = [
    {
      id: '1',
      patientId: 'p1',
      patientName: 'Carlos Silva',
      doctorId: 'staff-DOCTOR',
      doctorName: 'Dra. Marília',
      date: '2023-11-20',
      time: '09:00',
      status: 'SCHEDULED',
    },
    {
      id: '2',
      patientId: 'p2',
      patientName: 'Ana Souza',
      doctorId: 'staff-DOCTOR',
      doctorName: 'Dra. Marília',
      date: '2023-11-20',
      time: '10:30',
      status: 'COMPLETED',
    },
    {
      id: '3',
      patientId: 'p3',
      patientName: 'Pedro Santos',
      doctorId: 'doc-2',
      doctorName: 'Dra. Laís',
      date: '2023-11-20',
      time: '11:00',
      status: 'SCHEDULED',
    },
  ];

  const theme = {
    blue: {
      bg: 'bg-blue-600',
      text: 'text-blue-600',
      soft: 'bg-blue-50 dark:bg-blue-900/20',
    },
    indigo: {
      bg: 'bg-indigo-600',
      text: 'text-indigo-600',
      soft: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
    rose: {
      bg: 'bg-rose-600',
      text: 'text-rose-600',
      soft: 'bg-rose-50 dark:bg-rose-900/20',
    },
  }[accentColor];

  const onLogout = () => {
    localStorage.removeItem('cma_user');
    router.push('/staff/login');
  };

  const RenderAppointments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black tracking-tight">
          Fila de Atendimento
        </h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-emerald-500 text-white text-[10px] font-black uppercase rounded-lg">
            Chamar Próximo
          </button>
          <button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black uppercase rounded-lg">
            Imprimir Grade
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-between shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center font-black text-sm">
                {appt.time}
              </div>
              <div>
                <p className="font-black text-sm uppercase tracking-tight">
                  {appt.patientName}
                </p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  {appt.doctorName} • Sala 04
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  appt.status === 'COMPLETED'
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-sky-50 text-sky-600'
                }`}
              >
                {appt.status}
              </span>
              <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                ⚙️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RenderFinancial = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-600 text-white p-8 rounded-[2.5rem] shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">
            Faturamento Hoje
          </p>
          <p className="text-3xl font-black">R$ 8.450,00</p>
          <div className="mt-4 pt-4 border-t border-white/10 text-[10px] font-bold">
            +15% em relação a ontem
          </div>
        </div>
        <div className="bg-sky-600 text-white p-8 rounded-[2.5rem] shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">
            Ticket Médio
          </p>
          <p className="text-3xl font-black">R$ 420,00</p>
          <div className="mt-4 pt-4 border-t border-white/10 text-[10px] font-bold">
            Base: 24 atendimentos
          </div>
        </div>
        <div className="bg-indigo-600 text-white p-8 rounded-[2.5rem] shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">
            Contas a Pagar
          </p>
          <p className="text-3xl font-black">R$ 1.200,00</p>
          <div className="mt-4 pt-4 border-t border-white/10 text-[10px] font-bold">
            Vencimento em 48h
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800">
        <h3 className="font-black text-sm uppercase tracking-widest mb-6">
          Fluxo de Caixa Mensal
        </h3>
        <div className="h-40 flex items-end gap-3 px-4">
          {[40, 70, 45, 90, 65, 80, 50, 95, 40, 85, 60, 100].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-t-lg relative group"
            >
              <div
                className={`absolute bottom-0 left-0 w-full rounded-t-lg ${theme.bg} group-hover:opacity-80 transition-all`}
                style={{ height: `${h}%` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const RenderRoster = () => (
    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden">
      <div className="p-8 border-b border-zinc-100 dark:border-zinc-800">
        <h3 className="font-black text-sm uppercase tracking-widest">
          Escala de Plantão • Semana Atual
        </h3>
      </div>
      <div className="p-8 grid grid-cols-1 md:grid-cols-7 gap-4">
        {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map((day) => (
          <div key={day} className="space-y-3">
            <p className="text-[10px] font-black text-zinc-400 uppercase text-center">
              {day}
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-700 min-h-[100px] flex flex-col gap-2">
              <span className="text-[9px] font-black bg-sky-100 dark:bg-sky-900/30 text-sky-600 px-2 py-1 rounded text-center">
                Dra. Marília
              </span>
              {day === 'Ter' && (
                <span className="text-[9px] font-black bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 px-2 py-1 rounded text-center">
                  Dra. Laís
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (!mounted || !user) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex font-sans text-zinc-900 dark:text-zinc-100 overflow-hidden">
      <aside className="w-72 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hidden lg:flex flex-col">
        <div className="h-20 flex items-center px-10 border-b border-zinc-200 dark:border-zinc-800">
          <div
            className={`w-10 h-10 rounded-xl ${theme.bg} flex items-center justify-center text-white font-black text-xs mr-4 shadow-lg`}
          >
            C
          </div>
          <span className="font-black text-sm tracking-tighter uppercase">
            ERP Clínico
          </span>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {[
            { id: 'visão-geral', label: 'Dashboard Geral', icon: '📊' },
            { id: 'atendimento', label: 'Atendimento', icon: '🩺' },
            {
              id: 'financeiro',
              label: 'Financeiro',
              icon: '💰',
              role: UserRole.ADMIN,
            },
            { id: 'escala', label: 'Escala Médica', icon: '📅' },
            { id: 'pacientes', label: 'Base de Dados', icon: '👥' },
            {
              id: 'estoque',
              label: 'Estoque/Farmácia',
              icon: '📦',
              role: UserRole.RECEPTIONIST,
            },
          ].map((item) => {
            if (
              item.role &&
              user.role !== item.role &&
              user.role !== UserRole.ADMIN
            )
              return null;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                  active
                    ? `${theme.soft} ${theme.text}`
                    : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-8 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`w-12 h-12 rounded-full ${theme.bg} text-white flex items-center justify-center font-black`}
            >
              {user.name[0]}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-tight">
                {user.name.split(' ')[0]}
              </p>
              <p className={`text-[9px] font-black uppercase ${theme.text}`}>
                {user.role}
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full text-[10px] font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 py-3 rounded-xl transition-all uppercase tracking-widest"
          >
            Sair do ERP
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-10 flex justify-between items-center shrink-0">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
            Ambiente Administrativo
          </h2>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-2">
              {['blue', 'indigo', 'rose'].map((c) => (
                <button
                  key={c}
                  onClick={() => setAccentColor(c as any)}
                  className={`w-4 h-4 rounded-full ${
                    c === 'blue'
                      ? 'bg-blue-600'
                      : c === 'indigo'
                      ? 'bg-indigo-600'
                      : 'bg-rose-600'
                  } ${
                    accentColor === c
                      ? 'ring-2 ring-offset-2 ring-zinc-400'
                      : ''
                  }`}
                />
              ))}
            </div>
            <div className="h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800"></div>
            <button className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-sky-600 transition-colors">
              Notificações (3)
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-10 lg:p-14 space-y-10">
          {activeTab === 'visão-geral' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                  <h1 className="text-4xl font-black tracking-tight mb-2">
                    Painel de Controle
                  </h1>
                  <p className="text-zinc-500 font-medium">
                    Gestão centralizada da unidade Niterói Centro.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white dark:bg-zinc-900 px-6 py-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center">
                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                      Ocupação Atual
                    </p>
                    <p className="text-xl font-black text-emerald-500">85%</p>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 px-6 py-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center">
                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                      Fila Estimada
                    </p>
                    <p className="text-xl font-black text-sky-500">12min</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Consultas Mês" value="248" icon="📈" />
                <StatCard label="Novos Pacientes" value="32" icon="✨" />
                <StatCard label="Cancelamentos" value="4%" icon="📉" />
                <StatCard label="Satisfação" value="4.9/5" icon="⭐" />
              </div>
              <RenderAppointments />
            </div>
          )}

          {activeTab === 'financeiro' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <RenderFinancial />
            </div>
          )}
          {activeTab === 'atendimento' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <RenderAppointments />
            </div>
          )}
          {activeTab === 'escala' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <RenderRoster />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, icon }: any) => (
  <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all">
    <div className="text-2xl mb-4">{icon}</div>
    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
      {label}
    </p>
    <p className="text-2xl font-black tracking-tighter">{value}</p>
  </div>
);

export default StaffDashboard;

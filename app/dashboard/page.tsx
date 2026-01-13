'use client';

import * as React from 'react';
const { useState, useEffect } = React;
import { useRouter } from 'next/navigation';
import { User, Appointment, UserRole } from '../../types';

const PatientDashboard: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState('agenda');

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem('cma_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.role === UserRole.PATIENT) {
        setUser(parsedUser);
        setAppointments([
          {
            id: '1',
            patientId: parsedUser.id,
            patientName: parsedUser.name,
            doctorId: 'doc-1',
            doctorName: 'Dra. Marília Nogueira',
            date: '2023-11-20',
            time: '14:00',
            status: 'SCHEDULED',
          },
        ]);
      } else {
        router.push('/staff/dashboard');
      }
    } else {
      router.push('/entrar');
    }
  }, [router]);

  const onLogout = () => {
    localStorage.removeItem('cma_user');
    router.push('/entrar');
  };

  const RenderAgenda = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {appointments.map((appt) => (
        <div
          key={appt.id}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center text-2xl">
            🗓️
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-sky-50 text-sky-600`}
              >
                CONFIRMADA
              </span>
              <h4 className="font-bold text-lg">{appt.doctorName}</h4>
            </div>
            <div className="flex gap-4 text-zinc-400 font-bold text-xs uppercase tracking-widest">
              <span>📅 {new Date(appt.date).toLocaleDateString('pt-BR')}</span>
              <span>⏰ {appt.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const RenderDocuments = () => (
    <div className="space-y-4">
      {[
        { title: 'Receita Digital #492', date: '10/11/2023', type: 'PDF' },
        {
          title: 'Pedido de Exames de Sangue',
          date: '05/11/2023',
          type: 'PDF',
        },
        { title: 'Orientações Pós-Peeling', date: '01/11/2023', type: 'DOC' },
      ].map((doc, i) => (
        <div
          key={i}
          className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex justify-between items-center group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-black">
              📄
            </div>
            <div>
              <p className="font-black text-sm uppercase tracking-tight">
                {doc.title}
              </p>
              <p className="text-[10px] font-bold text-zinc-400 uppercase">
                Emitido em {doc.date}
              </p>
            </div>
          </div>
          <button className="px-4 py-2 text-[10px] font-black uppercase bg-zinc-900 text-white rounded-lg hover:bg-black transition-all">
            Download
          </button>
        </div>
      ))}
    </div>
  );

  if (!mounted || !user) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex font-sans text-zinc-900 dark:text-zinc-100 overflow-hidden">
      {/* Sidebar Patient */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hidden lg:flex flex-col">
        <div className="h-20 flex items-center px-8 border-b border-zinc-200 dark:border-zinc-800">
          <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-black text-xs mr-3">
            C
          </div>
          <span className="font-black text-sm tracking-tighter uppercase">
            Meu Portal
          </span>
        </div>

        <nav className="flex-1 p-6 space-y-1">
          {[
            { id: 'agenda', label: 'Minha Agenda', icon: '🗓️' },
            { id: 'documentos', label: 'Documentos', icon: '📄' },
            { id: 'historico', label: 'Histórico', icon: '📜' },
            { id: 'perfil', label: 'Meus Dados', icon: '👤' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                activeTab === item.id
                  ? 'bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400'
                  : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={onLogout}
            className="w-full text-[10px] font-black text-zinc-400 hover:text-red-500 transition-colors uppercase tracking-widest text-center py-2"
          >
            Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-10 flex justify-between items-center shrink-0">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
            Ambiente do Paciente
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold">{user.name}</span>
            <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-black text-xs">
              {user.name[0]}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-10 lg:p-14 space-y-10 max-w-5xl mx-auto w-full">
          <div className="bg-sky-900 text-white rounded-[3rem] p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full"></div>
            <div className="relative z-10">
              <h1 className="text-5xl font-black tracking-tight mb-3">
                Olá, {user.name.split(' ')[0]}!
              </h1>
              <p className="text-sky-200 text-lg font-medium opacity-80">
                Você tem 1 consulta confirmada para esta semana.
              </p>
            </div>
            <button className="bg-white text-sky-900 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:bg-sky-50 transition-all active:scale-95 relative z-10">
              Agendar Novo Horário
            </button>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-black tracking-tight flex items-center gap-4 uppercase text-[14px]">
              {activeTab === 'agenda'
                ? 'Próximos Compromissos'
                : 'Minha Biblioteca Digital'}
              <div className="flex-1 h-[1px] bg-zinc-200 dark:bg-zinc-800"></div>
            </h3>

            {activeTab === 'agenda' ? <RenderAgenda /> : <RenderDocuments />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;

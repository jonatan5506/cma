'use client';

import * as React from 'react';
const { useState, useEffect } = React;
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, UserRole } from '../../../types';

const StaffAuth: React.FC = () => {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>(UserRole.RECEPTIONIST);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem('cma_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.role !== UserRole.PATIENT) {
        router.push('/staff/dashboard');
      }
    }
  }, [router]);

  const testAccounts = [
    {
      role: UserRole.ADMIN,
      name: 'Administrador',
      username: 'admin',
      description: 'Gestão total do sistema',
    },
    {
      role: UserRole.DOCTOR,
      name: 'Médico Especialista',
      username: 'medico',
      description: 'Agenda e prontuários',
    },
    {
      role: UserRole.RECEPTIONIST,
      name: 'Recepcionista',
      username: 'recep',
      description: 'Fluxo de pacientes',
    },
  ];

  const onLogin = (userData: User) => {
    localStorage.setItem('cma_user', JSON.stringify(userData));
    router.push('/staff/dashboard');
    router.refresh();
  };

  const handleQuickLogin = (acc: (typeof testAccounts)[0]) => {
    const mockUser: User = {
      id: `staff-${acc.role}`,
      name: acc.name,
      username: acc.username,
      role: acc.role as UserRole,
      specialty: acc.role === UserRole.DOCTOR ? 'Dermatologia' : undefined,
    };
    onLogin(mockUser);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let name = 'Colaborador';
    if (username === 'admin') name = 'Administrador';
    else if (username === 'medico') name = 'Médico';
    else if (username === 'recep') name = 'Recepcionista';

    const mockUser: User = {
      id: `staff-${role}`,
      name: name,
      username: username,
      role: role,
      specialty: role === UserRole.DOCTOR ? 'Dermatologia' : undefined,
    };
    onLogin(mockUser);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-sky-100 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-zinc-200 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-5xl w-full flex flex-col lg:flex-row gap-8 items-center lg:items-stretch relative z-10 animate-slide-up">
        {/* Left Panel: Info and Quick Access */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-6">
              Acesso Rápido
            </h3>
            <div className="space-y-3">
              {testAccounts.map((acc) => (
                <button
                  key={acc.role}
                  onClick={() => handleQuickLogin(acc)}
                  className="w-full bg-zinc-50/50 hover:bg-zinc-100 border border-zinc-100 hover:border-zinc-200 p-4 rounded-2xl text-left transition-all group flex flex-col gap-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                      {acc.role}
                    </span>
                    <svg
                      className="w-3 h-3 text-zinc-300 group-hover:text-sky-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-bold text-zinc-800">{acc.name}</p>
                  <p className="text-[10px] text-zinc-500">{acc.description}</p>
                </button>
              ))}
            </div>
            <div className="mt-8 p-4 bg-sky-50 rounded-2xl border border-sky-100">
              <p className="text-[10px] text-sky-700 font-medium leading-relaxed italic text-center">
                Utilize as credenciais de teste ao lado para navegar entre os
                diferentes módulos do sistema.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel: Main Auth Form */}
        <div className="flex-1 max-w-lg w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] p-10 lg:p-14 border border-zinc-200 relative overflow-hidden">
          <div className="text-center mb-10">
            <div className="inline-flex w-16 h-16 bg-zinc-900 rounded-2xl items-center justify-center text-white font-black text-2xl shadow-xl mb-6">
              C
            </div>
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight mb-1 uppercase">
              Acesso Restrito
            </h2>
            <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.3em]">
              Módulo de Colaboradores
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">
                Tipo de Acesso
              </label>
              <div className="relative">
                <select
                  className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-2xl p-4 text-sm font-bold transition-all outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 appearance-none cursor-pointer"
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                >
                  <option value="RECEPTIONIST">RECEPÇÃO</option>
                  <option value="DOCTOR">MÉDICO / ESPECIALISTA</option>
                  <option value="ADMIN">ADMINISTRAÇÃO</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 text-[10px]">
                  ▼
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">
                Identificador
              </label>
              <input
                type="text"
                required
                placeholder="Ex: admin, medico, recep"
                className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-2xl p-4 text-sm font-bold transition-all outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 placeholder-zinc-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">
                Senha
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-2xl p-4 text-sm font-bold transition-all outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 placeholder-zinc-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between px-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-zinc-300 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Lembrar-me
                </span>
              </label>
              <button
                type="button"
                className="text-[10px] font-bold text-sky-600 hover:text-sky-700 uppercase tracking-widest transition-colors"
              >
                Esqueceu a senha?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-zinc-900/10 hover:bg-black transition-all active:scale-[0.98] mt-6"
            >
              Entrar no Sistema
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-zinc-100 text-center">
            <Link
              href="/"
              className="text-[9px] font-black text-zinc-400 hover:text-zinc-900 uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2"
            >
              <svg
                className="w-3 h-3"
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
              Voltar ao Início
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default StaffAuth;

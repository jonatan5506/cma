'use client';

import * as React from 'react';
const { useState, useEffect } = React;
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, UserRole } from '../../types';
import { CLINIC_NAME } from '../../constants';

const PatientAuth: React.FC = () => {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    cpf: '',
    birthDate: '',
    whatsapp: '',
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem('cma_user');
    if (savedUser) {
      router.push('/dashboard');
    }
  }, [router]);

  const onLogin = (userData: User) => {
    localStorage.setItem('cma_user', JSON.stringify(userData));
    router.push('/dashboard');
    router.refresh();
  };

  const handleTestAccess = () => {
    const mockUser: User = {
      id: 'patient-test-123',
      name: 'João Silva',
      username: 'joao.paciente',
      role: UserRole.PATIENT,
      cpf: '123.456.789-00',
      birthDate: '1990-01-01',
      whatsapp: '(21) 98888-7777',
    };
    onLogin(mockUser);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'Paciente Teste',
      username: formData.username,
      role: UserRole.PATIENT,
      cpf: formData.cpf,
      birthDate: formData.birthDate,
      whatsapp: formData.whatsapp,
    };
    onLogin(mockUser);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9] p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sky-200/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-200/20 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="max-w-md w-full flex flex-col gap-6 relative z-10 animate-slide-up">
        <div className="bg-white/40 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-xl text-center">
          <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest mb-3">
            Acesso Rápido para Teste
          </p>
          <button
            onClick={handleTestAccess}
            className="w-full bg-white/80 hover:bg-white p-4 rounded-2xl flex items-center justify-between group transition-all"
          >
            <div className="text-left">
              <p className="text-sm font-black text-gray-800">
                João Silva (Paciente)
              </p>
              <p className="text-xs text-gray-500">
                login: joao.paciente / senha: 123456
              </p>
            </div>
            <span className="text-sky-500 font-bold text-xs group-hover:translate-x-1 transition-transform">
              ENTRAR →
            </span>
          </button>
        </div>

        <div className="bg-white/70 backdrop-blur-3xl rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-10 border border-white group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>

          <div className="text-center mb-10">
            <div className="inline-flex w-20 h-20 bg-gradient-to-br from-sky-600 to-sky-400 rounded-3xl items-center justify-center text-white font-black text-3xl shadow-2xl shadow-sky-500/30 mb-6 relative">
              <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-20"></div>
              C
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">
              {isSignUp ? 'Nova Conta' : 'Portal do Paciente'}
            </h2>
            <p className="text-sky-500 font-bold text-[10px] uppercase tracking-[0.2em]">
              {CLINIC_NAME}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="animate-fade-in space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-gray-50/50 border-2 border-transparent focus:border-sky-100 focus:bg-white rounded-2xl p-4 text-sm font-bold transition-all outline-none"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                      CPF
                    </label>
                    <input
                      type="text"
                      placeholder="000.000.000-00"
                      required
                      className="w-full bg-gray-50/50 border-2 border-transparent focus:border-sky-100 focus:bg-white rounded-2xl p-4 text-sm font-bold transition-all outline-none"
                      value={formData.cpf}
                      onChange={(e) =>
                        setFormData({ ...formData, cpf: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                      Nascimento
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full bg-gray-50/50 border-2 border-transparent focus:border-sky-100 focus:bg-white rounded-2xl p-4 text-sm font-bold transition-all outline-none"
                      value={formData.birthDate}
                      onChange={(e) =>
                        setFormData({ ...formData, birthDate: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="(21) 99999-9999"
                    required
                    className="w-full bg-gray-50/50 border-2 border-transparent focus:border-sky-100 focus:bg-white rounded-2xl p-4 text-sm font-bold transition-all outline-none"
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                Usuário (Login)
              </label>
              <input
                type="text"
                required
                placeholder="seu.usuario"
                className="w-full bg-gray-50/50 border-2 border-transparent focus:border-sky-100 focus:bg-white rounded-2xl p-4 text-sm font-bold transition-all outline-none"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                Senha
              </label>
              <input
                type="password"
                required
                className="w-full bg-gray-50/50 border-2 border-transparent focus:border-sky-100 focus:bg-white rounded-2xl p-4 text-sm font-bold transition-all outline-none"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full relative group/btn overflow-hidden bg-sky-600 text-white py-5 rounded-2xl font-black text-sm shadow-2xl shadow-sky-500/30 hover:bg-sky-500 transition-all active:scale-95 mt-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer"></div>
              {isSignUp ? 'FINALIZAR CADASTRO' : 'ENTRAR NO PORTAL'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-black text-sky-600 hover:text-sky-700 uppercase tracking-widest transition-colors"
            >
              {isSignUp
                ? 'Já possui conta? Acessar'
                : 'Não tem conta? Cadastrar-se'}
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <Link
              href="/"
              className="text-[10px] font-black text-gray-400 hover:text-gray-900 uppercase tracking-[0.3em] transition-all"
            >
              ← VOLTAR PARA HOME
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .group-hover\\:animate-shimmer { animation: shimmer 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default PatientAuth;

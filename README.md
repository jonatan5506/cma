# Centro Médico Avançado (CMA) - Portal do Paciente & ERP Clínico

Este projeto é uma plataforma integrada de gestão para o **Centro Médico Avançado (CMA)**, projetada para oferecer uma experiência premium tanto para pacientes quanto para a equipe administrativa.

## 🚀 Migração Recente: Vite → Next.js

O projeto foi recentemente migrado de uma arquitetura baseada em Vite para **Next.js (App Router)**. Esta mudança traz benefícios significativos:

- **SEO Aprimorado**: Renderização otimizada para buscadores.
- **Performance**: Divisão de código automática e otimização de ativos.
- **Preparado para Nuvem**: Configurado para fácil deploy em plataformas como Vercel.

## 🛠️ Tecnologias Utilizadas

- **Next.js**: Framework React para produção.
- **TypeScript**: Tipagem estática para robustez e segurança de código.
- **Tailwind CSS**: Estilização dinâmica e moderna com foco em performance visual.
- **React Hooks**: Gestão de estado e efeitos (Client-side functionality).
- **LocalStorage**: Persistência de preferências de usuário, temas e sessões de login no navegador.

## 📂 Estrutura de Pastas Principal

- `app/`: Contém as rotas e componentes do App Router do Next.js.
  - `(home)/page.tsx`: Landing Page institucional.
  - `entrar/`: Portal de autenticação do paciente.
  - `dashboard/`: Área exclusiva do paciente (Consultas e Documentos).
  - `agendar/`: Sistema de agendamento em múltiplas etapas.
  - `staff/login/`: Acesso administrativo.
  - `staff/dashboard/`: ERP Clínico (Financeiro, Escala Médica, Gestão).
- `legacy_vite/`: Arquivos originais da versão Vite (mantidos para referência).
- `types.ts` & `constants.tsx`: Definições globais de dados e tipagem.

## ⚙️ Como Executar Localmente

1. **Instale as dependências**:

   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento**:

   ```bash
   npm run dev
   ```

   Acesse em [http://localhost:3000](http://localhost:3000)

3. **Build de Produção**:
   ```bash
   npm run build
   npm run start
   ```

## 🏥 Funcionalidades Principais

- **Portal do Paciente**: Agendamento intuitivo, visualização de exames e histórico.
- **ERP Administrativo**: Controle financeiro com gráficos, gestão de escala de plantão e base de dados de pacientes.
- **Design Adaptativo**: Interface moderna com suporte total a Dark Mode e temas personalizáveis para a equipe.
- **Identidade Visual**: Design focado em "Wow factor", com micro-animações e estética premium.

---

Desenvolvido para o **Centro Médico Avançado**.

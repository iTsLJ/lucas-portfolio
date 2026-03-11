import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const resources = {
  en: {
    translation: {
      menu: {
        file: "File",
        edit: "Edit",
        view: "View",
        window: "Window",
        help: "Help",
        language: "Language",
      },

      terminal: {
        welcome:
          "Welcome to Dev_OS v2.4.0 (Darwin Kernel Version 23.0.0).",
        lastLogin: "Last login:",
        typeHelp:
          "Type 'help' to see available commands or click files in the sidebar.",
        commandNotFound: "Command not found:",
        typeHelpHint: "Type 'help' for available commands.",
      },

      commands: {
        help: `Available commands:
  help          Show help
  about         About Lucas
  projects      List projects
  skills        Show skills
  contact       Contact info
        resume        Download resume (PDF)
  clear         Clear terminal
  whoami        Display current user`,

        about: `Lucas Ferreira — Software Engineer.

Software Engineering student passionate about building scalable systems and clean architectures.

Experience with:
• Java & Spring Boot for backend development
• C# & .NET for backend and enterprise applications
• React and Angular for modern web interfaces
• SQL and relational databases
• REST APIs and distributed systems

Recent project:
GetRoute — A route management system for a mattress delivery company, built with Spring Boot, React and Google Maps API to optimize delivery routes.

Focused on writing clean code, solving real-world problems and continuously improving as a developer.`,

        projects: `Projects:

→ terminalPortfolio-macOS
Interactive developer portfolio inspired by the macOS terminal.
Built with React, Vite and Tailwind. Simulates a command-line environment with custom commands and a virtual file system.

→ devOS
Experimental web operating system interface.
A desktop-like environment running in the browser with apps, window management and terminal integration.

→ GetRoute
Route management system for a mattress delivery company.
Built with Spring Boot (backend) and React (frontend), integrated with Google Maps API to calculate optimized delivery routes.

→ Excel Data Extractor
Tool for extracting and processing structured data from Excel files, transforming them into usable formats for systems and databases.`,

        contact: `Email: lucas@example.com
GitHub: github.com/lucasferreira
LinkedIn: linkedin.com/in/lucasferreira`,

        resume:
          "Downloading resume... If it does not start automatically, open /resume.pdf.",

        whoami:
          "lucas — Dev_OS v2.4.0 (Darwin Kernel Version 23.0.0)",
      },

      sidebar: {
        favorites: "FAVORITES",
        projectFiles: "PROJECT FILES",
      },
    },
  },

  pt: {
    translation: {
      menu: {
        file: "Arquivo",
        edit: "Editar",
        view: "Visualizar",
        window: "Janela",
        help: "Ajuda",
        language: "Idioma",
      },

      terminal: {
        welcome:
          "Bem-vindo ao Dev_OS v2.4.0 (Darwin Kernel Version 23.0.0).",
        lastLogin: "Último login:",
        typeHelp:
          "Digite 'help' para ver os comandos disponíveis ou clique nos arquivos na barra lateral.",
        commandNotFound: "Comando não reconhecido:",
        typeHelpHint: "Digite 'help' para ver os comandos.",
      },

      commands: {
        help: `Comandos disponíveis:
  help          Mostrar ajuda
  about         Sobre o Lucas
  projects      Listar projetos
  skills        Mostrar habilidades
  contact       Contato
        resume        Baixar currículo (PDF)
  clear         Limpar terminal
  whoami        Mostrar usuário`,

        about: `Lucas Ferreira — Engenheiro de Software.

Estudante de Engenharia de Software apaixonado por construir sistemas escaláveis e arquiteturas limpas.

Experiência com:
• Java & Spring Boot para desenvolvimento backend
• C# & .NET para desenvolvimento backend e aplicações corporativas
• React e Angular para interfaces web modernas
• SQL e bancos de dados relacionais
• APIs REST e sistemas distribuídos

Projeto recente:
GetRoute — Sistema de gerenciamento de rotas para uma empresa de entrega de colchões, desenvolvido com Spring Boot, React e Google Maps API para otimizar entregas.

Focado em escrever código limpo, resolver problemas reais e evoluir continuamente como desenvolvedor.`,

        projects: `Projetos:

→ terminalPortfolio-macOS
Portfólio interativo inspirado no terminal do macOS.
Construído com React, Vite e Tailwind, simulando um ambiente de linha de comando com comandos personalizados e sistema de arquivos virtual.

→ devOS
Interface experimental de sistema operacional rodando no navegador.
Ambiente estilo desktop com aplicativos, gerenciamento de janelas e terminal integrado.

→ GetRoute
Sistema de gerenciamento de rotas para uma empresa de entrega de colchões.
Desenvolvido com Spring Boot no backend e React no frontend, utilizando a API do Google Maps para calcular rotas de entrega otimizadas.

→ Excel Data Extractor
Ferramenta para extração e processamento de dados estruturados de arquivos Excel, transformando-os em formatos utilizáveis para sistemas e bancos de dados.`,

        contact: `Email: lucas@example.com
GitHub: github.com/lucasferreira
LinkedIn: linkedin.com/in/lucasferreira`,

        resume:
          "Baixando currículo... Se não iniciar automaticamente, abra /resume.pdf.",

        whoami:
          "lucas — Dev_OS v2.4.0 (Darwin Kernel Version 23.0.0)",
      },

      sidebar: {
        favorites: "FAVORITOS",
        projectFiles: "ARQUIVOS DO PROJETO",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

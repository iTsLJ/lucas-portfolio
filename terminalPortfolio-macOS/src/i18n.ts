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

      safari: {
        address: "typing-race.lucas.dev",
        challenge: "Typing Speed Challenge",
        kicker:  "Typing Challenge",
        title: "Race your typing against Lucas",
        subtitle:
          "The race ends when someone finishes the sentence or when time runs out.",
        timeLeft: "Time left",
        you: "You",
        charsProgress: "{{correct}}/{{total}} chars",
        fixedRival: "Fixed rival",
        roundText: "Round sentence",
        roundHint: "Copy the exact text below to win.",
        reset: "Reset",
        newText: "New sentence",
        placeholder: "Click here and start typing to begin the race.",
        stats: "Your stats",
        accuracy: "Accuracy",
        characters: "Characters",
        howItWorks: "How it works",
        steps: {
          1: "1. The race starts when you type your first character.",
          2: "2. Lucas races at a constant {{wpm}} WPM.",
          3: "3. The winner is whoever finishes first or leads when time reaches zero.",
        },
        goal: {
          title: "Target to win",
          description:
            "To beat Lucas with margin, keep your pace above his average and avoid early typing mistakes.",
        },
        result: {
          title: "Result",
          idle: "Start typing to begin the race.",
          player: "You beat Lucas.",
          lucas: "Lucas won this race.",
          draw: "Technical draw.",
        },
        raceTexts: [
          "Building useful products means balancing speed, quality, and clear communication every single day.",
          "Frontend interfaces should feel fast, readable, and intentional even when the interaction looks simple.",
          "Clean architecture matters because maintainable systems survive change better than rushed implementations.",
          "Good developers do not only write code, they reduce complexity and make decisions easy to understand.",
        ],
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

      safari: {
        address: "typing-race.lucas.dev",
        challenge: "Desafio de Velocidade de Digitação",
        kicker: "Desafio no Digitação",
        title: "Dispute sua digitação contra o Lucas",
        subtitle:
          "A corrida termina quando alguem completa a frase ou quando o tempo acaba.",
        timeLeft: "Tempo restante",
        you: "Você",
        charsProgress: "{{correct}}/{{total}} caracteres",
        fixedRival: "Rival fixo",
        roundText: "Frase da rodada",
        roundHint: "Copie exatamente o texto abaixo para ganhar.",
        reset: "Reiniciar",
        newText: "Nova frase",
        placeholder: "Clique aqui e comece a digitar para iniciar a corrida.",
        stats: "Seus numeros",
        accuracy: "Precisao",
        characters: "Caracteres",
        howItWorks: "Como funciona",
        steps: {
          1: "1. A corrida comeca quando voce digita o primeiro caractere.",
          2: "2. Lucas corre em ritmo constante de {{wpm}} WPM.",
          3: "3. O vencedor e quem termina a frase primeiro ou lidera quando o tempo zera.",
        },
        goal: {
          title: "Meta para vencer",
          description:
            "Para passar o Lucas com folga, tente manter o ritmo acima da media dele e evite erros no inicio da frase.",
        },
        result: {
          title: "Resultado",
          idle: "Digite para iniciar a corrida.",
          player: "Voce venceu o Lucas.",
          lucas: "Lucas venceu essa disputa.",
          draw: "Empate tecnico.",
        },
        raceTexts: [
          "Construir produtos uteis exige equilibrar velocidade, qualidade e comunicacao clara todos os dias.",
          "Interfaces frontend devem ser rapidas, legiveis e intencionais mesmo quando a interacao parece simples.",
          "Arquitetura limpa importa porque sistemas faceis de manter sobrevivem melhor as mudancas do que implementacoes apressadas.",
          "Bons desenvolvedores nao apenas escrevem codigo, eles reduzem complexidade e tornam decisoes mais faceis de entender.",
        ],
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

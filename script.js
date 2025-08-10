document.addEventListener('DOMContentLoaded', function() {
    // Controles de acessibilidade
    const themeToggle = document.getElementById('theme-toggle');
    const fontIncrease = document.getElementById('font-increase');
    const fontDecrease = document.getElementById('font-decrease');
    const highContrast = document.getElementById('high-contrast');
    const body = document.body;
    const html = document.documentElement;
    
    // Alternar tema claro/escuro
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Atualizar ícone do botão
        const icon = this.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    });
    
    // Aumentar fonte
    fontIncrease.addEventListener('click', function() {
        const currentSize = parseFloat(getComputedStyle(html).fontSize);
        html.style.fontSize = (currentSize + 1) + 'px';
    });
    
    // Diminuir fonte
    fontDecrease.addEventListener('click', function() {
        const currentSize = parseFloat(getComputedStyle(html).fontSize);
        if (currentSize > 12) {
            html.style.fontSize = (currentSize - 1) + 'px';
        }
    });
    
    // Alto contraste
    highContrast.addEventListener('click', function() {
        body.classList.toggle('high-contrast');
        const isHighContrast = body.classList.contains('high-contrast');
        localStorage.setItem('highContrast', isHighContrast);
        
        // Atualizar ícone
        const icon = this.querySelector('i');
        icon.style.color = isHighContrast ? 'yellow' : '';
    });
    
    // Aplicar preferências salvas
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    
    if (savedTheme === 'light') {
        const icon = themeToggle.querySelector('i');
        icon.className = 'fas fa-sun';
    }
    
    if (localStorage.getItem('highContrast') === 'true') {
        body.classList.add('high-contrast');
    }
    
    // Cria partículas flutuantes
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            const duration = Math.random() * 20 + 10;
            particle.style.animation = `float ${duration}s linear infinite`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Adiciona animação de flutuação
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 1;
            }
            50% {
                transform: translateY(-100px) translateX(20px);
                opacity: 0.5;
            }
            100% {
                transform: translateY(-200px) translateX(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Terminal interativo
    const commandInput = document.getElementById('command-input');
    const commandOutput = document.getElementById('command-output');
    const commandHistory = document.getElementById('command-history');
    const contentDiv = document.getElementById('content');
    
    const commands = {
        help: {
            description: "Mostra todos os comandos disponíveis",
            execute: () => {
                let output = '<span class="info">Comandos disponíveis:</span><br><br>';
                for (const cmd in commands) {
                    output += `<span class="success">${cmd}</span> - ${commands[cmd].description}<br>`;
                }
                return output;
            }
        },
        site: {
            description: "Abre o site da Feira Digital",
            execute: () => {
                setTimeout(() => {
                    window.open('https://annajulyapontes.github.io/agrinhoAnna2025/', '_blank');
                }, 1000);
                return '<span class="success">Redirecionando para o site da Feira Digital...</span>';
            }
        },
        produtos: {
            description: "Lista os produtos disponíveis",
            execute: () => {
                return `<span class="info">Produtos disponíveis:</span><br>
                - Frutas frescas (maçã, banana, laranja, morango)<br>
                - Legumes (cenoura, batata, abobrinha, berinjela)<br>
                - Verduras (alface, couve, rúcula, espinafre)<br>
                - Produtos orgânicos<br><br>
                Digite <span class="success">'site'</span> para acessar e comprar.`;
            }
        },
        contato: {
            description: "Mostra informações de contato",
            execute: () => {
                return `<span class="info">Informações de contato:</span><br>
                - Email: contato@rafael.assis.santos@escola.pr.gov.br<br>
                - Telefone: (43) 996561825<br>
                - Endereço: Rua dos Agricultores, 123 - Rio Branco do Ivaí Pr`;
            }
        },
        clear: {
            description: "Limpa o terminal",
            execute: () => {
                commandOutput.innerHTML = '';
                commandHistory.innerHTML = '';
                return '';
            }
        },
        sobre: {
            description: "Mostra informações sobre o projeto",
            execute: () => {
                return `<span class="info">Sobre o projeto:</span><br>
                Plataforma que conecta pequenos agricultores locais aos consumidores,<br>
                facilitando a venda de produtos frescos diretamente do produtor.<br>
                <br>
                Objetivos:<br>
                - Fortalecer a economia local<br>
                - Reduzir desperdícios<br>
                - Oferecer alimentos saudáveis com justiça social`;
            }
        },
        acessibilidade: {
            description: "Mostra comandos de acessibilidade",
            execute: () => {
                return `<span class="info">Comandos de acessibilidade:</span><br>
                - Use os botões na parte superior para:<br>
                &nbsp;&nbsp;* Alternar entre temas claro/escuro<br>
                &nbsp;&nbsp;* Aumentar/diminuir tamanho da fonte<br>
                &nbsp;&nbsp;* Ativar modo alto contraste<br>
                - Pressione Tab para navegar pelos elementos<br>
                - Use Ctrl + ou Ctrl - para zoom`;
            }
        }
    };
    
    // Funções para os botões de controle
    function minimizeTerminal() {
        contentDiv.style.display = contentDiv.style.display === 'none' ? 'block' : 'none';
    }
    
    function maximizeTerminal() {
        const container = document.querySelector('.container');
        if (container.style.width === '100%') {
            container.style.width = '90%';
            container.style.maxWidth = '900px';
            container.style.margin = '20px 0';
            container.style.borderRadius = '15px';
        } else {
            container.style.width = '100%';
            container.style.maxWidth = '100%';
            container.style.margin = '0';
            container.style.borderRadius = '0';
        }
    }
    
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim().toLowerCase();
            commandInput.value = '';
            
            // Adiciona o comando ao histórico
            const commandElement = document.createElement('div');
            commandElement.className = 'command-history-item';
            commandElement.innerHTML = `<span class="prompt-text">user@feiradigital:~$</span> ${command}`;
            commandHistory.appendChild(commandElement);
            
            // Processa o comando
            let output = '';
            if (commands[command]) {
                output = commands[command].execute();
            } else if (command) {
                output = `<span class="error">Comando não encontrado: ${command}</span><br>Digite <span class="success">'help'</span> para ver os comandos disponíveis.`;
            }
            
            if (output) {
                const outputElement = document.createElement('div');
                outputElement.className = 'command-output';
                outputElement.innerHTML = output;
                commandOutput.appendChild(outputElement);
            }
            
            // Rolagem automática
            contentDiv.scrollTop = contentDiv.scrollHeight;
            commandOutput.scrollTop = commandOutput.scrollHeight;
        }
    });
    
    // Inicializa as partículas
    createParticles();
    
    // Foca no input ao carregar a página
    window.addEventListener('load', () => {
        commandInput.focus();
    });
});
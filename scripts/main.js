// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SLIDER AUTOMÁTICO =====
    class HeroSlider {
        constructor() {
            this.slides = document.querySelectorAll('.slide');
            this.dots = document.querySelectorAll('.dot');
            this.prevBtn = document.querySelector('.slider-btn.prev');
            this.nextBtn = document.querySelector('.slider-btn.next');
            this.currentSlide = 0;
            this.slideInterval = null;
            
            this.init();
        }
        
        init() {
            // Event listeners para os botões
            this.prevBtn.addEventListener('click', () => this.prevSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
            
            // Event listeners para os dots
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });
            
            // Inicia o slider automático
            this.startAutoSlide();
            
            // Pausa o slider quando o mouse está sobre ele
            const slider = document.querySelector('.hero-slider');
            slider.addEventListener('mouseenter', () => this.stopAutoSlide());
            slider.addEventListener('mouseleave', () => this.startAutoSlide());
        }
        
        showSlide(index) {
            // Remove a classe active de todos os slides e dots
            this.slides.forEach(slide => slide.classList.remove('active'));
            this.dots.forEach(dot => dot.classList.remove('active'));
            
            // Adiciona a classe active ao slide e dot atual
            this.slides[index].classList.add('active');
            this.dots[index].classList.add('active');
            
            this.currentSlide = index;
        }
        
        nextSlide() {
            const nextIndex = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(nextIndex);
        }
        
        prevSlide() {
            const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.showSlide(prevIndex);
        }
        
        goToSlide(index) {
            this.showSlide(index);
        }
        
        startAutoSlide() {
            this.slideInterval = setInterval(() => {
                this.nextSlide();
            }, 5000); // Muda slide a cada 5 segundos
        }
        
        stopAutoSlide() {
            if (this.slideInterval) {
                clearInterval(this.slideInterval);
            }
        }
    }
    
    // ===== MENU MOBILE =====
    class MobileMenu {
        constructor() {
            this.menuToggle = document.querySelector('.mobile-menu-toggle');
            this.nav = document.querySelector('.nav');
            this.isOpen = false;
            
            this.init();
        }
        
        init() {
            this.menuToggle.addEventListener('click', () => this.toggleMenu());
            
            // Fecha o menu quando clica em um link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
        }
        
        toggleMenu() {
            this.isOpen = !this.isOpen;
            
            if (this.isOpen) {
                this.nav.style.display = 'block';
                this.nav.style.position = 'absolute';
                this.nav.style.top = '100%';
                this.nav.style.left = '0';
                this.nav.style.right = '0';
                this.nav.style.background = '#2C2C2C';
                this.nav.style.padding = '1rem';
                this.nav.style.borderRadius = '0 0 10px 10px';
                this.nav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
                
                // Anima o menu
                this.nav.style.opacity = '0';
                this.nav.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    this.nav.style.opacity = '1';
                    this.nav.style.transform = 'translateY(0)';
                    this.nav.style.transition = 'all 0.3s ease';
                }, 10);
            } else {
                this.closeMenu();
            }
        }
        
        closeMenu() {
            this.isOpen = false;
            this.nav.style.display = 'none';
        }
    }
    
    // ===== ANIMAÇÕES DE SCROLL =====
    class ScrollAnimations {
        constructor() {
            this.observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            this.init();
        }
        
        init() {
            // Cria o observer
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, this.observerOptions);
            
            // Observa os elementos que devem ser animados
            const animatedElements = document.querySelectorAll('.game-card, .promo-card, .section-title');
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.6s ease';
                this.observer.observe(el);
            });
        }
    }
    
    // ===== EFEITOS DE HOVER =====
    class HoverEffects {
        constructor() {
            this.init();
        }
        
        init() {
            // Efeito de hover nos cards de jogos
            const gameCards = document.querySelectorAll('.game-card');
            gameCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1)';
                });
            });
            
            // Efeito de hover nos botões
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(btn => {
                btn.addEventListener('mouseenter', () => {
                    btn.style.transform = 'translateY(-2px)';
                });
                
                btn.addEventListener('mouseleave', () => {
                    btn.style.transform = 'translateY(0)';
                });
            });
            
            // Efeito de hover nos links de navegação
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    link.style.color = '#FF4B00';
                    link.style.transform = 'translateY(-2px)';
                });
                
                link.addEventListener('mouseleave', () => {
                    if (!link.classList.contains('active')) {
                        link.style.color = '#ffffff';
                    }
                    link.style.transform = 'translateY(0)';
                });
            });
        }
    }
    
    // ===== SMOOTH SCROLL =====
    class SmoothScroll {
        constructor() {
            this.init();
        }
        
        init() {
            // Adiciona smooth scroll para links internos
            const links = document.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    }
    
    // ===== HEADER SCROLL EFFECT =====
    class HeaderScrollEffect {
        constructor() {
            this.header = document.querySelector('.header');
            this.lastScrollY = window.scrollY;
            
            this.init();
        }
        
        init() {
            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY > 100) {
                    this.header.style.background = 'rgba(28, 28, 28, 0.98)';
                    this.header.style.backdropFilter = 'blur(15px)';
                } else {
                    this.header.style.background = 'rgba(28, 28, 28, 0.95)';
                    this.header.style.backdropFilter = 'blur(10px)';
                }
                
                // Esconde/mostra header baseado na direção do scroll
                if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
                    this.header.style.transform = 'translateY(-100%)';
                } else {
                    this.header.style.transform = 'translateY(0)';
                }
                
                this.lastScrollY = currentScrollY;
            });
        }
    }
    
    // ===== LOADING ANIMATION =====
    class LoadingAnimation {
        constructor() {
            this.init();
        }
        
        init() {
            // Adiciona uma animação de loading simples
            window.addEventListener('load', () => {
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    document.body.style.opacity = '1';
                }, 100);
            });
        }
    }
    
    // ===== COUNTER ANIMATION =====
    class CounterAnimation {
        constructor() {
            this.init();
        }
        
        init() {
            // Anima números quando aparecem na tela
            const counters = document.querySelectorAll('[data-counter]');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            counters.forEach(counter => observer.observe(counter));
        }
        
        animateCounter(element) {
            const target = parseInt(element.getAttribute('data-counter'));
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        }
    }
    
    // ===== PARALLAX EFFECT =====
    class ParallaxEffect {
        constructor() {
            this.init();
        }
        
        init() {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.slide-bg');
                
                parallaxElements.forEach(element => {
                    const speed = 0.5;
                    element.style.transform = `translateY(${scrolled * speed}px)`;
                });
            });
        }
    }
    
    // ===== MODAL SYSTEM =====
    class ModalSystem {
        constructor() {
            this.currentModal = null;
            this.init();
        }
        
        init() {
            // Adiciona event listeners para botões de login e cadastro
            const loginBtns = document.querySelectorAll('.btn-outline');
            const registerBtns = document.querySelectorAll('.btn-primary');
            
            loginBtns.forEach(btn => {
                if (btn.textContent.includes('Login') || btn.textContent.includes('Entrar')) {
                    btn.addEventListener('click', () => this.showModal('login'));
                }
            });
            
            registerBtns.forEach(btn => {
                if (btn.textContent.includes('Cadastrar') || btn.textContent.includes('Cadastro')) {
                    btn.addEventListener('click', () => this.showModal('register'));
                }
            });
        }
        
        showModal(type) {
            // Remove modal existente se houver
            if (this.currentModal) {
                this.closeModal(this.currentModal);
            }
            
            // Cria modal dinamicamente
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = this.getModalHTML(type);
            
            // Adiciona ao DOM
            document.body.appendChild(modal);
            this.currentModal = modal;
            
            // Anima a entrada
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // Event listeners
            this.setupModalEvents(modal, type);
            
            // Foco no primeiro input
            const firstInput = modal.querySelector('.form-input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 300);
            }
        }
        
        getModalHTML(type) {
            const isLogin = type === 'login';
            
            return `
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="modal-close" type="button">
                            <i class="fas fa-times"></i>
                        </button>
                        <h2>
                            <i class="fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'}"></i>
                            ${isLogin ? 'Entrar na Conta' : 'Criar Conta'}
                        </h2>
                    </div>
                    
                    <div class="modal-body">
                        <form class="modal-form" id="authForm">
                            <div class="form-group">
                                <label for="email">
                                    <i class="fas fa-envelope"></i> Email
                                </label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    class="form-input" 
                                    placeholder="Digite seu email"
                                    required
                                >
                                <div class="form-error">Email inválido</div>
                            </div>
                            
                            <div class="form-group">
                                <label for="password">
                                    <i class="fas fa-lock"></i> Senha
                                </label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    class="form-input" 
                                    placeholder="Digite sua senha"
                                    required
                                >
                                <div class="form-error">Senha deve ter pelo menos 6 caracteres</div>
                                ${!isLogin ? `
                                    <div class="password-strength">
                                        <div class="password-strength-bar"></div>
                                    </div>
                                ` : ''}
                            </div>
                            
                            ${!isLogin ? `
                                <div class="form-group">
                                    <label for="confirmPassword">
                                        <i class="fas fa-lock"></i> Confirmar Senha
                                    </label>
                                    <input 
                                        type="password" 
                                        id="confirmPassword" 
                                        class="form-input" 
                                        placeholder="Confirme sua senha"
                                        required
                                    >
                                    <div class="form-error">Senhas não coincidem</div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="fullName">
                                        <i class="fas fa-user"></i> Nome Completo
                                    </label>
                                    <input 
                                        type="text" 
                                        id="fullName" 
                                        class="form-input" 
                                        placeholder="Digite seu nome completo"
                                        required
                                    >
                                    <div class="form-error">Nome é obrigatório</div>
                                </div>
                            ` : ''}
                            
                            ${isLogin ? `
                                <div class="form-options">
                                    <div class="remember-me">
                                        <input type="checkbox" id="rememberMe">
                                        <label for="rememberMe">Lembrar-me</label>
                                    </div>
                                    <a href="#" class="forgot-password">Esqueci a senha</a>
                                </div>
                            ` : ''}
                            
                            <button type="submit" class="modal-submit">
                                <i class="fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'}"></i>
                                ${isLogin ? 'Entrar' : 'Criar Conta'}
                            </button>
                        </form>
                    </div>
                    
                    <div class="modal-footer">
                        <p>
                            ${isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                            <a href="#" class="switch-modal">
                                ${isLogin ? 'Cadastre-se aqui' : 'Faça login aqui'}
                            </a>
                        </p>
                    </div>
                </div>
            `;
        }
        
        setupModalEvents(modal, type) {
            const closeBtn = modal.querySelector('.modal-close');
            const form = modal.querySelector('#authForm');
            const switchLink = modal.querySelector('.switch-modal');
            
            // Fechar modal
            closeBtn.addEventListener('click', () => this.closeModal(modal));
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
            
            // Previne fechamento ao clicar no conteúdo
            const modalContent = modal.querySelector('.modal-content');
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
            
            // Alternar entre login e cadastro
            switchLink.addEventListener('click', (e) => {
                e.preventDefault();
                const newType = type === 'login' ? 'register' : 'login';
                this.closeModal(modal);
                setTimeout(() => this.showModal(newType), 300);
            });
            
            // Validação de formulário
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form, type);
            });
            
            // Validação em tempo real
            this.setupRealTimeValidation(modal, type);
            
            // Fechar com ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('show')) {
                    this.closeModal(modal);
                }
            });
        }
        
        setupRealTimeValidation(modal, type) {
            const emailInput = modal.querySelector('#email');
            const passwordInput = modal.querySelector('#password');
            const confirmPasswordInput = modal.querySelector('#confirmPassword');
            const fullNameInput = modal.querySelector('#fullName');
            
            // Validação de email
            emailInput.addEventListener('input', () => {
                this.validateEmail(emailInput);
            });
            
            // Validação de senha
            passwordInput.addEventListener('input', () => {
                this.validatePassword(passwordInput);
                if (type === 'register' && confirmPasswordInput.value) {
                    this.validatePasswordMatch(passwordInput, confirmPasswordInput);
                }
            });
            
            // Validação de confirmação de senha
            if (confirmPasswordInput) {
                confirmPasswordInput.addEventListener('input', () => {
                    this.validatePasswordMatch(passwordInput, confirmPasswordInput);
                });
            }
            
            // Validação de nome
            if (fullNameInput) {
                fullNameInput.addEventListener('input', () => {
                    this.validateFullName(fullNameInput);
                });
            }
        }
        
        validateEmail(input) {
            const email = input.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const formGroup = input.closest('.form-group');
            
            if (email && !emailRegex.test(email)) {
                this.showFieldError(formGroup, 'Email inválido');
                return false;
            } else {
                this.showFieldSuccess(formGroup);
                return true;
            }
        }
        
        validatePassword(input) {
            const password = input.value;
            const formGroup = input.closest('.form-group');
            
            if (password && password.length < 6) {
                this.showFieldError(formGroup, 'Senha deve ter pelo menos 6 caracteres');
                return false;
            } else {
                this.showFieldSuccess(formGroup);
                this.updatePasswordStrength(input);
                return true;
            }
        }
        
        validatePasswordMatch(passwordInput, confirmInput) {
            const password = passwordInput.value;
            const confirmPassword = confirmInput.value;
            const formGroup = confirmInput.closest('.form-group');
            
            if (confirmPassword && password !== confirmPassword) {
                this.showFieldError(formGroup, 'Senhas não coincidem');
                return false;
            } else if (confirmPassword) {
                this.showFieldSuccess(formGroup);
                return true;
            }
        }
        
        validateFullName(input) {
            const name = input.value.trim();
            const formGroup = input.closest('.form-group');
            
            if (name && name.length < 2) {
                this.showFieldError(formGroup, 'Nome deve ter pelo menos 2 caracteres');
                return false;
            } else if (name) {
                this.showFieldSuccess(formGroup);
                return true;
            }
        }
        
        updatePasswordStrength(input) {
            const password = input.value;
            const strengthBar = input.parentElement.querySelector('.password-strength');
            
            if (!strengthBar) return;
            
            let strength = 0;
            if (password.length >= 6) strength++;
            if (password.match(/[a-z]/)) strength++;
            if (password.match(/[A-Z]/)) strength++;
            if (password.match(/[0-9]/)) strength++;
            if (password.match(/[^a-zA-Z0-9]/)) strength++;
            
            strengthBar.className = 'password-strength';
            if (strength <= 1) strengthBar.classList.add('weak');
            else if (strength <= 2) strengthBar.classList.add('medium');
            else if (strength <= 3) strengthBar.classList.add('strong');
            else strengthBar.classList.add('very-strong');
        }
        
        showFieldError(formGroup, message) {
            formGroup.classList.remove('success');
            formGroup.classList.add('error');
            const errorElement = formGroup.querySelector('.form-error');
            if (errorElement) {
                errorElement.textContent = message;
            }
        }
        
        showFieldSuccess(formGroup) {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
        }
        
        handleFormSubmit(form, type) {
            const formData = new FormData(form);
            const email = form.querySelector('#email').value;
            const password = form.querySelector('#password').value;
            const confirmPassword = form.querySelector('#confirmPassword')?.value;
            const fullName = form.querySelector('#fullName')?.value;
            
            // Validação final
            let isValid = true;
            
            if (!this.validateEmail(form.querySelector('#email'))) isValid = false;
            if (!this.validatePassword(form.querySelector('#password'))) isValid = false;
            
            if (type === 'register') {
                if (confirmPassword && !this.validatePasswordMatch(form.querySelector('#password'), form.querySelector('#confirmPassword'))) {
                    isValid = false;
                }
                if (fullName && !this.validateFullName(form.querySelector('#fullName'))) {
                    isValid = false;
                }
            }
            
            if (!isValid) {
                this.showNotification('Por favor, corrija os erros no formulário', 'error');
                return;
            }
            
            // Simula envio do formulário
            const submitBtn = form.querySelector('.modal-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                if (type === 'register') {
                    // Para cadastro, mostrar mensagem de boas-vindas
                    const userData = {
                        fullName: form.querySelector('#fullName').value,
                        email: form.querySelector('#email').value
                    };
                    
                    this.closeModal(this.currentModal);
                    setTimeout(() => {
                        showWelcomeMessage(userData);
                    }, 300);
                } else {
                    // Para login, mostrar notificação normal
                    this.showNotification('Login realizado com sucesso!', 'success');
                    setTimeout(() => {
                        this.closeModal(this.currentModal);
                    }, 1500);
                }
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
        
        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            `;
            
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#00aa44' : type === 'error' ? '#ff4444' : '#FF4B00'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                z-index: 10001;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 10);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 4000);
        }
        
        closeModal(modal) {
            modal.classList.remove('show');
            
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
                this.currentModal = null;
            }, 300);
        }
    }
    
    // ===== INICIALIZAÇÃO =====
    // Inicializa todas as classes
    new HeroSlider();
    new MobileMenu();
    new ScrollAnimations();
    new HoverEffects();
    new SmoothScroll();
    new HeaderScrollEffect();
    new LoadingAnimation();
    new CounterAnimation();
    new ParallaxEffect();
    new ModalSystem();
    
    // ===== UTILITÁRIOS =====
    
    // Função para adicionar efeito de typing
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Função para debounce (otimização de performance)
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Aplica debounce em eventos de scroll para melhor performance
    const debouncedScrollHandler = debounce(() => {
        // Aqui você pode adicionar lógica adicional de scroll se necessário
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // ===== CONSOLE WELCOME MESSAGE =====
    console.log('%c🎰 Bem-vindo à Betano! 🎰', 'color: #FF4B00; font-size: 20px; font-weight: bold;');
    console.log('%cDesenvolvido com HTML, CSS e JavaScript puro', 'color: #ffffff; font-size: 14px;');
    
});

// ===== FUNÇÕES GLOBAIS =====


// Função para extrair primeiro nome
function getFirstName(fullName) {
    return fullName.trim().split(' ')[0];
}

// Função para mostrar mensagem de boas-vindas
function showWelcomeMessage(userData) {
    const firstName = getFirstName(userData.fullName);
    
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'welcome-overlay';
    
    // Criar mensagem
    const message = document.createElement('div');
    message.className = 'welcome-message';
    message.innerHTML = `
        <h2>
            <i class="fas fa-hand-wave"></i>
            Bem-vindo à Betano!
        </h2>
        <p>
            Olá, <span class="user-name">${firstName}</span>!<br>
            Sua conta foi criada com sucesso e você já pode começar a apostar.
        </p>
        <div class="welcome-actions">
            <button class="btn btn-primary" onclick="closeWelcomeMessage()">
                <i class="fas fa-play"></i> Começar a Apostar
            </button>
            <button class="btn btn-outline" onclick="closeWelcomeMessage()">
                <i class="fas fa-times"></i> Fechar
            </button>
        </div>
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(overlay);
    document.body.appendChild(message);
    
    // Animar entrada
    setTimeout(() => {
        overlay.classList.add('show');
        message.classList.add('show');
    }, 10);
    
    // Auto-fechar após 10 segundos
    setTimeout(() => {
        if (document.body.contains(message)) {
            closeWelcomeMessage();
        }
    }, 10000);
}

// Função para fechar mensagem de boas-vindas
function closeWelcomeMessage() {
    const overlay = document.querySelector('.welcome-overlay');
    const message = document.querySelector('.welcome-message');
    
    if (overlay) {
        overlay.classList.remove('show');
    }
    
    if (message) {
        message.classList.remove('show');
        
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
            if (document.body.contains(message)) {
                document.body.removeChild(message);
            }
        }, 300);
    }
}

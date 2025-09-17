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
            this.init();
        }
        
        init() {
            // Adiciona event listeners para botões de login e cadastro
            const loginBtn = document.querySelector('.btn-outline');
            const registerBtn = document.querySelector('.btn-primary');
            
            if (loginBtn) {
                loginBtn.addEventListener('click', () => this.showModal('login'));
            }
            
            if (registerBtn) {
                registerBtn.addEventListener('click', () => this.showModal('register'));
            }
        }
        
        showModal(type) {
            // Cria modal dinamicamente
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>${type === 'login' ? 'Login' : 'Cadastro'}</h2>
                    <form>
                        <input type="email" placeholder="Email" required>
                        <input type="password" placeholder="Senha" required>
                        ${type === 'register' ? '<input type="password" placeholder="Confirmar Senha" required>' : ''}
                        <button type="submit" class="btn btn-primary">${type === 'login' ? 'Entrar' : 'Cadastrar'}</button>
                    </form>
                </div>
            `;
            
            // Adiciona estilos do modal
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.cssText = `
                background: #2C2C2C;
                padding: 2rem;
                border-radius: 15px;
                max-width: 400px;
                width: 90%;
                position: relative;
                transform: scale(0.8);
                transition: transform 0.3s ease;
            `;
            
            // Adiciona ao DOM
            document.body.appendChild(modal);
            
            // Anima a entrada
            setTimeout(() => {
                modal.style.opacity = '1';
                modalContent.style.transform = 'scale(1)';
            }, 10);
            
            // Event listeners para fechar modal
            const closeBtn = modal.querySelector('.close');
            closeBtn.addEventListener('click', () => this.closeModal(modal));
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
            
            // Previne fechamento ao clicar no conteúdo
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        
        closeModal(modal) {
            modal.style.opacity = '0';
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                document.body.removeChild(modal);
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

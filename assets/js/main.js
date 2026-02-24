/**
 * IGOR | VRTICE - DOSSIÊ OPERACIONAL (JS ESTABILIZADO)
 * Engenharia de Front-End: SPA, GSAP Text Reveals, Parallax e Motor Isotope
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. REGISTRO DE PLUGINS
    gsap.registerPlugin(ScrollTrigger);

    // ==============================================================
    // 2. PRELOADER & ENTRADA CINEMATOGRÁFICA (Agora focada no Portfólio)
    // ==============================================================
    const tl = gsap.timeline({
        onComplete: () => {
            initManifestoAnimations();
            initNeuralSpotlight(); 
            
            // CARGA ESTRATÉGICA: Renderiza o Portfólio na abertura
            renderPortfolio('tab-estetica');
            setTimeout(() => {
                const firstTab = document.querySelector('.micro-tab[data-tab="tab-estetica"]');
                if(firstTab) updateMicroPillSlider(firstTab);
                ScrollTrigger.refresh();
            }, 100);
        }
    });
    
    tl.to(".logo-anim-wrapper", { opacity: 1, duration: 0.5, ease: "power2.out" })
      .to(".vrtice-vector", { strokeDashoffset: 0, duration: 2, ease: "power3.inOut" })
      .to(".vrtice-vector", { fill: "#F1ECE2", stroke: "transparent", duration: 0.8, ease: "power2.out" }, "-=0.5")
      .to("#vrtice-loader-svg", { filter: "drop-shadow(0 0 20px rgba(200, 169, 112, 0.4))", duration: 0.5 }, "<")
      .to(".logo-anim-wrapper", { duration: 0.4 })
      .to(".logo-anim-wrapper", { scale: 0.9, opacity: 0, duration: 0.6, ease: "power2.in" })
      .to("#preloader", { y: "-100%", duration: 1.2, ease: "expo.inOut" }, "-=0.2")
      
      // ANIMAÇÕES DE ENTRADA DO PORTFÓLIO (A nova página inicial)
      .fromTo(".dossier-cover-wrapper", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.5")
      .fromTo(".avatar-ring", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.4")
      .fromTo(".dossier-bio > *", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.6")
      .fromTo(".metric-item", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.4")
      .fromTo(".micro-pill-wrapper", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
      
      // Botões Globais de Conversão e Navegação
      .fromTo(".floating-pill-nav", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.5")
      .fromTo(".floating-zap", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.8");


    // ==============================================================
    // 3. FÍSICA DE ROLAGEM: MODO VISÃO (SCROLL TRIGGER)
    // ==============================================================
    function initManifestoAnimations() {
        
        // 3.0. Animação do Hero do Manifesto (Dispara apenas quando a aba Visão é aberta)
        gsap.fromTo(".manifesto-hero .anim-fade-up", 
            { opacity: 0, y: 20 }, 
            { scrollTrigger: { trigger: ".manifesto-hero", start: "top 85%" }, opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
        );
        gsap.to(".manifesto-hero .text-reveal", {
            scrollTrigger: { trigger: ".manifesto-hero", start: "top 85%" },
            y: "0%", duration: 1.2, stagger: 0.15, ease: "power4.out"
        });

        // 3.1. Lasers de Divisão
        gsap.utils.toArray('.laser-divider').forEach(laser => {
            gsap.to(laser, {
                scrollTrigger: { trigger: laser, start: "top 90%" },
                scaleX: 1, opacity: 0.5, duration: 1.5, ease: "power3.out"
            });
        });

        // 3.2. Leitura Guiada (Sticky Layout)
        gsap.utils.toArray('.split-text-layout').forEach(layout => {
            const label = layout.querySelector('.section-label');
            const paragraphs = layout.querySelectorAll('.section-content p, .section-content ul');
            
            gsap.fromTo(label, 
                { opacity: 0, x: -30 },
                { scrollTrigger: { trigger: layout, start: "top 80%" }, opacity: 1, x: 0, duration: 1, ease: "power3.out" }
            );
            
            gsap.fromTo(paragraphs, 
                { opacity: 0, y: 20 },
                { scrollTrigger: { trigger: layout, start: "top 80%" }, opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out" }
            );
        });

        // 3.3. Arsenal Técnico
        const arsenalCards = document.querySelectorAll('.anim-arsenal');
        arsenalCards.forEach((card, i) => {
            const rect = card.querySelector('.arsenal-border-rect');
            if (rect) {
                rect.style.strokeDasharray = "2000";
                rect.style.strokeDashoffset = "2000";
                gsap.to(rect, {
                    scrollTrigger: { trigger: ".arsenal-grid", start: "top 85%" },
                    strokeDashoffset: 0, duration: 2.5, ease: "power3.out", delay: i * 0.2
                });
            }
            const content = card.querySelector('.arsenal-content');
            if (content) {
                gsap.fromTo(content, 
                    { opacity: 0, y: 20 },
                    { scrollTrigger: { trigger: ".arsenal-grid", start: "top 85%" }, opacity: 1, y: 0, duration: 1, delay: 0.3 + (i * 0.2), ease: "power2.out" }
                );
            }
        });
    }

    // Efeito Spotlight (Identidade VRTICE)
    function initNeuralSpotlight() {
        const cards = document.querySelectorAll(".arsenal-card");
        cards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rectBox = card.getBoundingClientRect();
                const x = e.clientX - rectBox.left;
                const y = e.clientY - rectBox.top;
                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            });
        });
    }

    // ==============================================================
    // 4. MOTOR SPA & CÁPSULA FLUTUANTE GLOBAL (THE PILL)
    // ==============================================================
    const pillBtns = document.querySelectorAll('.pill-btn');
    const pillSlider = document.getElementById('pill-slider');
    const viewVisao = document.getElementById('view-visao');
    const viewExecucao = document.getElementById('view-execucao');

    pillBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.classList.contains('active')) return;

            const index = e.target.getAttribute('data-index');
            
            // Movimenta o Slider Físico (0 = Esquerda, 1 = Direita)
            pillSlider.style.transform = index === "0" ? "translateX(0%)" : "translateX(100%)";
            
            pillBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (index === "0") {
                // Vai para VISÃO (Manifesto)
                viewExecucao.classList.remove('active-view');
                viewExecucao.classList.add('hidden-view');
                
                setTimeout(() => {
                    viewVisao.classList.remove('hidden-view');
                    viewVisao.classList.add('active-view');
                    // Atualiza os gatilhos de scroll para a nova página visível
                    setTimeout(() => ScrollTrigger.refresh(), 100);
                }, 400);
            } else {
                // Vai para EXECUÇÃO (Portfólio)
                viewVisao.classList.remove('active-view');
                viewVisao.classList.add('hidden-view');
                
                setTimeout(() => {
                    viewExecucao.classList.remove('hidden-view');
                    viewExecucao.classList.add('active-view');
                    setTimeout(() => ScrollTrigger.refresh(), 100);
                }, 400);
            }
        });
    });

    // ==============================================================
    // 5. BANCO DE DADOS DA EXECUÇÃO
    // ==============================================================
    const portfolioDB = {
        'tab-estetica': [
            { id: 1, nicho: 'saude', img: 'assets/img/CT.png', prob: 'Clínica com imagem amadora que só atraía pacientes buscando desconto.', sol: 'Nova identidade visual premium e textos focados em transmitir exclusividade e segurança.' },
            { id: 1, nicho: 'saude', img: 'assets/img/ULTRALIFE.png', prob: 'Clínica com imagem amadora que só atraía pacientes buscando desconto.', sol: 'Nova identidade visual premium e textos focados em transmitir exclusividade e segurança.' },
            { id: 2, nicho: 'negocios', img: 'assets/img/conserta.png', prob: 'Escritório de advocacia perdendo clientes para a concorrência por falta de posicionamento.', sol: 'Design sóbrio e copy persuasiva focada na resolução rápida de dores jurídicas.' },
            { id: 3, nicho: 'gastronomia', img: 'assets/img/cantinho.png', prob: 'Restaurante premium percebido como "comum" no iFood e Instagram.', sol: 'Fotografia Dark Mood + Posicionamento de exclusividade no menu.' },
            { id: 4, nicho: 'cursos', img: 'assets/img/amanteus.png', prob: 'Curso de alto valor sendo confundido com tutorial gratuito.', sol: 'Embalagem visual High-Ticket e estrutura de vendas em formato de Dossiê.' }
        ],
        'tab-video': [
            { id: 1, thumb: 'assets/img/thumb-vid1.jpg', media: 'https://www.youtube.com/embed/Dtc8d0jnwqo?autoplay=1&rel=0', copy: 'Edição dinâmica com qualidade de cinema. O objetivo aqui foi prender a atenção do cliente nos primeiros 3 segundos.' },
            { id: 2, thumb: 'assets/img/thumb-vid2.jpg', media: 'https://www.youtube.com/embed/S-Ox4jHQQ_I?autoplay=1&rel=0', copy: 'Edição dinâmica com qualidade de cinema. O objetivo aqui foi prender a atenção do cliente nos primeiros 3 segundos.' },
            { id: 3, thumb: 'assets/img/thumb-vid3.png', media: 'https://www.youtube.com/embed/wHnxLfm3tFM?autoplay=1&rel=0', copy: 'Edição dinâmica com qualidade de cinema. O objetivo aqui foi prender a atenção do cliente nos primeiros 3 segundos.' },
            { id: 4, thumb: 'assets/img/thumb-vid4.jpg', media: 'https://www.youtube.com/embed/YviMxoSkVCA?autoplay=1&rel=0', copy: 'Edição dinâmica com qualidade de cinema.' },
            { id: 5, thumb: 'assets/img/thumb-vid5.jpg', media: 'https://www.youtube.com/embed/Kqh0m12OOTk?autoplay=1&rel=0', copy: 'Edição dinâmica com qualidade de cinema.' },
            { id: 6, thumb: 'assets/img/thumb-vid6.jpg', media: 'https://www.youtube.com/embed/sgDzpWwcf7o?autoplay=1&rel=0', copy: 'Edição dinâmica com qualidade de cinema.' },
            { id: 7, thumb: 'assets/img/thumb-vid7.jpg', media: 'https://www.youtube.com/embed/v747CmEKC-I?autoplay=1&rel=0', copy: 'Edição dinâmica com qualidade de cinema.' },
            { id: 8, thumb: 'assets/img/thumb-vid8.jpg', media: 'https://www.youtube.com/embed/00DC5YgT8-E?autoplay=1&rel=0', copy: 'Edição dinâmica com qualidade de cinema.' },
            { id: 9, thumb: 'assets/img/thumb-vid9.jpg', media: 'https://www.youtube.com/embed/SEU_ID_AQUI?autoplay=1&rel=0', copy: 'Edição dinâmica com qualidade de cinema.' },
            { id: 10, thumb: 'assets/img/thumb-vid10.jpg', media: 'https://www.youtube.com/embed/SEU_ID_AQUI?autoplay=1&rel=0', copy: 'Edição dinâmica com qualidade de cinema.' }
        ],
        'tab-hardcode': [
            { id: 1, thumb: 'assets/img/thumb-code1.jpg', media: 'assets/img/mockup-1.png', copy: '<strong>Projeto: Escritório de Advocacia.</strong><br><br>O Diferencial: Site programado do zero (sem usar construtores lentos e prontos).<br><br>O Resultado: O site abre em menos de 1 segundo. Isso impediu que os clientes desistissem de esperar a página carregar, dobrando os pedidos de orçamento no WhatsApp.' },
            { id: 2, thumb: 'assets/img/thumb-code2.jpg', media: 'assets/img/mockup-2.png', copy: '<strong>Projeto: Clínica de Estética Avançada.</strong><br><br>O Diferencial: Site programado do zero (sem usar construtores lentos e prontos).<br><br>O Resultado: O site abre em menos de 1 segundo. A conversão das campanhas disparou ao oferecer uma experiência fluida no celular.' }
        ]
    };

    // ==============================================================
    // 6. MOTOR DO DOSSIÊ (MICRO-PILL, ISOTOPE E PARALLAX)
    // ==============================================================
    
    gsap.to(".dossier-cover-img", {
        yPercent: 25, ease: "none",
        scrollTrigger: { trigger: ".dossier-header", start: "top top", end: "bottom top", scrub: true }
    });

    const microTabs = document.querySelectorAll('.micro-tab');
    const microSlider = document.getElementById('dossier-slider');
    const filterWrapper = document.getElementById('niche-filters-wrapper');
    const renderArea = document.getElementById('portfolio-render-area');
    let isotopeInstance = null;

    function updateMicroPillSlider(activeTab) {
        if(!microSlider || !activeTab) return;
        microSlider.style.width = activeTab.offsetWidth + 'px';
        microSlider.style.transform = `translateX(${activeTab.offsetLeft - 5}px)`; 
    }

    microTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const targetBtn = e.currentTarget;
            microTabs.forEach(t => t.classList.remove('active'));
            targetBtn.classList.add('active');
            
            updateMicroPillSlider(targetBtn);
            const targetTab = targetBtn.getAttribute('data-tab');
            renderPortfolio(targetTab);
        });
    });

    window.addEventListener('resize', () => {
        const activeTab = document.querySelector('.micro-tab.active');
        if(activeTab) updateMicroPillSlider(activeTab);
    });

    function renderPortfolio(tabId) {
        if(tabId === 'tab-estetica') filterWrapper.classList.add('show');
        else filterWrapper.classList.remove('show');

        gsap.to(renderArea, { opacity: 0, duration: 0.2, onComplete: () => {
            renderArea.innerHTML = ''; 
            if(isotopeInstance) { isotopeInstance.destroy(); isotopeInstance = null; }

            let newHTML = '';
            if(tabId === 'tab-estetica') {
                newHTML = portfolioDB[tabId].map(item => `
                    <div class="port-item filter-${item.nicho}">
                        <div class="port-card-estetica">
                            <div class="img-wrapper"><img src="${item.img}" alt="Projeto VRTICE" onerror="this.src='https://via.placeholder.com/600x600/111/333?text=VRTICE+ASSET'"></div>
                            <div class="hover-report">
                                <div class="report-content">
                                    <span class="r-label">ANÁLISE DE EXECUÇÃO</span>
                                    <p><strong>O Desafio:</strong> ${item.prob}</p>
                                    <p><strong>A Solução:</strong> ${item.sol}</p>
                                </div>
                            </div>
                        </div>
                    </div>`).join('');
            } 
            else if (tabId === 'tab-video') {
                newHTML = portfolioDB[tabId].map(item => `
                    <div class="port-item width-50">
                        <div class="port-card-media" onclick="openModal('${item.media}', '${item.copy}', 'video')">
                            <img src="${item.thumb}" alt="Vídeo VRTICE" onerror="this.src='https://via.placeholder.com/800x450/111/333?text=PLAY+VIDEO'">
                            <div class="play-overlay"><i class="ph-fill ph-play-circle"></i></div>
                        </div>
                    </div>`).join('');
            }
            else if (tabId === 'tab-hardcode') {
                newHTML = portfolioDB[tabId].map(item => `
                    <div class="port-item width-100">
                        <div class="port-card-media code-mockup" onclick="openModal('${item.media}', '${item.copy}', 'image')">
                            <img src="${item.thumb}" alt="Site Ultra-rápido VRTICE" onerror="this.src='https://via.placeholder.com/1200x600/111/333?text=MOCKUP+SITE'">
                            <div class="play-overlay"><i class="ph-fill ph-magnifying-glass-plus"></i></div>
                        </div>
                    </div>`).join('');
            }

            renderArea.innerHTML = newHTML;
            
            // Recria a grelha inteligentemente
            isotopeInstance = new Isotope(renderArea, { itemSelector: '.port-item', layoutMode: 'fitRows' });
            
            gsap.to(renderArea, { opacity: 1, duration: 0.4 });
            setTimeout(() => ScrollTrigger.refresh(), 200);
        }});
    }

    const filterBtns = document.querySelectorAll('.niche-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const filterValue = e.target.getAttribute('data-filter');
            if(isotopeInstance) {
                isotopeInstance.arrange({ filter: filterValue === 'all' ? '*' : `.filter-${filterValue}` });
                setTimeout(() => ScrollTrigger.refresh(), 400); 
            }
        });
    });


    // ==============================================================
    // 7. MODAL CINEMATOGRÁFICO
    // ==============================================================
    const modal = document.getElementById('portfolio-modal');
    const modalMedia = document.getElementById('modal-media');
    const modalCopy = document.getElementById('modal-microcopy');
    const closeModalBtn = document.getElementById('close-port-modal');

    window.openModal = function(mediaSrc, copyText, type) {
        modalMedia.innerHTML = ''; 
        modalCopy.innerHTML = copyText;

        if(type === 'video') {
            // Injeção de Iframe de Alta Performance (YouTube / Vimeo)
            modalMedia.innerHTML = `
                <iframe 
                    src="${mediaSrc}" 
                    style="width: 100%; height: 70vh; max-width: 1000px; border-radius: 4px; box-shadow: 0 0 50px rgba(0,0,0,0.5); border: none; background: #000;" 
                    allow="autoplay; fullscreen; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
        } else {
            modalMedia.innerHTML = `<img src="${mediaSrc}" alt="VRTICE Mockup">`;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    };

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { modalMedia.innerHTML = ''; }, 400); 
    }

    if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if(modal) modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });
});
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
        { 
            id: 1, 
            nicho: 'saude', 
            img: 'assets/img/CT.png', 
            gallery: ['assets/img/CT-1.png', 'assets/img/CT-2.png', 'assets/img/CT-3.png', 'assets/img/CT-4.png', 'assets/img/CT-5.png', 'assets/img/CT-6.png', 'assets/img/CT-7.png', 'assets/img/CT-8.png', 'assets/img/CT-9.png', 'assets/img/CT-10.png'], 
            prob: 'Instituição com sólido lastro de mercado e volume de alunos, mas com uma presença digital que subestimava sua autoridade real.', 
            sol: 'Refinamos o repertório visual através de um estudo antropológico da persona. Implementamos uma direção de arte técnica, alinhando a estética ao nível de excelência entregue no ambiente físico.' 
        },
        { 
            id: 2, 
            nicho: 'saude', 
            img: 'assets/img/ULTRALIFE.png', 
            gallery: ['assets/img/ULTRALIFE-1.png', 'assets/img/ULTRALIFE-2.png', 'assets/img/ULTRALIFE-3.png', 'assets/img/ULTRALIFE-4.png', 'assets/img/ULTRALIFE-5.png', 'assets/img/ULTRALIFE-6.png', 'assets/img/ULTRALIFE-7.png', 'assets/img/ULTRALIFE-8.png', 'assets/img/ULTRALIFE-9.png', 'assets/img/ULTRALIFE-10.png', 'assets/img/ULTRALIFE-11.png', 'assets/img/ULTRALIFE-12.png', 'assets/img/ULTRALIFE-13.png', 'assets/img/ULTRALIFE-14.png'], 
            prob: 'Estagnação de crescimento orgânico e baixa taxa de conversão por falta de diferenciação competitiva.', 
            sol: 'O plano de ação focou em humanização tática. Estruturamos o design para destacar a equipe e a comunidade, gerando conexão imediata. O resultado foi a consolidação da expansão e um aumento real no volume de novas matrículas.' 
        },
        { 
            id: 3, 
            nicho: 'negocios', 
            img: 'assets/img/conserta.png', 
            gallery: ['assets/img/conserta-1.png', 'assets/img/conserta-2.png', 'assets/img/conserta-3.png', 'assets/img/conserta-4.png', 'assets/img/conserta-5.png', 'assets/img/conserta-6.png'], 
            prob: 'Rede consolidada de assistência técnica com comunicação visual desconexa, buscando elevar seu status para o mercado premium.', 
            sol: 'Construímos um ecossistema visual baseado em sobriedade e sofisticação. Investimos em elementos que reforçam a segurança e o profissionalismo, transformando o perfil em uma vitrine institucional de alto padrão.' 
        },
        { 
            id: 4, 
            nicho: 'gastronomia', 
            img: 'assets/img/CANTINHO.png', 
            gallery: ['assets/img/cantinho-1.png', 'assets/img/cantinho-2.png', 'assets/img/cantinho-3.png', 'assets/img/cantinho-4.png', 'assets/img/cantinho-5.png', 'assets/img/cantinho-6.png'], 
            prob: 'Operação premium percebida como uma opção genérica nas plataformas de delivery e redes sociais.', 
            sol: 'Aplicamos engenharia visual na fotografia gastronômica e ajustamos o tom de voz para uma narrativa de exclusividade. Elevamos o desejo pelo produto, estabelecendo a marca como a referência absoluta em seu segmento na região.' 
        },
        { 
            id: 5, 
            nicho: 'cursos', 
            img: 'assets/img/amanteus.png', 
            gallery: ['assets/img/amanteus-1.jpg', 'assets/img/amanteus-2.jpg', 'assets/img/amanteus-3.jpg', 'assets/img/amanteus-4.jpg', 'assets/img/amanteus-5.jpg', 'assets/img/amanteus-6.jpg'], 
            prob: 'Programa de alto impacto confundido com conteúdo informativo comum, gerando resistência no preço.', 
            sol: 'Implementamos uma estética de luxo clássico alinhada à maturidade da marca. Focamos na valorização da atmosfera e do estilo de vida, posicionando o conhecimento como um ativo de transformação exclusivo e de alto valor.' 
        }
    ],

        'tab-video': [
            { id: 1, media: 'Dtc8d0jnwqo', copy: 'Produção audiovisual do clipe Ano 3 Mil, do cantor Matteusinho, o cantor optou por uma estética caseira, similar a de boteco, realizamos portanto alternância de câmeras, e planos de filmagem, enfatizando o público, equipe musical, mantendo o destaque no cantor e na letra da música, através de cortes e trechos onde o público demonstra alto engajamento com a canção. Edição ritmada acompanhando a música.' },
            { id: 2, media: 'S-Ox4jHQQ_I', copy: 'Edição dinâmica para apresentar o projeto da Liz, motion design foi utilizado, para compor a apresentação e criar legendas dinâmicas. Equilíbrio entre o ritmado e contemplativo.' },
            { id: 3, media: 'wHnxLfm3tFM', copy: 'Criação de conteúdo, no modelo Ai Gen, desde a construção do personagem, aos prompts de geração de vídeo, edição e pós produção. O cliente opta por uma edição simples, valorizando o ritmo do vídeo, legenda hipnótica e recursos como o “follow reminder”, para fidelizar a audiência.' },
            { id: 4, media: 'YviMxoSkVCA', copy: 'Edição festiva, focada em demonstrar a felicidade das celebrações de fim de ano na Casa do Forro, exaltando banquete, premiações e a energia natalina, edição ritmada, para acompanhar a música.' },
            { id: 5, media: 'Kqh0m12OOTk', copy: 'Este conteúdo é focado na zueira com o personal, portanto usamos recursos de motion, no Adobe After Effects para produzir animações no personagem, como forma de humor. Além de manter o caráter de vídeo informativo, com cortes e animações inteligentes. Este vídeo rompeu a média de engajamento.' },
            { id: 6, media: 'sgDzpWwcf7o', copy: 'Vídeo informativo, cuja edição está limitada a recursos, que potencializam a mensagem e trazem maior retenção para o conteúdo. Potencializando a conscientização do público, com o intuito de converter vendas.' },
            { id: 7, media: 'v747CmEKC-I', copy: 'Conteúdo de venda automotiva, onde utilizamos recursos como o speed ramp, para gerar dinamismo e reportar a sensação de velocidade que um carro pode proporcionar, além da alternância nos planos de filmagem e ênfase estratégica em aspectos do carro' },
            { id: 8, media: 'KoMFqHvY2XU', copy: 'Vídeo informativo, cuja edição está limitada a recursos, que potencializam a mensagem e trazem maior retenção para o conteúdo. Potencializando a conscientização do público, com o intuito de converter vendas.' },
        ],
        'tab-hardcode': [
            { 
                id: 1, 
                thumb: './assets/img/thum-vid1.png', 
                media: 'https://amanteus.com.br/downsell', // <-- COLOQUE O LINK REAL AQUI
                copy: '<strong>Projeto: Infoproduto Masculino</strong><br><br>O Diferencial: Site programado do zero, oferecendo funcionalidades e animações que construtores e páginas prontas não possuem.<br><br>O Resultado: O site se tornou um ecossitema vivo, onde o cliente se sente imerso desde o primeiro segundo e acaba sendo guiado numa jornada. Isso impediu que os clientes desistissem de esperar na página por falta de estímulo, alavancando as vendas.' 
            },
            { 
                id: 2, 
                thumb: './assets/img/thumb-vid3.png', 
                media: 'https://lizdesign.com.br',  // <-- COLOQUE O LINK REAL AQUI
                copy: '<strong>Projeto: Brand Designer.</strong><br><br>O Diferencial: Site programado do zero (sem usar construtores lentos e prontos).<br><br>O Resultado: O site abre em menos de 1 segundo. A conversão das campanhas disparou ao oferecer uma experiência fluida no celular.' 
            },
            { 
                id: 2, 
                thumb: './assets/img/thumb-vid2.png', 
                media: 'https://rosecarvalho38.github.io/Terappia-TRG/',  // <-- COLOQUE O LINK REAL AQUI
                copy: '<strong>Projeto: Brand Designer.</strong><br><br>O Diferencial: Site programado do zero (sem usar construtores lentos e prontos).<br><br>O Resultado: O site abre em menos de 1 segundo. A conversão das campanhas disparou ao oferecer uma experiência fluida no celular.' 
            }
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
                newHTML = portfolioDB[tabId].map(item => {
                    // Transforma o array da galeria numa string segura para passar no HTML
                    const galleryStr = item.gallery ? JSON.stringify(item.gallery).replace(/"/g, '&quot;') : '';
                    
                    return `
                    <div class="port-item filter-${item.nicho}">
                        <div class="port-card-estetica" onclick="openModal('${galleryStr}', '<strong>O Desafio:</strong> ${item.prob}<br><br><strong>A Solução:</strong> ${item.sol}', 'gallery')">
                            <div class="img-wrapper"><img src="${item.img}" alt="Projeto VRTICE"></div>
                            <div class="hover-report">
                                <div class="report-content">
                                    <span class="r-label">VER PROJETO COMPLETO</span>
                                    <p><strong>Clique para expandir o dossiê.</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                `}).join('');
            } 
            else if (tabId === 'tab-video') {
                newHTML = portfolioDB[tabId].map(item => {
                    const videoId = item.media;
                    // Thumb de alta resolução (formato vertical se o vídeo for nativo vertical)
                    // O YouTube corta automaticamente, mas o CSS vai forçar o 9:16
                    const dynamicThumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                    const embedLink = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

                    return `
                    <div class="port-item social-grid-item">
                        <div class="port-card-media vertical-media" onclick="openModal('${embedLink}', '${item.copy}', 'video')">
                            <img src="${dynamicThumb}" alt="Vídeo VRTICE" loading="lazy">
                            <div class="play-overlay">
                                <i class="ph-fill ph-play-circle"></i>
                                <span class="play-label">ASSISTIR CASE</span>
                            </div>
                        </div>
                    </div>`;
                }).join('');
            }
            else if (tabId === 'tab-hardcode') {
                newHTML = portfolioDB[tabId].map(item => `
                    <div class="port-item width-100">
                        <div class="port-card-media code-mockup" onclick="openModal('${item.media}', '${item.copy}', 'website')">
                            <img src="${item.thumb}" alt="Site Ultra-rápido VRTICE" onerror="this.src='https://via.placeholder.com/1200x600/111/333?text=MOCKUP+SITE'">
                            <div class="play-overlay">
                                <i class="ph-fill ph-magnifying-glass-plus"></i>
                                <span class="play-label">TESTAR PERFORMANCE AO VIVO</span>
                            </div>
                        </div>
                    </div>
                `).join('');
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
            modalMedia.innerHTML = `<iframe src="${mediaSrc}" style="width: 100%; height: 70vh; max-width: 1000px; border-radius: 4px; border: none; background: #000;" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
        } 
        // --- NOVA ESTRUTURA PARA SITES AO VIVO ---
        else if(type === 'website') {
            modalMedia.innerHTML = `
                <div class="browser-mockup-frame">
                    <div class="browser-header">
                        <span class="dot close"></span>
                        <span class="dot minimize"></span>
                        <span class="dot expand"></span>
                        <div class="url-bar">${mediaSrc.replace('https://', '')}</div>
                    </div>
                    <iframe src="${mediaSrc}" title="Live Preview" class="live-site-iframe"></iframe>
                </div>
            `;
        } 
        // --- NOVA ESTRUTURA PARA GALERIA (CARROSSEL DE ARTES) ---
        else if(type === 'gallery') {
            // Converte a string de volta para Array
            const images = JSON.parse(mediaSrc.replace(/&quot;/g, '"'));
            let galleryHTML = '<div class="modal-gallery-grid">';
            images.forEach(img => {
                galleryHTML += `<div class="gallery-img-box"><img src="${img}" alt="Peça VRTICE" loading="lazy"></div>`;
            });
            galleryHTML += '</div>';
            modalMedia.innerHTML = galleryHTML;
        }
        else {
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

// ==============================================================
    // 8. ANIMAÇÃO DE REVELAÇÃO DA OFERTA (SCROLL)
    // ==============================================================
    // Garante que os cartões de serviço apareçam com fluidez apenas quando o cliente rolar até eles
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const solutionCards = document.querySelectorAll('.vrtice-solutions .anim-fade-up');
        
        if (solutionCards.length > 0) {
            gsap.fromTo(solutionCards, 
                { 
                    opacity: 0, 
                    y: 60 // Começam 60 pixels mais abaixo
                }, 
                { 
                    opacity: 1, 
                    y: 0, // Sobem para a posição original
                    duration: 0.9, 
                    stagger: 0.2, // Efeito dominó: revela um cartão a cada 0.2 segundos
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".vrtice-solutions",
                        start: "top 85%", // A mágica acontece quando a secção atinge 85% da tela
                        toggleActions: "play none none reverse" // Se ele subir a página e descer de novo, a animação repete
                    }
                }
            );
        }
    }

    
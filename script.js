// Hela det här skriptet körs efter att HTML-dokumentet har laddats helt
document.addEventListener('DOMContentLoaded', () => {
    // ---------- SEKTION 1: FADE-IN ANIMATION ----------
    // Den här sektionen gör att element tonas in när du scrollar ner på sidan
    
    // Välj alla element som har klassen 'fade-in'
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Skapa en IntersectionObserver - den övervakar när element blir synliga i viewport
    const observer = new IntersectionObserver((entries) => {
        // För varje element som kommer in i eller lämnar viewport
        entries.forEach(entry => {
            // Om elementet nu är synligt på skärmen
            if (entry.isIntersecting) {
                // Gör det helt synligt (opacity 1) och flytta det till sin rätta position
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        // Detta threshold betyder att animationen startar när minst 10% av elementet är synligt
        threshold: 0.1
    });

    // Förbered varje fade-in element med ursprungliga styles och lägg till det i observer
    fadeElements.forEach(element => {
        // Börja osynligt och något under dess slutliga position
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        // Lägg till mjuka transition-effekter för både opacity och position
        element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        // Börja övervaka detta element
        observer.observe(element);
    });

    // ---------- SEKTION 2: SMOOTH SCROLLING NAVIGATION ----------
    // Detta gör att sidan scrollar mjukt när man klickar på navigationslänkar
    
    // Hitta alla länkar som navigerar till ID:n på samma sida (interna länkar)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Lägg till en click event handler för varje länk
        anchor.addEventListener('click', function (e) {
            // Förhindra default-beteendet att hoppa direkt till platsen
            e.preventDefault();
            // Hitta elementet som den här länken pekar på
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Beräkna scroll-positionen, med hänsyn till utrymme för fixed header
                const headerOffset = 80; // Höjd på fixed header i pixlar
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Scrolla till target-elementet med en smooth animation
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Uppdatera visuellt navigationstillstånd (markera den active länken)
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // ---------- SEKTION 3: FEATURE CARDS ANIMATION ----------
    // Detta skapar speciella animationer för feature card-element
    
    // Välj alla element med klassen 'feature-card'
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Skapa en annan IntersectionObserver specifikt för feature cards
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // När en feature card blir synlig
            if (entry.isIntersecting) {
                // Lägg till klassen 'visible' som triggar en CSS-animation
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigga när 10% av card är synligt
    });

    // Börja observera varje feature card
    featureCards.forEach(card => {
        featureObserver.observe(card);
    });

    // ---------- SEKTION 4: PARALLAX SCROLLING EFFECT ----------
    // Detta skapar en djupeffekt i hero-sektionen när man scrollar
    
    // Hitta hero-sektionen om den finns
    const hero = document.querySelector('.hero');
    if (hero) {
        // Lägg till en scroll event listener för att skapa parallax-effekten
        window.addEventListener('scroll', () => {
            // Få reda på hur långt ner på sidan användaren har scrollat
            const scrolled = window.pageYOffset;
            // Flytta background-image med halva hastigheten av scrollningen
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }

    // ---------- SEKTION 5: NAVIGATION HIGHLIGHT ----------
    // Detta markerar den aktuella sidan i navigationsmenyn
    
    // Hämta current page URL
    const currentLocation = window.location.pathname;
    // Kontrollera varje nav-link
    document.querySelectorAll('.nav-link').forEach(link => {
        // Om denna länk pekar på den aktuella sidan
        if (link.getAttribute('href') === currentLocation) {
            // Lägg till klassen 'active' för att highlighta den
            link.classList.add('active');
        }
    });

    // ---------- SEKTION 6: NEWSLETTER FORM HANDLING ----------
    // Detta hanterar submit av newsletter-formuläret
    
    // Hitta newsletter form om det finns
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        // Lägg till en submit event handler
        newsletterForm.addEventListener('submit', (e) => {
            // Förhindra default form submission
            e.preventDefault();
            // Hämta email som angavs
            const email = newsletterForm.querySelector('input[type="email"]').value;
            // Visa confirmation message (i en verklig site skulle detta skicka email till en server)
            alert('Tack för din prenumeration!');
            // Rensa formuläret
            newsletterForm.reset();
        });
    }

    // ---------- SEKTION 7: FEATURE CARD HOVER EFFECTS ----------
    // Detta skapar interaktiva hover-effekter för feature cards
    
    // För varje feature card
    featureCards.forEach(card => {
        // När musen kommer in över (hovrar över) card
        card.addEventListener('mouseenter', () => {
            // Lyft card något och gör det något större
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        // När musen lämnar card
        card.addEventListener('mouseleave', () => {
            // Återställ card till sin ursprungliga position och storlek
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ---------- SEKTION 8: SCROLL-BASED ANIMATIONS ----------
    // Detta lägger till animationer till olika element när de kommer i viewport
    
    // Skapa ytterligare en IntersectionObserver för general animations
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // När ett element kommer i viewport
            if (entry.isIntersecting) {
                // Lägg till klassen 'animate' för att trigga en CSS-animation
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1 // Trigga när 10% av elementet är synligt
    });

    // Observera flera typer av element för animations
    document.querySelectorAll('.feature-card, .stat-item, .gallery-item').forEach(element => {
        animateOnScroll.observe(element);
    });

    // ---------- SEKTION 9: TIMELINE FILTERING FUNCTIONALITY ----------
    // Detta möjliggör filtering av timeline items efter kategori
    
    // Välj alla filter buttons och timeline items
    const filterButtons = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Funktion för att visa alla timeline items med en animation
    function showAllTimelineItems() {
        timelineItems.forEach(item => {
            // Gör först elementet visible i DOM
            item.style.display = 'block';
            // Kort delay innan klassen 'visible' läggs till för en smooth animation
            setTimeout(() => {
                item.classList.add('visible');
            }, 50);
        });
    }

    // Visa alla timeline items när sidan först laddas
    if (timelineItems.length > 0) {
        showAllTimelineItems();
    }

    // Förbered varje filter button med click handling
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Uppdatera vilken button som är active
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Hämta category att filtrera efter
            const category = button.getAttribute('data-category');

            // Om "all" är valt, visa allt
            if (category === 'all') {
                showAllTimelineItems();
            } else {
                // Annars, filtrera items baserat på deras category
                timelineItems.forEach(item => {
                    if (item.getAttribute('data-category') === category) {
                        // Visa matchande items med en fade-in effect
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 50);
                    } else {
                        // Dölj icke-matchande items med en fade-out effect
                        item.classList.remove('visible');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300); // Vänta på att fade-out-animationen ska slutföras
                    }
                });
            }
        });
    });
});
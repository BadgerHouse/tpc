document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeBtn = document.getElementById('closeBtn');
    const popupMenu = document.getElementById('popupMenu');
    const navbar = document.querySelector('.navbar');
    
    // Pop-up menü işlevselliği
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            popupMenu.classList.add('active');
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            popupMenu.classList.remove('active');
        });
    }
    
    // Sayfa kaydırıldığında navbar'ın arkaplan rengini değiştir
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Dil değiştirme işlevselliği
    const flagLinks = document.querySelectorAll('.flag-link');

    flagLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Eğer zaten mevcut sayfadaysa, linki engelle
            if (window.location.href.includes(this.getAttribute('href'))) {
                e.preventDefault();
            }
        });
    });
    
    // Logo slider işlevselliği
    const logoSlide = document.querySelector('.logo-slide');
    
    if (logoSlide) {
        /* 
        // Logo için sağa sola hareket animasyonu ekle - ŞİMDİLİK DURDURULDU
        let positionX = 0;
        let moveDirection = 1; // 1: sağa doğru, -1: sola doğru
        let rotation = 0;
        let rotationDirection = 1; // 1: saat yönünde, -1: saat yönünün tersinde
        
        // Hareket aralığını ekran genişliğine göre ayarla
        let maxMovement = 50; // Varsayılan değer, daha büyük logo için daha geniş hareket aralığı
        
        // Ekran genişliğine göre hareket aralığını ayarla
        function updateMaxMovement() {
            if (window.innerWidth <= 576) {
                maxMovement = 20; // Mobil için daha az hareket
            } else if (window.innerWidth <= 768) {
                maxMovement = 30; // Tablet için orta hareket
            } else if (window.innerWidth <= 992) {
                maxMovement = 40; // Küçük desktop için
            } else {
                maxMovement = 50; // Büyük desktop için tam hareket
            }
        }
        
        // Sayfa yüklendiğinde ve yeniden boyutlandığında güncelle
        updateMaxMovement();
        window.addEventListener('resize', updateMaxMovement);
        
        function moveAndRotateLogo() {
            // Sağa-sola hareket
            positionX += (0.5 * moveDirection); // Hız artırıldı
            
            // Hareket yönünü belirli aralıklarla değiştir
            if (positionX > maxMovement) {
                moveDirection = -1;
            } else if (positionX < -maxMovement) {
                moveDirection = 1;
            }
            
            // Hafif dönme efekti
            rotation += (0.15 * rotationDirection); // Dönüş hızı artırıldı
            
            // Dönüş yönünü belirli aralıklarla değiştir
            if (rotation > 4) { // Dönüş açısı artırıldı
                rotationDirection = -1;
            } else if (rotation < -4) {
                rotationDirection = 1;
            }
            
            logoSlide.style.transform = `translate(${positionX}px, 0) rotate(${rotation}deg)`;
        }
        
        // Logo animasyon intervalini başlat - Daha hızlı animasyon için interval azaltıldı
        setInterval(moveAndRotateLogo, 25);
        */
        
        // Logo sabit kalsın
        logoSlide.style.transform = 'translate(0, 0) rotate(0deg)';
    }
    
    // Hero slider işlevselliği
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const cardGroups = document.querySelectorAll('.featured-cards-group');
    const controlDots = document.querySelectorAll('.control-dot');
    const currentSlideNum = document.querySelector('.current-slide');
    const totalSlidesNum = document.querySelector('.total-slides');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    if (totalSlidesNum) {
        totalSlidesNum.textContent = totalSlides;
    }
    
    // Slider navigasyonu
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            changeSlide(1);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            changeSlide(-1);
        });
    }
    
    // Kontrol noktaları ile slide değiştirme
    if (controlDots.length > 0) {
        controlDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                goToSlide(slideIndex);
            });
        });
    }
    
    // Otomatik slide değiştirme
    let slideInterval = setInterval(function() {
        changeSlide(1);
    }, 8000);
    
    function changeSlide(direction) {
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }
    
    function goToSlide(index) {
        // Aktif slide'ı kaldır
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Yeni slide'ı aktif yap
        slides[index].classList.add('active');
        
        // Card gruplarını güncelle
        cardGroups.forEach(group => {
            group.classList.remove('active');
        });
        
        const activeCardGroup = document.querySelector(`.featured-cards-group[data-slide="${index}"]`);
        if (activeCardGroup) {
            activeCardGroup.classList.add('active');
        }
        
        // Kontrol noktalarını güncelle
        controlDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        const activeDot = document.querySelector(`.control-dot[data-slide="${index}"]`);
        if (activeDot) {
            activeDot.classList.add('active');
        }
        
        // Sayaç metnini güncelle
        if (currentSlideNum) {
            currentSlideNum.textContent = index + 1;
        }
        
        // Otomatik değiştirme zamanlayıcısını sıfırla
        clearInterval(slideInterval);
        slideInterval = setInterval(function() {
            changeSlide(1);
        }, 8000);
    }

    // İletişim Formu İşlevselliği
    const contactForm = document.getElementById('contactForm');
    const successPopup = document.getElementById('successPopup');
    const errorPopup = document.getElementById('errorPopup');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');
    const closeErrorBtn = document.getElementById('closeErrorBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(contactForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Gerçek projede burada AJAX ile verileri sunucuya gönderebilirsiniz
            // Şimdilik sadece başarılı popup'ı gösteriyoruz
            console.log('Form verileri:', formDataObj);
            
            // Başarılı popup'ı göster
            successPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Formu temizle
            contactForm.reset();
        });
    }

    // Success Popup kapat
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', function() {
            successPopup.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Error Popup kapat
    if (closeErrorBtn) {
        closeErrorBtn.addEventListener('click', function() {
            errorPopup.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Popup dışına tıklandığında kapatma
    if (successPopup) {
        successPopup.addEventListener('click', function(e) {
            if (e.target === successPopup) {
                successPopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    if (errorPopup) {
        errorPopup.addEventListener('click', function(e) {
            if (e.target === errorPopup) {
                errorPopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}); 
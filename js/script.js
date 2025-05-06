document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeBtn = document.getElementById('closeBtn');
    const popupMenu = document.getElementById('popupMenu');
    const navbar = document.querySelector('.navbar');
    
    // Hamburger menüye tıklandığında
    hamburgerBtn.addEventListener('click', function() {
        popupMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Scroll'u engelle
    });
    
    // Kapat butonuna tıklandığında
    closeBtn.addEventListener('click', function() {
        popupMenu.classList.remove('active');
        document.body.style.overflow = 'auto'; // Scroll'u tekrar etkinleştir
    });
    
    // Popup dışına tıklandığında kapatma
    popupMenu.addEventListener('click', function(e) {
        if (e.target === popupMenu) {
            popupMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Sayfa kaydırıldığında navbar arkaplanını değiştirme
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Slider işlemleri
    const slides = document.querySelectorAll('.slide');
    const cardGroups = document.querySelectorAll('.featured-cards-group');
    const controlDots = document.querySelectorAll('.control-dot');
    const currentSlideEl = document.querySelector('.current-slide');
    const totalSlidesEl = document.querySelector('.total-slides');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let sliderInterval;
        
        // Toplam slide sayısını güncelle
        if (totalSlidesEl) {
            totalSlidesEl.textContent = totalSlides;
        }
        
        // Slide'ı gösterme fonksiyonu
        function showSlide(index) {
            // Önceki aktif slide'ı deaktif et
            slides.forEach(slide => {
                slide.classList.remove('active', 'prev');
                slide.classList.add('next');
            });
            
            // Yeni slide'ı aktif et
            slides[index].classList.add('active');
            slides[index].classList.remove('prev', 'next');
            
            // Önceki slide'ı işaretle
            const prevIndex = (index - 1 + totalSlides) % totalSlides;
            slides[prevIndex].classList.add('prev');
            slides[prevIndex].classList.remove('active', 'next');
            
            // Kart gruplarını güncelle
            cardGroups.forEach((group, i) => {
                group.classList.toggle('active', i === index);
            });
            
            // Kontrol noktalarını güncelle
            controlDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            // Sayacı güncelle
            if (currentSlideEl) {
                currentSlideEl.textContent = index + 1;
            }
            
            currentSlide = index;
        }
        
        // Otomatik geçiş başlat
        function startAutoSlide() {
            sliderInterval = setInterval(() => {
                const nextSlide = (currentSlide + 1) % totalSlides;
                showSlide(nextSlide);
            }, 5000); // 5 saniyede bir
        }
        
        // Otomatik geçişi durdur
        function stopAutoSlide() {
            clearInterval(sliderInterval);
        }
        
        // Önceki slide'a geç
        function goToPrevSlide() {
            const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(prevSlide);
        }
        
        // Sonraki slide'a geç
        function goToNextSlide() {
            const nextSlide = (currentSlide + 1) % totalSlides;
            showSlide(nextSlide);
        }
        
        // Navigasyon butonlarına tıklandığında
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                goToPrevSlide();
                startAutoSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                goToNextSlide();
                startAutoSlide();
            });
        }
        
        // Kontrol noktalarına tıklanınca
        controlDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                showSlide(index);
                startAutoSlide();
            });
        });
        
        // Slider'a dokununca otomatik geçişi durdur
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopAutoSlide);
            sliderContainer.addEventListener('mouseleave', startAutoSlide);
            
            // Touch cihazlar için
            sliderContainer.addEventListener('touchstart', stopAutoSlide);
            sliderContainer.addEventListener('touchend', startAutoSlide);
        }
        
        // İlk slide'ı göster ve otomatik geçişi başlat
        showSlide(0);
        startAutoSlide();
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
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
    const controlDots = document.querySelectorAll('.control-dot');
    const currentSlideEl = document.querySelector('.current-slide');
    const totalSlidesEl = document.querySelector('.total-slides');
    
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
}); 
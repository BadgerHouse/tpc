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
}); 
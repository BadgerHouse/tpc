<?php
// Gelen URL'yi analiz et
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);

// Eğer dizin kök dizini gösteriyorsa veya /index ise, index.html'i göster
if ($path == '/' || $path == '/index' || $path == '/index.php') {
    include('index.html');
    exit;
}

// Özel yönlendirmeler
if ($path == '/mc1-urun') {
    header('Location: /urunler');
    exit;
}
if ($path == '/mc1-product') {
    header('Location: /products');
    exit;
}

// URL'den başlangıçtaki slash'ı kaldır
$clean_path = ltrim($path, '/');

// Eğer dosya uzantısı yoksa ve bu isimde bir HTML dosyası varsa onu göster
if (!pathinfo($clean_path, PATHINFO_EXTENSION) && file_exists($clean_path . '.html')) {
    include($clean_path . '.html');
    exit;
}

// Eğer dosya varsa olduğu gibi göster
if (file_exists($clean_path)) {
    $extension = pathinfo($clean_path, PATHINFO_EXTENSION);
    
    // Doğru content type'ı ayarla
    switch($extension) {
        case 'html':
            header('Content-Type: text/html');
            break;
        case 'css':
            header('Content-Type: text/css');
            break;
        case 'js':
            header('Content-Type: application/javascript');
            break;
        case 'jpg':
        case 'jpeg':
            header('Content-Type: image/jpeg');
            break;
        case 'png':
            header('Content-Type: image/png');
            break;
        // Diğer dosya türleri için gerekirse ekleyin
    }
    
    readfile($clean_path);
    exit;
}

// Hiçbir eşleşme bulunamazsa 404 sayfasını göster
include('404.html');
?> 
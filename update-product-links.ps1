# PowerShell script to update all links from mc1-urun to urunler and mc1-product to products

# Get all HTML files
$htmlFiles = Get-ChildItem -Path . -Filter *.html -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.FullName)..."
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace mc1-urun with urunler
    $newContent = $content -replace 'href="mc1-urun"', 'href="urunler"'
    
    # Replace mc1-product with products
    $newContent = $newContent -replace 'href="mc1-product"', 'href="products"'
    
    # Save the file if changes were made
    if ($content -ne $newContent) {
        $newContent | Set-Content -Path $file.FullName -NoNewline
        Write-Host "Updated $($file.Name)"
    } else {
        Write-Host "No changes needed for $($file.Name)"
    }
}

Write-Host "Done! All HTML files have been processed." 
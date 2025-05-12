# PowerShell script to remove .html extensions from all links in html files

# Get all HTML files
$htmlFiles = Get-ChildItem -Path . -Filter *.html -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.FullName)..."
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace all internal links with .html extension
    $newContent = $content -replace '(href="[^"]+)\.html"', '$1"'
    
    # Save the file if changes were made
    if ($content -ne $newContent) {
        $newContent | Set-Content -Path $file.FullName -NoNewline
        Write-Host "Updated $($file.Name)"
    } else {
        Write-Host "No changes needed for $($file.Name)"
    }
}

Write-Host "Done! All HTML files have been processed." 
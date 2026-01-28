$folder = Get-ChildItem -Directory -Filter "hailuo-2_3*" | Select-Object -First 1
$dest = "d:\VALORA DIMENSIONS\public\sequence"
if (!(Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force }
$files = Get-ChildItem -Path $folder.FullName -Filter "*.jpg" | Sort-Object Name
$i = 0
foreach ($f in $files) {
    $target = Join-Path $dest "$i.jpg"
    Copy-Item $f.FullName -Destination $target
    $i++
}
Write-Host "Copied $i images to $dest"

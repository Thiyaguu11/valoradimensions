$src = "d:\VALORA DIMENSIONS\images"
$dest = "d:\VALORA DIMENSIONS\public\sequence"
if (!(Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force }
else { 
    Remove-Item -Path "$dest\*" -Include *.jpg -Force 
}

$files = Get-ChildItem -Path $src -Filter "frame_*.jpg" | Sort-Object Name
$i = 0
foreach ($f in $files) {
    $target = Join-Path $dest "$i.jpg"
    Copy-Item $f.FullName -Destination $target
    $i++
}
Write-Host "Copied $i images to $dest"

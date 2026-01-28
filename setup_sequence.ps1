$src = "d:\VALORA DIMENSIONS\hailuo-2_3-fast_layered_papier-mâché_material_Animate_the_image_so_that_the_curved_line_graph_-0_000"
$dest = "d:\VALORA DIMENSIONS\public\sequence"
if (!(Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force }
$files = Get-ChildItem -Path $src -Filter "*.jpg" | Sort-Object Name
for ($i=0; $i -lt $files.Count; $i++) {
    $target = Join-Path $dest "$i.jpg"
    Copy-Item $files[$i].FullName -Destination $target
}
Write-Host "Copied $($files.Count) images to $dest"

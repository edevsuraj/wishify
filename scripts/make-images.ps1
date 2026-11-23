Add-Type -AssemblyName System.Drawing

function Save-Crop {
  param([string]$src, [string]$dest, [int]$tw, [int]$th, [int]$quality = 82)
  if (!(Test-Path $src)) { Write-Output "MISSING $src"; return }
  $img = [System.Drawing.Image]::FromFile((Resolve-Path $src))
  $scale = [Math]::Max($tw / $img.Width, $th / $img.Height)
  $sw = [int]($tw / $scale); $sh = [int]($th / $scale)
  $sx = [int](($img.Width - $sw) / 2); $sy = [int](($img.Height - $sh) / 2)
  $bmp = New-Object System.Drawing.Bitmap($tw, $th)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.PixelOffsetMode = 'HighQuality'
  $g.SmoothingMode = 'HighQuality'
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0,0,$tw,$th)), (New-Object System.Drawing.Rectangle($sx,$sy,$sw,$sh)), [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose(); $img.Dispose()
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
  New-Item -ItemType Directory -Force -Path (Split-Path $dest) | Out-Null
  $bmp.Save($dest, $codec, $params)
  $bmp.Dispose()
  Write-Output ("OK " + $dest)
}

$portrait = @{
  'birthday' = 'scripts/data/unsplash/birthday-1.jpg'
  'anniversary' = 'scripts/data/final-src/anniversary-src.jpg'
  'love' = 'scripts/data/batch2/couple-b.jpg'
  'friendship' = 'scripts/data/unsplash/friends-3.jpg'
  'wedding' = 'scripts/data/unsplash/party-2.jpg'
  'congratulations' = 'scripts/data/batch2/grad-a.jpg'
  'good-morning' = 'scripts/data/unsplash/morning-1.jpg'
  'good-night' = 'scripts/data/batch2/night-b.jpg'
  'thank-you' = 'scripts/data/unsplash/gift-1.jpg'
  'best-wishes' = 'scripts/data/unsplash/morning-3.jpg'
  'custom' = 'scripts/data/unsplash/letter-1.jpg'
  'holi' = 'scripts/data/final-src/holi-src.jpg'
}
foreach ($key in $portrait.Keys) {
  Save-Crop $portrait[$key] "public/images/occasions/$key.jpg" 720 900 82
}

$hero = @{
  'celebration' = 'scripts/data/unsplash/birthday-2.jpg'
  'balloons' = 'scripts/data/unsplash/birthday-1.jpg'
  'wedding' = 'scripts/data/unsplash/party-2.jpg'
  'friends' = 'scripts/data/unsplash/friends-3.jpg'
  'love' = 'scripts/data/batch2/couple-b.jpg'
  'diwali' = 'scripts/data/final-src/diwali-src.jpg'
  'holi' = 'scripts/data/final-src/holi-src.jpg'
}
foreach ($key in $hero.Keys) {
  Save-Crop $hero[$key] "public/images/hero/$key.jpg" 1600 1000 80
}

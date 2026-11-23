Add-Type -AssemblyName System.Drawing

function Save-Crop {
  param([string]$src, [string]$dest, [int]$tw, [int]$th, [int]$quality = 82)
  $img = [System.Drawing.Image]::FromFile((Resolve-Path $src))
  $scale = [Math]::Max($tw / $img.Width, $th / $img.Height)
  $sw = [int]($tw / $scale); $sh = [int]($th / $scale)
  $sx = [int](($img.Width - $sw) / 2); $sy = [int](($img.Height - $sh) / 2)
  $bmp = New-Object System.Drawing.Bitmap($tw, $th)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.PixelOffsetMode = 'HighQuality'
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0,0,$tw,$th)), (New-Object System.Drawing.Rectangle($sx,$sy,$sw,$sh)), [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose(); $img.Dispose()
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
  $bmp.Save($dest, $codec, $params)
  $bmp.Dispose()
}

Save-Crop 'scripts/data/unsplash/wedding-2.jpg' 'public/images/occasions/wedding.jpg' 720 900 82
Save-Crop 'scripts/data/unsplash/wedding-2.jpg' 'public/images/hero/wedding.jpg' 1600 1000 80
Write-Output 'done'

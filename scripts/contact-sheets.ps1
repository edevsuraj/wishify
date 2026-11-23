Add-Type -AssemblyName System.Drawing

$groups = @(
  @{ name = 'core-a'; ids = @('birthday','anniversary','love','friendship','wedding','congratulations') },
  @{ name = 'core-b'; ids = @('good-morning','good-night','thank-you','best-wishes','festival','custom') },
  @{ name = 'hindu-a'; ids = @('diwali','holi','raksha-bandhan','janmashtami','ganesh-chaturthi','navratri') },
  @{ name = 'hindu-b'; ids = @('durga-puja','ram-navami','makar-sankranti','maha-shivratri','karwa-chauth','dussehra') },
  @{ name = 'islamic-a'; ids = @('eid-al-fitr','eid-al-adha','ramadan','ramadan-mubarak','islamic-new-year','milad-un-nabi') },
  @{ name = 'christian-sikh'; ids = @('christmas','easter','good-friday','new-year','thanksgiving','gurpurab','vaisakhi','bandi-chhor-divas') },
  @{ name = 'buddhist-jain'; ids = @('buddha-purnima','vesak','mahavir-jayanti','paryushan','jain-diwali') },
  @{ name = 'cultural'; ids = @('independence-day','republic-day','onam','pongal','bihu','lohri') }
)

$data = Get-Content 'scripts/data/openverse-candidates.json' -Raw | ConvertFrom-Json
$cellW = 176; $cellH = 158; $labelW = 138; $pad = 8
$font = New-Object System.Drawing.Font('Segoe UI', 10)
$small = New-Object System.Drawing.Font('Segoe UI', 7)
$brush = [System.Drawing.Brushes]::White

foreach ($group in $groups) {
  $rows = $group.ids.Count
  $w = $labelW + 6 * $cellW + $pad
  $h = $rows * $cellH + 34
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.Clear([System.Drawing.Color]::FromArgb(24, 20, 18))
  $g.DrawString($group.name, (New-Object System.Drawing.Font('Segoe UI', 12, 'Bold')), $brush, 8, 8)

  $y = 34
  foreach ($id in $group.ids) {
    $g.DrawString($id, $font, $brush, 8, $y + 18)
    $items = $data.$id
    for ($i = 0; $i -lt 6; $i++) {
      $x = $labelW + $i * $cellW
      $path = "scripts/data/thumbs/$id-$i.jpg"
      if (Test-Path $path) {
        try {
          $img = [System.Drawing.Image]::FromFile((Resolve-Path $path))
          $ratio = [Math]::Min(($cellW - 8) / $img.Width, 120 / $img.Height)
          $dw = [int]($img.Width * $ratio); $dh = [int]($img.Height * $ratio)
          $g.DrawImage($img, $x + [int](($cellW - $dw) / 2), $y + 2, $dw, $dh)
          $img.Dispose()
        } catch {}
        $title = ''
        if ($items -and $items.Count -gt $i) {
          $title = [string]$items[$i].title
          if ($title.Length -gt 30) { $title = $title.Substring(0, 30) }
        }
        $g.DrawString("[$i] $title", $small, $brush, $x + 4, $y + 126)
      }
    }
    $y += $cellH
  }
  $g.Dispose()
  $bmp.Save("scripts/data/sheet-$($group.name).jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $bmp.Dispose()
  Write-Output "sheet-$($group.name).jpg"
}

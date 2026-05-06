Add-Type -AssemblyName System.Drawing

function Create-LuxeIcon {
    param([int]$size, [string]$path)
    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = 'AntiAlias'
    $g.TextRenderingHint = 'AntiAliasGridFit'

    # Rounded rectangle background with gradient
    $rect = New-Object System.Drawing.Rectangle 0, 0, $size, $size
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, ([System.Drawing.Color]::FromArgb(16, 185, 129)), ([System.Drawing.Color]::FromArgb(5, 150, 105)), 45.0
    $radius = [int]($size * 0.22)
    $path1 = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path1.AddArc(0, 0, $radius * 2, $radius * 2, 180, 90)
    $path1.AddArc($size - $radius * 2, 0, $radius * 2, $radius * 2, 270, 90)
    $path1.AddArc($size - $radius * 2, $size - $radius * 2, $radius * 2, $radius * 2, 0, 90)
    $path1.AddArc(0, $size - $radius * 2, $radius * 2, $radius * 2, 90, 90)
    $path1.CloseFigure()
    $g.FillPath($brush, $path1)

    # White diamond shape
    $diaSize = [int]($size * 0.5)
    $cx = $size / 2.0
    $cy = $size / 2.0
    $diamond = @(
        (New-Object System.Drawing.PointF $cx, ($cy - $diaSize / 2.0)),
        (New-Object System.Drawing.PointF ($cx + $diaSize / 2.0), $cy),
        (New-Object System.Drawing.PointF $cx, ($cy + $diaSize / 2.0)),
        (New-Object System.Drawing.PointF ($cx - $diaSize / 2.0), $cy)
    )
    $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(242, 255, 255, 255))
    $g.FillPolygon($whiteBrush, $diamond)

    # 'L' letter centered on the diamond
    $fontSize = [int]($size * 0.32)
    $font = New-Object System.Drawing.Font 'Arial', $fontSize, ([System.Drawing.FontStyle]::Bold)
    $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(16, 185, 129))
    $textSize = $g.MeasureString('L', $font)
    $g.DrawString('L', $font, $textBrush, $cx - $textSize.Width / 2.0, $cy - $textSize.Height / 2.0)

    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Created: $path ($size x $size)" -ForegroundColor Green
}

Set-Location -Path 'C:\Users\mouni\OneDrive\Documents\SB\LuxePOS-Web'
Create-LuxeIcon -size 192 -path 'icon-192.png'
Create-LuxeIcon -size 512 -path 'icon-512.png'
Create-LuxeIcon -size 512 -path 'icon-512-maskable.png'

Write-Host ""
Write-Host "[OK] 3 icones generees pour PWA" -ForegroundColor Cyan

param(
  [string]$Proyecto = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'

$fotos = Join-Path $Proyecto 'assets\fotos'
$salida = Join-Path $Proyecto 'assets\fotos-corporativas'
$logo = Join-Path $Proyecto 'assets\logo\icono-512.png'

$carpetas = @(
  '01-fumigacion-exterior',
  '02-fumigacion-interior',
  '03-inspeccion-monitoreo',
  '04-seleccion-marca',
  '05-seleccion-enmarcada',
  '06-fumigacion-exterior-enmarcada'
)

foreach ($carpeta in $carpetas) {
  New-Item -ItemType Directory -Force -Path (Join-Path $salida $carpeta) | Out-Null
}

$interior = @(13, 14, 21, 22, 23, 27, 28, 29, 30, 31, 32, 38, 49, 51, 52)
$inspeccion = 53..67
$duplicados = @(6, 7)

function Get-Categoria([int]$numero) {
  if ($numero -in $inspeccion) { return '03-inspeccion-monitoreo' }
  if ($numero -in $interior) { return '02-fumigacion-interior' }
  return '01-fumigacion-exterior'
}

$archivos = Get-ChildItem -LiteralPath $fotos -Filter '*.jpeg' -File |
  Sort-Object { [int]$_.BaseName }

foreach ($archivo in $archivos) {
  $numero = [int]$archivo.BaseName
  if ($numero -in $duplicados) { continue }

  $categoria = Get-Categoria $numero
  $destino = Join-Path (Join-Path $salida $categoria) ('foto-{0:D2}-mejorada.jpg' -f $numero)

  & ffmpeg -hide_banner -loglevel error -y -i $archivo.FullName `
    -vf 'eq=contrast=1.06:brightness=0.012:saturation=1.08:gamma=1.02,unsharp=5:5:0.42:5:5:0.0' `
    -q:v 2 $destino

  if ($LASTEXITCODE -ne 0) {
    throw "No se pudo procesar $($archivo.FullName)"
  }
}

Add-Type -AssemblyName System.Drawing

function Save-Jpeg([System.Drawing.Bitmap]$imagen, [string]$ruta, [long]$calidad = 92) {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq 'image/jpeg' } |
    Select-Object -First 1
  $parametros = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $parametros.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality,
    $calidad
  )
  $imagen.Save($ruta, $codec, $parametros)
  $parametros.Dispose()
}

function Draw-CoverImage(
  [System.Drawing.Graphics]$grafico,
  [System.Drawing.Image]$imagen,
  [System.Drawing.Rectangle]$destino
) {
  $escala = [Math]::Max($destino.Width / $imagen.Width, $destino.Height / $imagen.Height)
  $anchoOrigen = $destino.Width / $escala
  $altoOrigen = $destino.Height / $escala
  $xOrigen = ($imagen.Width - $anchoOrigen) / 2
  $yOrigen = ($imagen.Height - $altoOrigen) / 2
  $origen = New-Object System.Drawing.RectangleF($xOrigen, $yOrigen, $anchoOrigen, $altoOrigen)
  $destinoF = New-Object System.Drawing.RectangleF(
    $destino.X,
    $destino.Y,
    $destino.Width,
    $destino.Height
  )
  $grafico.DrawImage($imagen, $destinoF, $origen, [System.Drawing.GraphicsUnit]::Pixel)
}

$seleccion = @(4, 8, 14, 20, 23, 32, 34, 37, 47, 52, 55, 63)
$logoImagen = [System.Drawing.Image]::FromFile($logo)
$navy = [System.Drawing.Color]::FromArgb(2, 33, 63)
$green = [System.Drawing.Color]::FromArgb(74, 155, 24)
$teal = [System.Drawing.Color]::FromArgb(0, 159, 165)

try {
  foreach ($numero in $seleccion) {
    $categoria = Get-Categoria $numero
    $origen = Join-Path (Join-Path $salida $categoria) ('foto-{0:D2}-mejorada.jpg' -f $numero)
    $destino = Join-Path (Join-Path $salida '04-seleccion-marca') ('dayped-corporativa-{0:D2}.jpg' -f $numero)

    $foto = [System.Drawing.Image]::FromFile($origen)
    $lienzo = New-Object System.Drawing.Bitmap 1080, 1350
    $grafico = [System.Drawing.Graphics]::FromImage($lienzo)
    $grafico.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $grafico.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $grafico.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    try {
      $grafico.Clear([System.Drawing.Color]::White)
      Draw-CoverImage $grafico $foto (New-Object System.Drawing.Rectangle 0, 0, 1080, 1178)
      $grafico.FillRectangle((New-Object System.Drawing.SolidBrush $teal), 0, 1178, 1080, 12)
      $grafico.FillRectangle((New-Object System.Drawing.SolidBrush $navy), 0, 1190, 1080, 160)

      $grafico.FillRectangle([System.Drawing.Brushes]::White, 36, 1205, 126, 126)
      $grafico.DrawImage($logoImagen, 42, 1211, 114, 114)

      $fuenteTitulo = New-Object System.Drawing.Font('Montserrat', 42, [System.Drawing.FontStyle]::Bold)
      $fuenteSub = New-Object System.Drawing.Font('Open Sans', 19, [System.Drawing.FontStyle]::Bold)
      try {
        $grafico.DrawString('DAYPED', $fuenteTitulo, [System.Drawing.Brushes]::White, 190, 1201)
        $grafico.DrawString('CONTROL AMBIENTAL', $fuenteSub, (New-Object System.Drawing.SolidBrush $green), 194, 1270)
      }
      finally {
        $fuenteTitulo.Dispose()
        $fuenteSub.Dispose()
      }

      Save-Jpeg $lienzo $destino 94
    }
    finally {
      $grafico.Dispose()
      $lienzo.Dispose()
      $foto.Dispose()
    }
  }
}
finally {
  $logoImagen.Dispose()
}

foreach ($numero in $seleccion) {
  $origen = Join-Path (Join-Path $salida '04-seleccion-marca') ('dayped-corporativa-{0:D2}.jpg' -f $numero)
  $destino = Join-Path (Join-Path $salida '05-seleccion-enmarcada') ('dayped-marco-profesional-{0:D2}.jpg' -f $numero)
  $pieza = [System.Drawing.Image]::FromFile($origen)
  $lienzo = New-Object System.Drawing.Bitmap 1080, 1350
  $grafico = [System.Drawing.Graphics]::FromImage($lienzo)
  $grafico.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $grafico.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $grafico.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

  $brochaNavy = New-Object System.Drawing.SolidBrush $navy
  $brochaTeal = New-Object System.Drawing.SolidBrush $teal
  $brochaSombra = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 2, 33, 63))
  $plumaGreen = New-Object System.Drawing.Pen $green, 8

  try {
    # Marco exterior sobrio, doble filete de marca y sombra interior.
    $grafico.Clear($navy)
    $grafico.FillRectangle([System.Drawing.Brushes]::White, 18, 18, 1044, 1314)
    $grafico.FillRectangle($brochaTeal, 28, 28, 1024, 1294)
    $grafico.FillRectangle([System.Drawing.Brushes]::White, 34, 34, 1012, 1282)
    $grafico.FillRectangle($brochaSombra, 48, 58, 996, 1245)
    $grafico.DrawImage($pieza, 42, 52, 996, 1245)

    # Esquinas verdes discretas para dar identidad sin saturar la fotografía.
    $grafico.DrawLine($plumaGreen, 34, 34, 190, 34)
    $grafico.DrawLine($plumaGreen, 34, 34, 34, 190)
    $grafico.DrawLine($plumaGreen, 1046, 1316, 890, 1316)
    $grafico.DrawLine($plumaGreen, 1046, 1316, 1046, 1160)

    Save-Jpeg $lienzo $destino 95
  }
  finally {
    $plumaGreen.Dispose()
    $brochaSombra.Dispose()
    $brochaTeal.Dispose()
    $brochaNavy.Dispose()
    $grafico.Dispose()
    $lienzo.Dispose()
    $pieza.Dispose()
  }
}

$origenExterior = Join-Path $salida '01-fumigacion-exterior'
$destinoExterior = Join-Path $salida '06-fumigacion-exterior-enmarcada'
$logoMarco = [System.Drawing.Image]::FromFile($logo)

try {
  Get-ChildItem -LiteralPath $origenExterior -File -Filter '*.jpg' |
    Sort-Object Name |
    ForEach-Object {
      $foto = [System.Drawing.Image]::FromFile($_.FullName)
      $ancho = $foto.Width + 96
      $alto = $foto.Height + 156
      $lienzo = New-Object System.Drawing.Bitmap $ancho, $alto
      $grafico = [System.Drawing.Graphics]::FromImage($lienzo)
      $grafico.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $grafico.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $grafico.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

      $brochaTeal = New-Object System.Drawing.SolidBrush $teal
      $brochaNavy = New-Object System.Drawing.SolidBrush $navy
      $brochaGreen = New-Object System.Drawing.SolidBrush $green
      $plumaGreen = New-Object System.Drawing.Pen $green, 7
      $fuenteTitulo = New-Object System.Drawing.Font('Montserrat', 30, [System.Drawing.FontStyle]::Bold)
      $fuenteSub = New-Object System.Drawing.Font('Open Sans', 13, [System.Drawing.FontStyle]::Bold)

      try {
        # Marco adaptable: conserva todos los pixeles de la fotografía y su orientación.
        $grafico.Clear($navy)
        $grafico.FillRectangle([System.Drawing.Brushes]::White, 16, 16, $ancho - 32, $alto - 32)
        $grafico.FillRectangle($brochaTeal, 28, 28, $ancho - 56, $alto - 56)
        $grafico.FillRectangle([System.Drawing.Brushes]::White, 34, 34, $ancho - 68, $alto - 68)
        $grafico.DrawImage($foto, 48, 48, $foto.Width, $foto.Height)

        $pieY = 48 + $foto.Height
        $grafico.FillRectangle($brochaTeal, 48, $pieY, $foto.Width, 8)
        $grafico.FillRectangle($brochaNavy, 48, $pieY + 8, $foto.Width, 84)
        $grafico.FillRectangle([System.Drawing.Brushes]::White, 62, $pieY + 16, 68, 68)
        $grafico.DrawImage($logoMarco, 66, $pieY + 20, 60, 60)
        $grafico.DrawString('DAYPED', $fuenteTitulo, [System.Drawing.Brushes]::White, 150, $pieY + 8)
        $grafico.DrawString('CONTROL AMBIENTAL', $fuenteSub, $brochaGreen, 153, $pieY + 55)

        # Detalles verdes discretos en diagonal para cerrar el marco.
        $grafico.DrawLine($plumaGreen, 34, 34, 165, 34)
        $grafico.DrawLine($plumaGreen, 34, 34, 34, 165)
        $grafico.DrawLine($plumaGreen, $ancho - 34, $alto - 34, $ancho - 165, $alto - 34)
        $grafico.DrawLine($plumaGreen, $ancho - 34, $alto - 34, $ancho - 34, $alto - 165)

        $nombre = $_.BaseName -replace '-mejorada$', '-marco-profesional'
        Save-Jpeg $lienzo (Join-Path $destinoExterior ($nombre + '.jpg')) 95
      }
      finally {
        $fuenteSub.Dispose()
        $fuenteTitulo.Dispose()
        $plumaGreen.Dispose()
        $brochaGreen.Dispose()
        $brochaNavy.Dispose()
        $brochaTeal.Dispose()
        $grafico.Dispose()
        $lienzo.Dispose()
        $foto.Dispose()
      }
    }
}
finally {
  $logoMarco.Dispose()
}

Write-Output "Coleccion creada en: $salida"

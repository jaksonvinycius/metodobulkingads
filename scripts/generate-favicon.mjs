import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')
const appDir = join(__dirname, '..', 'app')

// SVG with VJ initials — radial gradient + rounded square
const svgSrc = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bg" cx="40%" cy="35%" r="70%">
      <stop offset="0%" stop-color="hsl(30,55%,58%)"/>
      <stop offset="100%" stop-color="hsl(30,50%,38%)"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" rx="102" ry="102" fill="url(#bg)"/>
  <text
    x="256"
    y="332"
    text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-weight="700"
    font-size="228"
    letter-spacing="-8"
    fill="white"
    opacity="0.97"
  >VJ</text>
</svg>
`.trim()

const svgBuf = Buffer.from(svgSrc)

async function run() {
  await sharp(svgBuf)
    .resize(512, 512)
    .png({ compressionLevel: 9 })
    .toFile(join(publicDir, 'favicon-512.png'))
  console.log('✓ public/favicon-512.png')

  // 192×192 PNG (PWA)
  await sharp(svgBuf)
    .resize(192, 192)
    .png({ compressionLevel: 9 })
    .toFile(join(publicDir, 'favicon-192.png'))
  console.log('✓ public/favicon-192.png')

  // 32×32 PNG
  const png32 = await sharp(svgBuf)
    .resize(32, 32)
    .png({ compressionLevel: 9 })
    .toBuffer()
  writeFileSync(join(publicDir, 'favicon-32.png'), png32)
  console.log('✓ public/favicon-32.png')

  // 16×16 PNG
  const png16 = await sharp(svgBuf)
    .resize(16, 16)
    .png({ compressionLevel: 9 })
    .toBuffer()
  writeFileSync(join(publicDir, 'favicon-16.png'), png16)
  console.log('✓ public/favicon-16.png')

  // Apple touch icon (180×180)
  await sharp(svgBuf)
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(join(publicDir, 'apple-touch-icon.png'))
  console.log('✓ public/apple-touch-icon.png')

  // SVG source (for browsers that support SVG favicon)
  writeFileSync(join(publicDir, 'favicon.svg'), svgSrc)
  console.log('✓ public/favicon.svg')

  // favicon.ico — ICO file with embedded PNG (Vista+ format)
  // ICO header: ICONDIR (6 bytes) + ICONDIRENTRY×2 (16 bytes each) + PNG data
  const offset32 = 6 + 16 * 2           // data starts after header + 2 entries
  const offset16 = offset32 + png32.length

  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)  // reserved
  header.writeUInt16LE(1, 2)  // type: ICO
  header.writeUInt16LE(2, 4)  // image count: 2

  const entry32 = Buffer.alloc(16)
  entry32.writeUInt8(32, 0)              // width
  entry32.writeUInt8(32, 1)              // height
  entry32.writeUInt8(0, 2)              // color count (0 = more than 256)
  entry32.writeUInt8(0, 3)              // reserved
  entry32.writeUInt16LE(1, 4)           // color planes
  entry32.writeUInt16LE(32, 6)          // bits per pixel
  entry32.writeUInt32LE(png32.length, 8) // size
  entry32.writeUInt32LE(offset32, 12)   // offset

  const entry16 = Buffer.alloc(16)
  entry16.writeUInt8(16, 0)
  entry16.writeUInt8(16, 1)
  entry16.writeUInt8(0, 2)
  entry16.writeUInt8(0, 3)
  entry16.writeUInt16LE(1, 4)
  entry16.writeUInt16LE(32, 6)
  entry16.writeUInt32LE(png16.length, 8)
  entry16.writeUInt32LE(offset16, 12)

  const ico = Buffer.concat([header, entry32, entry16, png32, png16])
  writeFileSync(join(appDir, 'favicon.ico'), ico)
  console.log('✓ app/favicon.ico')

  console.log('\nFavicon gerado com sucesso!')
}

run().catch(console.error)

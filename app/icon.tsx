import { ImageResponse } from 'next/og'

export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(145deg, #c8884a 0%, #8f5e2e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20%',
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: 228,
            fontWeight: 700,
            fontFamily: 'serif',
            letterSpacing: '-8px',
            lineHeight: 1,
          }}
        >
          VJ
        </span>
      </div>
    ),
    { ...size }
  )
}

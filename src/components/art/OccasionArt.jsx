import { useId } from 'react'

/**
 * Bespoke SVG artwork for every occasion.
 *
 * Cultural and religious occasions deliberately use symbolic, respectful
 * compositions (lamps, lanterns, flowers, architecture) instead of stock
 * photography that could misrepresent a tradition. Photography is used for
 * the everyday occasions where a real moment adds warmth.
 */

const PALETTE_FALLBACK = {
  sky: ['#160F0B', '#332218', '#080604'],
  accent: '#E8C87A',
  glow: '#FF9A4A',
  ink: '#FFF8EC',
  muted: '#D9BE9E',
}

const STAR_POINTS = [
  [32, 18, 1.4],
  [72, 9, 1],
  [118, 24, 0.8],
  [164, 12, 1.2],
  [212, 28, 0.7],
  [256, 10, 1.1],
  [304, 22, 0.9],
  [348, 12, 1.5],
  [378, 34, 1],
  [22, 62, 0.8],
  [92, 52, 1.1],
  [142, 70, 0.7],
  [196, 48, 1],
  [246, 66, 0.8],
  [292, 44, 1.3],
  [342, 58, 0.9],
  [382, 78, 1.1],
  [52, 118, 0.7],
  [122, 108, 1],
  [178, 132, 0.6],
  [228, 100, 0.9],
  [278, 124, 0.8],
  [332, 104, 1.2],
  [372, 142, 0.8],
]

function Sparkle({ x, y, r = 1.2, color = '#FFF3D6', opacity = 0.7, delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <path
        d={`M0 ${-r * 3}C${r * 0.5} ${-r} ${r} ${-r * 0.5} ${r * 3} 0C${r} ${r * 0.5} ${r * 0.5} ${r} 0 ${r * 3}C${-r * 0.5} ${r} ${-r} ${r * 0.5} ${-r * 3} 0C${-r} ${-r * 0.5} ${-r * 0.5} ${-r} 0 ${-r * 3}Z`}
        fill={color}
        className="fx animate-twinkle"
        style={{ animationDelay: `${delay}s`, animationDuration: '4.8s' }}
      />
    </g>
  )
}

function Flame({ x, y, scale = 1, color, inner = '#FFF6D8' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="-2" rx="16" ry="22" fill={color} opacity="0.18" filter="url(#art-blur)" />
      <path
        d="M0 -24c6 8 10 13 10 19a10 10 0 1 1-20 0c0-6 4-11 10-19Z"
        fill={color}
        className="fx animate-twinkle"
        style={{ animationDuration: '2.8s' }}
      />
      <path d="M0 -13c3 4 5 6.5 5 10a5 5 0 1 1-10 0c0-3.5 2-6 5-10Z" fill={inner} />
    </g>
  )
}

function Diya({ x, y, scale = 1, color = '#F7B24A', bowl = '#8A4420' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="7" rx="26" ry="7" fill="#000" opacity="0.28" />
      <path d="M-24 0c2 10 10 15 24 15S22 10 24 0c0-3-4-4-8-4H-16c-4 0-8 1-8 4Z" fill={bowl} />
      <path d="M-24 0c2 6 10 9 24 9S22 6 24 0" fill="none" stroke={color} strokeOpacity="0.35" strokeWidth="1.4" />
      <ellipse cx="0" cy="-1" rx="18" ry="4" fill={color} opacity="0.22" />
      <Flame x={0} y={-4} scale={0.9} color={color} />
    </g>
  )
}

function Lantern({ x, y, scale = 1, color = '#E9C97B', drop = 46 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <line x1="0" y1={-drop} x2="0" y2="-18" stroke={color} strokeOpacity="0.5" strokeWidth="1" />
      <ellipse cx="0" cy="-8" rx="30" ry="34" fill={color} opacity="0.16" filter="url(#art-blur)" />
      <path d="M-12 -18h24l-3 8h-18Z" fill={color} opacity="0.8" />
      <path d="M-14 -8h28l5 30c-10 8-28 8-38 0Z" fill={color} opacity="0.16" stroke={color} strokeOpacity="0.7" strokeWidth="1.2" />
      <path d="M-8 4h16l3 18c-7 4-15 4-22 0Z" fill={color} opacity="0.75" />
      <ellipse cx="0" cy="4" rx="4" ry="6" fill="#FFF9E4" />
      <path d="M-9 24h18l-2 5h-14Z" fill={color} opacity="0.85" />
    </g>
  )
}

function Mandala({ cx, cy, r, color, opacity = 0.5, petals = 16 }) {
  const petal = Array.from({ length: petals }, (_, index) => {
    const angle = (index / petals) * 360
    return (
      <g key={index} transform={`rotate(${angle} ${cx} ${cy})`}>
        <ellipse cx={cx} cy={cy - r * 0.78} rx={r * 0.11} ry={r * 0.24} fill="none" stroke={color} strokeWidth="1.2" opacity={opacity} />
      </g>
    )
  })
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="1.2" opacity={opacity} />
      <circle cx={cx} cy={cy} r={r * 0.72} fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 6" opacity={opacity * 0.8} />
      <circle cx={cx} cy={cy} r={r * 0.42} fill="none" stroke={color} strokeWidth="1" opacity={opacity * 0.7} />
      {petal}
    </g>
  )
}

function Mosque({ x = 200, y = 430, scale = 1, color = '#07100C', accent = '#E8C87A' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill={color}>
      <rect x="-150" y="-46" width="300" height="50" rx="3" />
      <rect x="-78" y="-86" width="156" height="44" rx="4" />
      <path d="M-54 -86c0-44 22-68 54-68s54 24 54 68Z" />
      <path d="M0 -158c4 8 8 12 8 18a8 8 0 0 1-16 0c0-6 4-10 8-18Z" fill={accent} opacity="0.9" />
      <path d="M-118 -84c0-24 12-38 30-38s30 14 30 38Z" />
      <path d="M58 -84c0-24 12-38 30-38s30 14 30 38Z" />
      <rect x="-156" y="-166" width="16" height="122" rx="6" />
      <rect x="140" y="-166" width="16" height="122" rx="6" />
      <path d="M-156 -166c0-10 8-18 8-18s8 8 8 18Z" fill={accent} opacity="0.85" />
      <path d="M140 -166c0-10 8-18 8-18s8 8 8 18Z" fill={accent} opacity="0.85" />
      <path d="M-22 -30v34h44v-34c0-14-10-24-22-24S-22 -44 -22 -30Z" fill={accent} opacity="0.24" />
    </g>
  )
}

function Gurdwara({ color = '#120A04', accent = '#F2C25E' }) {
  return (
    <g>
      <g fill={color} transform="translate(200 330)">
        <rect x="-150" y="0" width="300" height="70" rx="4" />
        <path d="M-70 0c0-34 20-54 70-54s70 20 70 54Z" />
        <path d="M-34 0c0-22 12-34 34-34s34 12 34 34Z" />
        <rect x="-92" y="-44" width="14" height="44" />
        <rect x="78" y="-44" width="14" height="44" />
        <path d="M-106 -44c0-18 8-30 8-30s8 12 8 30Z" />
        <path d="M64 -44c0-18 8-30 8-30s8 12 8 30Z" />
        <path d="M0 -72c5 9 9 14 9 21a9 9 0 0 1-18 0c0-7 4-12 9-21Z" fill={accent} />
      </g>
      <g opacity="0.4" transform="translate(200 430)">
        <ellipse cx="0" cy="0" rx="150" ry="24" fill={accent} opacity="0.12" />
        <path d="M-130 0h260" stroke={accent} strokeWidth="1" strokeOpacity="0.25" />
        <path d="M-100 8h200" stroke={accent} strokeWidth="1" strokeOpacity="0.15" />
      </g>
    </g>
  )
}

function Hill({ y = 400, color, opacity = 1 }) {
  return (
    <path
      d={`M0 500V${y + 30}c40-34 74-38 112-10 34 24 74 24 116-8 46-36 96-28 172 12v76Z`}
      fill={color}
      opacity={opacity}
    />
  )
}

function Bokeh({ color, seed = 0, count = 12 }) {
  return Array.from({ length: count }, (_, index) => {
    const left = ((index * 73 + 31 + seed * 17) % 360) + 20
    const top = ((index * 97 + 43 + seed * 13) % 380) + 50
    const r = 4 + ((index * 7 + seed) % 13)
    return <circle key={index} cx={left} cy={top} r={r} fill={color} opacity={0.05 + (index % 4) * 0.03} />
  })
}

function Confetti({ colors, count = 26, seed = 0 }) {
  return Array.from({ length: count }, (_, index) => {
    const left = (index * 53 + 17 + seed * 11) % 390
    const top = (index * 89 + 31 + seed * 7) % 480
    const rotate = (index * 47) % 180
    const color = colors[index % colors.length]
    return (
      <rect
        key={index}
        x={left}
        y={top}
        width={3 + (index % 3) * 2}
        height={7 + (index % 4) * 3}
        rx="1"
        fill={color}
        opacity={0.35 + (index % 3) * 0.2}
        transform={`rotate(${rotate} ${left} ${top})`}
      />
    )
  })
}

/* ------------------------------------------------------------------ scenes */

function DiyaScene({ p, variant }) {
  const diyas = [58, 130, 200, 270, 342]
  return (
    <>
      <Bokeh color={p.accent} count={16} />
      <g opacity="0.55">
        <Mandala cx="200" cy="420" r="150" color={p.accent} opacity="0.28" petals={24} />
      </g>
      {variant === 'jain' ? null : null}
      <g>
        {diyas.map((x, index) => (
          <Diya key={x} x={x} y={410 + (index % 2) * 14} scale={index === 2 ? 1.35 : 0.95} color={p.accent} bowl="#6B3216" />
        ))}
      </g>
      <g opacity="0.7">
        {[
          [88, 140, 1.4],
          [160, 96, 1],
          [246, 130, 1.6],
          [316, 88, 0.9],
          [350, 170, 1.1],
          [120, 210, 0.8],
        ].map(([x, y, r], index) => (
          <Sparkle key={`s-${x}`} x={x} y={y} r={r} color={p.accent} opacity={0.55} delay={index * 0.7} />
        ))}
      </g>
      <g opacity="0.5">
        {[0, 1, 2, 3, 4].map((index) => (
          <path
            key={index}
            d={`M${40 + index * 80} 0c${8 + index * 4} 40 ${-6 + index * 6} 70 ${18 + index * 3} 112`}
            fill="none"
            stroke={p.accent}
            strokeOpacity="0.22"
            strokeWidth="1"
            strokeDasharray="2 7"
          />
        ))}
      </g>
    </>
  )
}

function HoliScene({ p }) {
  return (
    <>
      <g filter="url(#art-blur)" opacity="0.8">
        <circle cx="110" cy="180" r="92" fill="#FF6FA5" opacity="0.55" />
        <circle cx="290" cy="150" r="78" fill="#FFD166" opacity="0.45" />
        <circle cx="250" cy="300" r="110" fill="#6CD8C4" opacity="0.38" />
        <circle cx="90" cy="350" r="80" fill="#A97BE8" opacity="0.42" />
        <circle cx="330" cy="390" r="70" fill="#FF8A5C" opacity="0.4" />
      </g>
      <g opacity="0.8">
        {Array.from({ length: 46 }, (_, index) => (
          <circle
            key={index}
            cx={(index * 67 + 23) % 390}
            cy={(index * 41 + 57) % 460}
            r={2 + (index % 5)}
            fill={['#FFD166', '#FF6FA5', '#7FE3D4', '#A97BE8', '#FF8A5C'][index % 5]}
            opacity={0.3 + (index % 3) * 0.2}
          />
        ))}
      </g>
      <g transform="translate(200 300)" opacity="0.9">
        <circle r="86" fill="none" stroke="#FFF3D6" strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="3 9" />
        <circle r="110" fill="none" stroke="#FFF3D6" strokeOpacity="0.12" strokeWidth="1" />
      </g>
      <g opacity="0.55">
        {[
          [72, 110],
          [312, 90],
          [352, 240],
          [60, 300],
          [145, 80],
          [250, 70],
        ].map(([x, y], index) => (
          <Sparkle key={index} x={x} y={y} r={1.3} color="#FFF3D6" opacity={0.7} delay={index * 0.6} />
        ))}
      </g>
    </>
  )
}

function RakhiScene({ p }) {
  return (
    <>
      <Bokeh color={p.accent} count={10} />
      <g>
        <path d="M0 290c80-48 140-34 200-4s120 46 200-2" fill="none" stroke={p.accent} strokeWidth="3" strokeOpacity="0.65" />
        <path d="M0 306c80-48 140-34 200-4s120 46 200-2" fill="none" stroke="#FFF3D6" strokeWidth="1" strokeOpacity="0.4" />
        <g transform="translate(200 288)">
          <circle r="46" fill={p.accent} opacity="0.18" />
          <circle r="34" fill="none" stroke={p.accent} strokeWidth="2" />
          <circle r="22" fill={p.accent} opacity="0.28" />
          {Array.from({ length: 12 }, (_, index) => (
            <ellipse
              key={index}
              cx="0"
              cy="-29"
              rx="5"
              ry="11"
              fill="none"
              stroke={p.accent}
              strokeOpacity="0.8"
              transform={`rotate(${index * 30})`}
            />
          ))}
          <circle r="7" fill="#FFF3D6" />
        </g>
      </g>
      <Diya x={120} y={430} scale={1.1} color={p.accent} bowl="#6B3216" />
      <Diya x={280} y={430} scale={1.1} color={p.accent} bowl="#6B3216" />
      <g transform="translate(200 420)">
        <ellipse cx="0" cy="10" rx="56" ry="12" fill="#000" opacity="0.25" />
        <ellipse cx="0" cy="0" rx="50" ry="12" fill="#D9C29A" opacity="0.9" />
        <circle cx="-16" cy="-10" r="12" fill={p.accent} opacity="0.85" />
        <circle cx="10" cy="-12" r="10" fill="#FFF3D6" opacity="0.85" />
        <circle cx="26" cy="-6" r="7" fill="#FFD166" opacity="0.8" />
      </g>
      <g opacity="0.5">
        {[0, 1, 2, 3].map((index) => (
          <Sparkle key={index} x={70 + index * 90} y={100 + (index % 2) * 50} r={1.2} color={p.accent} opacity={0.5} delay={index} />
        ))}
      </g>
    </>
  )
}

function PeacockScene({ p }) {
  return (
    <>
      <Bokeh color={p.accent} count={12} />
      <g transform="translate(140 300) rotate(-18)" opacity="0.95">
        <path d="M0 160C-8 90 -2 20 10-40" fill="none" stroke={p.accent} strokeOpacity="0.6" strokeWidth="2" />
        <ellipse cx="10" cy="-80" rx="46" ry="64" fill={p.accent} opacity="0.16" />
        <ellipse cx="10" cy="-80" rx="36" ry="52" fill="none" stroke={p.accent} strokeWidth="2" strokeOpacity="0.7" />
        <ellipse cx="10" cy="-80" rx="24" ry="36" fill="#0B1030" />
        <ellipse cx="10" cy="-80" rx="24" ry="36" fill="none" stroke={p.accent} strokeWidth="2" />
        <ellipse cx="10" cy="-80" rx="12" ry="20" fill={p.accent} opacity="0.9" />
        <ellipse cx="10" cy="-80" rx="5" ry="10" fill="#0B1030" />
        {Array.from({ length: 10 }, (_, index) => (
          <path
            key={index}
            d={`M${10 + Math.cos((index / 10) * Math.PI * 2) * 30} ${-80 + Math.sin((index / 10) * Math.PI * 2) * 44} l${Math.cos((index / 10) * Math.PI * 2) * 22} ${Math.sin((index / 10) * Math.PI * 2) * 30}`}
            stroke={p.accent}
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        ))}
      </g>
      <g transform="translate(268 220) rotate(24)" opacity="0.9">
        <rect x="-6" y="-90" width="12" height="180" rx="6" fill={p.accent} opacity="0.55" />
        <circle cx="-14" cy="-52" r="3" fill={p.accent} opacity="0.8" />
        <circle cx="-14" cy="-28" r="3" fill={p.accent} opacity="0.7" />
        <circle cx="-14" cy="-4" r="3" fill={p.accent} opacity="0.6" />
      </g>
      <g transform="translate(210 415)" opacity="0.9">
        <ellipse cx="0" cy="12" rx="62" ry="12" fill="#000" opacity="0.25" />
        <path d="M-46 0h92l-10 18c-18 8-54 8-72 0Z" fill="#C99A3F" opacity="0.75" />
        <path d="M-38 -10c0-14 12-24 38-24s38 10 38 24Z" fill="#F6E3B0" opacity="0.65" />
        <path d="M-14 -34c0-8 6-14 14-14s14 6 14 14" fill="none" stroke={p.accent} strokeWidth="2" />
      </g>
      <g transform="translate(300 90)">
        <path d="M0 0a40 40 0 1 0 40 40 32 32 0 1 1-40-40Z" fill={p.accent} opacity="0.8" />
      </g>
      <g opacity="0.5">
        {[0, 1, 2, 3, 4].map((index) => (
          <Sparkle key={index} x={50 + index * 76} y={90 + (index % 2) * 38} r={1.2} color={p.accent} opacity={0.55} delay={index} />
        ))}
      </g>
    </>
  )
}

function ModakScene({ p }) {
  const modaks = [
    [130, 408, 1],
    [200, 420, 1.2],
    [270, 408, 1],
    [165, 440, 0.85],
    [235, 440, 0.85],
  ]
  return (
    <>
      <Bokeh color={p.accent} count={12} />
      <g opacity="0.4">
        <path d="M56 340V180a144 144 0 0 1 288 0v160" fill="none" stroke={p.accent} strokeWidth="2" />
        <path d="M70 340V184a130 130 0 0 1 260 0v156" fill="none" stroke={p.accent} strokeOpacity="0.5" strokeWidth="1" strokeDasharray="3 7" />
      </g>
      <g opacity="0.5">
        {[96, 304].map((x, index) => (
          <g key={x}>
            <line x1={x} y1={110 + index * 20} x2={x} y2="150" stroke={p.accent} strokeOpacity="0.4" />
            <path d={`M${x - 10} 150h20l-3 8h-14Z`} fill={p.accent} opacity="0.55" />
          </g>
        ))}
      </g>
      <g transform="translate(200 430)">
        <ellipse cx="0" cy="20" rx="132" ry="24" fill="#000" opacity="0.28" />
        <ellipse cx="0" cy="8" rx="124" ry="22" fill="#C99A3F" opacity="0.5" />
        <ellipse cx="0" cy="2" rx="110" ry="17" fill="#E8C87A" opacity="0.25" />
      </g>
      {modaks.map(([x, y, s], index) => (
        <g key={index} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M0 -26c16 6 26 18 26 30 0 10-11 16-26 16s-26-6-26-16c0-12 10-24 26-30Z" fill="#F6E3B0" opacity="0.92" />
          <path d="M0 -26c-4 12-4 32 0 46M0 -26c8 10 12 28 12 44M0 -26c-8 10-12 28-12 44" fill="none" stroke={p.accent} strokeOpacity="0.5" strokeWidth="1" />
          <circle cx="0" cy="-28" r="3" fill={p.accent} />
        </g>
      ))}
      <g opacity="0.6">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <Sparkle key={index} x={60 + index * 58} y={100 + (index % 3) * 34} r={1.1} color={p.accent} opacity={0.5} delay={index * 0.4} />
        ))}
      </g>
    </>
  )
}

function GarbaScene({ p }) {
  const dancers = [
    [110, 330, 0.9, -8],
    [200, 300, 1.15, 0],
    [292, 332, 0.9, 8],
  ]
  return (
    <>
      <Bokeh color={p.accent} count={14} />
      <g opacity="0.4">
        <circle cx="200" cy="382" r="150" fill="none" stroke={p.accent} strokeWidth="1.5" strokeDasharray="4 10" />
        <circle cx="200" cy="382" r="120" fill="none" stroke={p.accent} strokeWidth="1" strokeOpacity="0.6" />
        <circle cx="200" cy="382" r="86" fill="none" stroke={p.accent} strokeWidth="1" strokeOpacity="0.4" />
      </g>
      {dancers.map(([x, y, s, rotate], index) => (
        <g key={index} transform={`translate(${x} ${y}) scale(${s}) rotate(${rotate})`} opacity="0.92">
          <circle cx="0" cy="-74" r="15" fill={p.ink} opacity="0.85" />
          <path d="M-8 -60c-3 18-2 34 3 52h10c5-18 6-34 3-52Z" fill={p.ink} opacity="0.9" />
          <path d="M-6 -58c-22 6-36 16-44 30" fill="none" stroke={p.ink} strokeWidth="7" strokeLinecap="round" opacity="0.9" />
          <path d="M6 -58c22 6 36 16 44 30" fill="none" stroke={p.ink} strokeWidth="7" strokeLinecap="round" opacity="0.9" />
          <path d="M-8 6h22l26 74c-14 10-52 10-66 0Z" fill={p.accent} opacity="0.75" />
          <path d="M-24 80h54" stroke={p.accent} strokeWidth="2" opacity="0.8" />
          <path d="M-44 -30l-22 4M44 -30l22 4" stroke={p.accent} strokeWidth="4" strokeLinecap="round" />
        </g>
      ))}
      <g opacity="0.6">
        {[0, 1, 2, 3, 4].map((index) => (
          <Sparkle key={index} x={50 + index * 78} y={80 + (index % 2) * 40} r={1.2} color={p.accent} opacity={0.6} delay={index * 0.5} />
        ))}
      </g>
    </>
  )
}

function DurgaScene({ p }) {
  return (
    <>
      <Bokeh color={p.accent} count={12} />
      <g opacity="0.55">
        <path d="M64 430V200a136 136 0 0 1 272 0v230" fill="none" stroke={p.accent} strokeWidth="2" />
        <path d="M82 430V206a118 118 0 0 1 236 0v224" fill="none" stroke={p.accent} strokeOpacity="0.5" strokeWidth="1" />
        <path d="M64 260h272M64 330h272" stroke={p.accent} strokeOpacity="0.2" strokeWidth="1" />
      </g>
      <g transform="translate(200 300)" opacity="0.92">
        <path d="M0 -96v150M-40 -76h80" stroke={p.accent} strokeWidth="4" strokeLinecap="round" />
        <path d="M-40 -76l-12 -22M0 -96l-10 -24M40 -76l12 -22" stroke={p.accent} strokeWidth="4" strokeLinecap="round" />
        <path d="M-18 54c0-28 8-44 18-44s18 16 18 44" fill="none" stroke={p.accent} strokeWidth="2" strokeOpacity="0.6" />
      </g>
      <g transform="translate(200 430)">
        <ellipse cx="0" cy="10" rx="118" ry="18" fill="#000" opacity="0.28" />
        <path d="M-52 0h104l-14 18c-22 8-54 8-76 0Z" fill="#C99A3F" opacity="0.65" />
        <ellipse cx="0" cy="-4" rx="44" ry="11" fill="#E8C87A" opacity="0.4" />
      </g>
      <g opacity="0.8">
        {[110, 290].map((x, index) => (
          <g key={x} transform={`translate(${x} 200)`}>
            <line x1="0" y1="-60" x2="0" y2="-20" stroke={p.accent} strokeOpacity="0.35" />
            <path d="M-14 -20h28l-4 10h-20Z" fill={p.accent} opacity="0.7" />
            <path d="M-10 -10h20l4 18c-8 5-20 5-28 0Z" fill={p.accent} opacity="0.3" stroke={p.accent} strokeOpacity="0.6" />
          </g>
        ))}
      </g>
      <g opacity="0.5">
        {[0, 1, 2, 3].map((index) => (
          <Sparkle key={index} x={70 + index * 90} y={100 + (index % 2) * 40} r={1.2} color={p.accent} opacity={0.55} delay={index} />
        ))}
      </g>
    </>
  )
}

function BowScene({ p }) {
  return (
    <>
      <Bokeh color={p.accent} count={10} />
      <g transform="translate(208 290) rotate(-24)" opacity="0.9">
        <path d="M0 -118c52 22 52 214 0 236" fill="none" stroke={p.accent} strokeWidth="4" strokeLinecap="round" />
        <path d="M0 -118c52 22 52 214 0 236" fill="none" stroke={p.ink} strokeOpacity="0.25" strokeWidth="1" />
        <line x1="0" y1="-124" x2="0" y2="124" stroke={p.accent} strokeWidth="1.4" strokeOpacity="0.8" />
        <path d="M-2 -150l8 22 22 6-22 6-8 22-6-22-22-6 22-6Z" fill={p.accent} opacity="0.75" />
      </g>
      <g transform="translate(322 140)" opacity="0.9">
        <line x1="0" y1="0" x2="0" y2="130" stroke={p.accent} strokeWidth="2" strokeOpacity="0.7" />
        <path d="M0 14c26 4 44 18 54 40-22-8-38-10-54-4Z" fill={p.accent} opacity="0.8" />
      </g>
      <g opacity="0.4">
        <path d="M60 430V250a140 140 0 0 1 280 0v180" fill="none" stroke={p.accent} strokeWidth="2" />
      </g>
      <g opacity="0.65">
        {[96, 200, 304].map((x, index) => (
          <Diya key={x} x={x} y={446} scale={index === 1 ? 1.1 : 0.8} color={p.accent} bowl="#4A2A10" />
        ))}
      </g>
      <g opacity="0.5">
        {[0, 1, 2, 3, 4].map((index) => (
          <Sparkle key={index} x={56 + index * 76} y={80 + (index % 2) * 42} r={1.2} color={p.accent} opacity={0.5} delay={index} />
        ))}
      </g>
    </>
  )
}

function KiteScene({ p }) {
  return (
    <>
      <Bokeh color={p.glow} count={10} />
      <g transform="translate(290 120)">
        <circle r="58" fill={p.accent} opacity="0.25" filter="url(#art-blur)" />
        <circle r="34" fill={p.accent} opacity="0.7" />
      </g>
      {[
        [120, 150, 42, -14],
        [236, 96, 30, 10],
        [188, 232, 22, -6],
      ].map(([x, y, size, rotate], index) => (
        <g key={index} transform={`translate(${x} ${y}) rotate(${rotate})`}>
          <path d={`M0 ${-size}L${size} 0L0 ${size}L${-size} 0Z`} fill={p.accent} opacity={0.9 - index * 0.15} />
          <path d={`M0 ${-size}V${size}M${-size} 0H${size}`} stroke={p.ink} strokeOpacity="0.35" strokeWidth="1" />
          <path d={`M0 ${size}c14 26-14 34 2 58s-10 30 2 44`} fill="none" stroke={p.accent} strokeOpacity="0.5" strokeWidth="1.2" />
        </g>
      ))}
      <Hill y="410" color="#041013" opacity="0.8" />
      <g transform="translate(200 430)">
        <path d="M-100 10h200" stroke={p.accent} strokeWidth="2" strokeOpacity="0.4" />
        {[130, 156, 182].map((x, index) => (
          <g key={x} transform={`translate(${x} -30) rotate(${index * 5 - 5})`} opacity="0.7">
            <path d="M0 0c4-44 4-74 0-108" stroke={p.accent} strokeWidth="5" strokeLinecap="round" />
            {[0, 1, 2, 3, 4].map((leaf) => (
              <path key={leaf} d={`M0 ${-24 - leaf * 16}c-14-2-22-8-26-16 12 0 22 4 26 10`} fill={p.accent} opacity="0.6" />
            ))}
          </g>
        ))}
      </g>
      <g opacity="0.4">
        <path d="M22 420c40-24 72-24 112 0" fill="none" stroke={p.ink} strokeOpacity="0.25" strokeWidth="1" />
        <path d="M260 420c40-24 72-24 112 0" fill="none" stroke={p.ink} strokeOpacity="0.25" strokeWidth="1" />
      </g>
    </>
  )
}

function TrishulScene({ p }) {
  return (
    <>
      <g opacity="0.8">
        {STAR_POINTS.slice(0, 18).map(([x, y, r], index) => (
          <Sparkle key={index} x={x} y={y} r={r} color={p.accent} opacity={0.55} delay={index * 0.25} />
        ))}
      </g>
      <g transform="translate(300 100)">
        <path d="M0 0a44 44 0 1 0 44 44 36 36 0 1 1-44-44Z" fill={p.accent} opacity="0.75" />
      </g>
      <g transform="translate(200 300)" opacity="0.95">
        <path d="M0 -130v240" stroke={p.accent} strokeWidth="5" strokeLinecap="round" />
        <path d="M-48 -100h96" stroke={p.accent} strokeWidth="5" strokeLinecap="round" />
        <path d="M-48 -100l-14-30M0 -130l-8-34M48 -100l14-30" stroke={p.accent} strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="0" cy="-24" rx="30" ry="20" fill="none" stroke={p.accent} strokeWidth="3" strokeOpacity="0.7" />
        <path d="M-30 -24c0-16 12-28 30-28s30 12 30 28" fill="none" stroke={p.accent} strokeWidth="1" strokeOpacity="0.5" />
        <path d="M0 20v54" stroke={p.accent} strokeWidth="2" strokeOpacity="0.5" />
      </g>
      <g opacity="0.5">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <circle key={index} cx={200 + Math.cos((index / 8) * Math.PI * 2) * 86} cy={330 + Math.sin((index / 8) * Math.PI * 2) * 70} r="5" fill={p.accent} opacity="0.55" />
        ))}
      </g>
      <Hill y="430" color="#04060D" opacity="0.9" />
    </>
  )
}

function KarwaScene({ p }) {
  return (
    <>
      <Bokeh color={p.accent} count={10} />
      <g transform="translate(288 120)">
        <path d="M0 0a52 52 0 1 0 52 52 44 44 0 1 1-52-52Z" fill={p.accent} opacity="0.9" />
        <circle cx="0" cy="0" r="62" fill={p.accent} opacity="0.12" filter="url(#art-blur)" />
      </g>
      <g transform="translate(200 290)" opacity="0.9">
        <circle r="92" fill="none" stroke={p.accent} strokeWidth="2" strokeOpacity="0.5" />
        <circle r="76" fill="none" stroke={p.accent} strokeWidth="1" strokeDasharray="2 6" strokeOpacity="0.5" />
        {Array.from({ length: 20 }, (_, index) => (
          <circle key={index} cx={Math.cos((index / 20) * Math.PI * 2) * 70} cy={Math.sin((index / 20) * Math.PI * 2) * 70} r="1.6" fill={p.accent} opacity="0.65" />
        ))}
      </g>
      <g transform="translate(200 420)">
        <ellipse cx="0" cy="14" rx="100" ry="16" fill="#000" opacity="0.25" />
        <ellipse cx="0" cy="0" rx="92" ry="14" fill="#C99A3F" opacity="0.55" />
        <Diya x={-34} y={-6} scale={0.8} color={p.accent} bowl="#6B3216" />
        <circle cx="22" cy="-12" r="14" fill="#D9C29A" opacity="0.7" />
        <circle cx="46" cy="-6" r="9" fill={p.accent} opacity="0.65" />
      </g>
      <g transform="translate(96 400)" opacity="0.7">
        {[0, 1, 2].map((index) => (
          <path key={index} d={`M0 ${index * 8}a24 24 0 0 1 48 0`} fill="none" stroke={p.accent} strokeWidth="2" strokeOpacity={0.7 - index * 0.18} />
        ))}
        <circle cx="48" cy="14" r="3" fill={p.accent} />
      </g>
      <g opacity="0.55">
        {[0, 1, 2, 3].map((index) => (
          <Sparkle key={index} x={60 + index * 92} y={80 + (index % 2) * 36} r={1.2} color={p.accent} opacity={0.55} delay={index * 0.5} />
        ))}
      </g>
    </>
  )
}

function CrescentScene({ p, variant }) {
  const showFeast = variant === 'adha'
  return (
    <>
      <g opacity="0.85">
        {STAR_POINTS.slice(0, 20).map(([x, y, r], index) => (
          <Sparkle key={index} x={x} y={y} r={r} color={p.accent} opacity={0.45} delay={index * 0.2} />
        ))}
      </g>
      <g transform="translate(286 132)">
        <path d="M0 0a54 54 0 1 0 54 54 46 46 0 1 1-54-54Z" fill={p.accent} />
        <circle cx="0" cy="0" r="70" fill={p.accent} opacity="0.12" filter="url(#art-blur)" />
        <Sparkle x={34} y={-24} r={2} color={p.accent} opacity={0.9} />
      </g>
      <Lantern x={96} y={200} scale={0.85} color={p.accent} drop={40} />
      <Lantern x={322} y={250} scale={0.65} color={p.accent} drop={30} />
      <Mosque color="#020806" accent={p.accent} y={452} scale={0.95} />
      <g opacity="0.7">
        {[0, 1, 2, 3].map((index) => (
          <Sparkle key={index} x={70 + index * 88} y={70 + (index % 2) * 26} r={1.1} color={p.accent} opacity={0.55} delay={index * 0.5} />
        ))}
      </g>
      {showFeast ? (
        <g transform="translate(200 400)">
          <ellipse cx="0" cy="14" rx="76" ry="12" fill="#000" opacity="0.3" />
          <ellipse cx="0" cy="0" rx="70" ry="12" fill="#C99A3F" opacity="0.5" />
          <circle cx="-26" cy="-8" r="10" fill={p.accent} opacity="0.8" />
          <circle cx="0" cy="-10" r="9" fill="#E8C87A" opacity="0.8" />
          <circle cx="26" cy="-8" r="8" fill={p.accent} opacity="0.7" />
        </g>
      ) : null}
    </>
  )
}

function LanternScene({ p }) {
  return (
    <>
      <g opacity="0.8">
        {STAR_POINTS.slice(0, 16).map(([x, y, r], index) => (
          <Sparkle key={index} x={x} y={y} r={r} color={p.accent} opacity={0.5} delay={index * 0.25} />
        ))}
      </g>
      <g transform="translate(300 118)">
        <path d="M0 0a44 44 0 1 0 44 44 36 36 0 1 1-44-44Z" fill={p.accent} opacity="0.8" />
      </g>
      <Lantern x={104} y={230} scale={1.15} color={p.accent} drop={56} />
      <Lantern x={200} y={214} scale={1.35} color={p.accent} drop={70} />
      <Lantern x={296} y={230} scale={1.05} color={p.accent} drop={50} />
      <g transform="translate(200 438)" opacity="0.35">
        <path d="M-120 0h240M-100 14h200M-80 28h160" stroke={p.accent} strokeWidth="1" />
      </g>
      <g transform="translate(200 420)">
        <ellipse cx="0" cy="10" rx="92" ry="14" fill="#000" opacity="0.25" />
        <ellipse cx="0" cy="0" rx="84" ry="12" fill="#C99A3F" opacity="0.45" />
        <circle cx="-30" cy="-8" r="6" fill={p.accent} opacity="0.8" />
        <circle cx="-8" cy="-10" r="7" fill="#E8C87A" opacity="0.85" />
        <circle cx="18" cy="-8" r="6" fill={p.accent} opacity="0.7" />
      </g>
      <g opacity="0.35" transform="translate(200 460)">
        <path d="M-90 0h180" stroke={p.accent} strokeWidth="1" />
        <path d="M-60 -8h120l-6 8h-108Z" fill="none" stroke={p.accent} strokeWidth="1" />
      </g>
    </>
  )
}

function IftarScene({ p }) {
  return (
    <>
      <Bokeh color={p.accent} count={10} />
      <g transform="translate(200 160)" opacity="0.55">
        <path d="M-104 260V-24a104 104 0 0 1 208 0v284" fill="none" stroke={p.accent} strokeWidth="2" />
        <path d="M-88 260V-14a88 88 0 0 1 176 0v274" fill="none" stroke={p.accent} strokeWidth="1" strokeDasharray="3 8" />
      </g>
      <g transform="translate(300 118)">
        <path d="M0 0a42 42 0 1 0 42 42 34 34 0 1 1-42-42Z" fill={p.accent} opacity="0.8" />
      </g>
      <Lantern x={92} y={220} scale={0.8} color={p.accent} drop={42} />
      <g transform="translate(200 400)">
        <ellipse cx="0" cy="26" rx="140" ry="30" fill="#000" opacity="0.3" />
        <ellipse cx="0" cy="6" rx="144" ry="26" fill="#C99A3F" opacity="0.35" />
        <path d="M-116 -2h232v20c-40 10-192 10-232 0Z" fill="#8A5A2B" opacity="0.5" />
        <ellipse cx="-58" cy="-8" rx="26" ry="9" fill="#E8C87A" opacity="0.8" />
        <circle cx="-58" cy="-16" r="8" fill={p.accent} opacity="0.8" />
        <ellipse cx="12" cy="-8" rx="20" ry="8" fill="#E8C87A" opacity="0.7" />
        <circle cx="44" cy="-10" r="12" fill="#FFF3D6" opacity="0.7" />
        <circle cx="44" cy="-10" r="12" fill="none" stroke={p.accent} strokeWidth="1.5" opacity="0.7" />
      </g>
      <g opacity="0.55">
        {[0, 1, 2, 3].map((index) => (
          <Sparkle key={index} x={70 + index * 88} y={80 + (index % 2) * 34} r={1.1} color={p.accent} opacity={0.5} delay={index * 0.6} />
        ))}
      </g>
    </>
  )
}

function MosqueScene({ p }) {
  return (
    <>
      <g opacity="0.85">
        {STAR_POINTS.slice(0, 18).map(([x, y, r], index) => (
          <Sparkle key={index} x={x} y={y} r={r} color={p.accent} opacity={0.5} delay={index * 0.22} />
        ))}
      </g>
      <g transform="translate(306 118)">
        <path d="M0 0a40 40 0 1 0 40 40 32 32 0 1 1-40-40Z" fill={p.accent} opacity="0.8" />
      </g>
      <Mosque color="#020A07" accent={p.accent} y={452} scale={0.95} />
      <g transform="translate(200 400)" opacity="0.7">
        {[0, 1, 2, 3, 4].map((index) => (
          <g key={index} transform={`translate(${-52 + index * 26} ${8 + (index % 2) * 12})`}>
            <circle r="8" fill={p.accent} opacity="0.7" />
            <circle r="4" fill="#FFF3D6" opacity="0.5" />
          </g>
        ))}
      </g>
      <g opacity="0.5">
        {[0, 1, 2, 3].map((index) => (
          <Sparkle key={index} x={60 + index * 92} y={70 + (index % 2) * 30} r={1.1} color={p.accent} opacity={0.5} delay={index * 0.4} />
        ))}
      </g>
    </>
  )
}

function ChristmasScene({ p }) {
  return (
    <>
      <Bokeh color="#FFF3D6" count={18} />
      <g opacity="0.7">
        {Array.from({ length: 26 }, (_, index) => (
          <circle key={index} cx={(index * 61 + 29) % 390} cy={(index * 83 + 47) % 420} r={1.4 + (index % 3)} fill="#FFF9EC" opacity={0.3 + (index % 3) * 0.2} />
        ))}
      </g>
      <g transform="translate(200 300)">
        <ellipse cx="0" cy="150" rx="104" ry="18" fill="#000" opacity="0.28" />
        {[0, 1, 2].map((layer) => (
          <path
            key={layer}
            d={`M0 ${-118 + layer * 62}L${54 + layer * 22} ${20 + layer * 46}H${-54 - layer * 22}Z`}
            fill="#0E3B2A"
            stroke={p.accent}
            strokeOpacity="0.18"
          />
        ))}
        <path d="M0 -150l4 10 10 4-10 4-4 10-4-10-10-4 10-4Z" fill={p.accent} />
        {[
          [-26, -44],
          [30, -12],
          [-38, 42],
          [12, 66],
          [46, 90],
          [-10, 24],
          [-58, 110],
          [64, 118],
        ].map(([x, y], index) => (
          <circle key={index} cx={x} cy={y} r={4 + (index % 3)} fill={['#F26B5E', '#E8C86E', '#7FD3A8', '#FFF3D6'][index % 4]} opacity="0.9" />
        ))}
      </g>
      <g transform="translate(200 460)" opacity="0.7">
        <rect x="-46" y="-8" width="36" height="28" rx="4" fill="#F26B5E" />
        <rect x="4" y="-2" width="30" height="22" rx="3" fill="#E8C86E" />
        <path d="M-28 -8v-12M-28 -20l-8 8M-28 -20l8 8M-28 -2h36" stroke="#FFF3D6" strokeWidth="2" />
      </g>
      <g opacity="0.55">
        {[0, 1, 2, 3].map((index) => (
          <Sparkle key={index} x={62 + index * 90} y={80 + (index % 2) * 32} r={1.1} color={p.accent} opacity={0.55} delay={index * 0.4} />
        ))}
      </g>
    </>
  )
}

function EasterScene({ p }) {
  return (
    <>
      <Bokeh color={p.accent} count={12} />
      <g transform="translate(200 180)" opacity="0.85">
        <circle r="78" fill={p.accent} opacity="0.16" filter="url(#art-blur)" />
        <circle r="44" fill={p.accent} opacity="0.35" />
        {Array.from({ length: 16 }, (_, index) => (
          <line key={index} x1="0" y1="0" x2={Math.cos((index / 16) * Math.PI * 2) * 130} y2={Math.sin((index / 16) * Math.PI * 2) * 130} stroke={p.accent} strokeWidth="1" strokeOpacity="0.18" />
        ))}
      </g>
      <g transform="translate(200 290)" opacity="0.9">
        <path d="M0 -92v182M-34 -52h68" stroke={p.accent} strokeWidth="4" strokeLinecap="round" />
        <path d="M-34 -52v54M34 -52v54" stroke={p.accent} strokeWidth="1" strokeOpacity="0.5" />
      </g>
      <g transform="translate(200 430)">
        <ellipse cx="0" cy="14" rx="120" ry="18" fill="#000" opacity="0.25" />
        <ellipse cx="0" cy="0" rx="112" ry="16" fill="#2E5A3A" opacity="0.55" />
        {[
          [-52, -10, '#F4C2D7'],
          [-14, -16, '#FFF3D6'],
          [26, -10, '#B79BD8'],
          [62, -6, '#F2D06B'],
        ].map(([x, y, color], index) => (
          <ellipse key={index} cx={x} cy={y} rx="20" ry="28" fill={color} opacity="0.8" />
        ))}
        <path d="M-52 18c0-22 8-32 18-32s18 10 18 32" fill="none" stroke={p.accent} strokeWidth="1" opacity="0.4" />
      </g>
      <g transform="translate(80 420)" opacity="0.8">
        {[0, 1, 2].map((index) => (
          <g key={index} transform={`translate(${index * 22} ${-index * 16})`}>
            <path d="M0 0v-54" stroke={p.accent} strokeWidth="2" />
            <path d="M0 -54c-18-2-24 10-26 20 14-2 22-8 26-20" fill={p.accent} opacity="0.7" />
            <path d="M0 -54c18-2 24 10 26 20-14-2-22-8-26-20" fill={p.accent} opacity="0.5" />
            <ellipse cx="0" cy="-60" rx="10" ry="12" fill={p.accent} opacity="0.75" />
          </g>
        ))}
      </g>
    </>
  )
}

function CrossScene({ p }) {
  return (
    <>
      <g opacity="0.6">
        {STAR_POINTS.slice(0, 14).map(([x, y, r], index) => (
          <Sparkle key={index} x={x} y={y} r={r} color={p.accent} opacity={0.35} delay={index * 0.3} />
        ))}
      </g>
      <Hill y="380" color="#050507" opacity="0.95" />
      <g transform="translate(200 260)" opacity="0.95">
        <path d="M-8 -130h16v230h-16Z" fill="#0B0B0F" />
        <path d="M-58 -78h116v16H-58Z" fill="#0B0B0F" />
        <path d="M-8 -130h16v230h-16Z" fill="none" stroke={p.accent} strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="0" cy="-120" r="46" fill={p.accent} opacity="0.12" filter="url(#art-blur)" />
      </g>
      <g transform="translate(200 452)" opacity="0.8">
        {[-54, 0, 54].map((x, index) => (
          <g key={x} transform={`translate(${x} 0)`}>
            <rect x="-6" y="-34" width="12" height="34" rx="4" fill={p.muted} opacity="0.7" />
            <Flame x={0} y={-38} scale={0.55} color={p.accent} />
          </g>
        ))}
      </g>
    </>
  )
}

function FireworksScene({ p }) {
  const bursts = [
    [110, 150],
    [286, 118],
    [200, 240],
    [340, 250],
  ]
  return (
    <>
      <g opacity="0.55">
        {STAR_POINTS.slice(0, 18).map(([x, y, r], index) => (
          <Sparkle key={index} x={x} y={y} r={r} color={p.accent} opacity={0.45} delay={index * 0.2} />
        ))}
      </g>
      {bursts.map(([x, y], index) => (
        <g key={index} transform={`translate(${x} ${y})`} opacity={0.85 - index * 0.1}>
          <circle r="34" fill={p.glow} opacity="0.08" filter="url(#art-blur)" />
          {Array.from({ length: 18 }, (_, ray) => {
            const angle = (ray / 18) * Math.PI * 2
            const length = 36 + (ray % 4) * 8
            return (
              <line
                key={ray}
                x1={Math.cos(angle) * 12}
                y1={Math.sin(angle) * 12}
                x2={Math.cos(angle) * length}
                y2={Math.sin(angle) * length}
                stroke={ray % 3 === 0 ? p.accent : p.glow}
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity={0.6 + (ray % 3) * 0.1}
                className="fx animate-twinkle"
                style={{ animationDelay: `${ray * 0.08}s`, animationDuration: '3.6s' }}
              />
            )
          })}
          <circle r="3" fill="#FFF9EC" />
        </g>
      ))}
      <Confetti colors={[p.accent, p.glow, '#FFF3D6']} count={22} />
      <g transform="translate(0 420)" fill="#03030B">
        <path d="M0 80V18h42v46h34V34h58v50h38V26h54v62h50V44h42v56h82v-40h40v60H0Z" />
      </g>
      <g opacity="0.5">
        {[0, 1, 2, 3].map((index) => (
          <Sparkle key={index} x={64 + index * 86} y={80 + (index % 2) * 30} r={1.1} color={p.accent} opacity={0.5} delay={index * 0.5} />
        ))}
      </g>
    </>
  )
}

function TableScene({ p }) {
  return (
    <>
      <Bokeh color={p.accent} count={10} />
      <g transform="translate(200 160)" opacity="0.4">
        <path d="M-96 240V-20a96 96 0 0 1 192 0v260" fill="none" stroke={p.accent} strokeWidth="2" />
        <path d="M-78 240V-6a78 78 0 0 1 156 0v246" fill="none" stroke={p.accent} strokeWidth="1" strokeDasharray="3 8" />
      </g>
      <g transform="translate(200 420)">
        <ellipse cx="0" cy="20" rx="160" ry="26" fill="#000" opacity="0.3" />
        <ellipse cx="0" cy="4" rx="168" ry="24" fill="#6B3A1C" opacity="0.65" />
        <ellipse cx="0" cy="-4" rx="146" ry="16" fill="#A96B3A" opacity="0.55" />
        <ellipse cx="-74" cy="-12" rx="28" ry="9" fill="#E8C87A" opacity="0.7" />
        <ellipse cx="20" cy="-12" rx="30" ry="10" fill="#FFF3D6" opacity="0.55" />
        <ellipse cx="92" cy="-10" rx="24" ry="8" fill="#E8C87A" opacity="0.6" />
        {[-50, 52].map((x) => (
          <g key={x}>
            <rect x={x - 6} y={-44} width="12" height="32" rx="4" fill={p.muted} opacity="0.8" />
            <Flame x={x} y={-48} scale={0.55} color={p.accent} />
          </g>
        ))}
      </g>
      <g transform="translate(72 350)">
        <ellipse cx="0" cy="14" rx="34" ry="10" fill="#000" opacity="0.3" />
        <circle cx="0" cy="-6" r="28" fill="#E8833D" opacity="0.85" />
        <path d="M-20 -14c0-14 8-22 20-22s20 8 20 22" fill="none" stroke="#C95A1E" strokeWidth="3" />
        <path d="M0 -34v-8" stroke="#7A4420" strokeWidth="3" />
      </g>
      <g transform="translate(324 350)" opacity="0.9">
        {[0, 1, 2].map((index) => (
          <path key={index} d={`M${-26 + index * 6} ${-index * 8}l14-18 10 16-12 12Z`} fill={['#C95A1E', '#E8A94C', '#8C5A3C'][index]} opacity="0.8" />
        ))}
      </g>
      <g opacity="0.55">
        {[0, 1, 2, 3, 4].map((index) => (
          <path
            key={index}
            d={`M${40 + index * 76} 60c${8 + index * 3} 18 ${-8 + index * 4} 30 ${10 + index * 2} 48`}
            fill="none"
            stroke={p.accent}
            strokeOpacity="0.4"
            strokeWidth="1.4"
          />
        ))}
      </g>
    </>
  )
}

function GurdwaraScene({ p, variant }) {
  return (
    <>
      <g opacity="0.55">
        {STAR_POINTS.slice(0, 14).map(([x, y, r], index) => (
          <Sparkle key={index} x={x} y={y} r={r} color={p.accent} opacity={0.4} delay={index * 0.3} />
        ))}
      </g>
      <Gurdwara color="#0B0602" accent={p.accent} />
      {variant === 'bandi' ? (
        <g opacity="0.8">
          {[
            [90, 130],
            [310, 110],
            [200, 90],
          ].map(([x, y], index) => (
            <g key={index} transform={`translate(${x} ${y})`}>
              {Array.from({ length: 12 }, (_, ray) => {
                const angle = (ray / 12) * Math.PI * 2
                return (
                  <line
                    key={ray}
                    x1={Math.cos(angle) * 8}
                    y1={Math.sin(angle) * 8}
                    x2={Math.cos(angle) * 34}
                    y2={Math.sin(angle) * 34}
                    stroke={p.accent}
                    strokeWidth="1.3"
                    opacity="0.6"
                  />
                )
              })}
            </g>
          ))}
        </g>
      ) : null}
      <g transform="translate(200 440)" opacity="0.55">
        {[-92, -52, 52, 92].map((x, index) => (
          <Diya key={x} x={x} y={0} scale={index % 2 ? 0.75 : 0.9} color={p.accent} bowl="#5A3208" />
        ))}
      </g>
      <g opacity="0.4" transform="translate(200 470)">
        <path d="M-140 0h280" stroke={p.accent} strokeWidth="1" />
        <path d="M-110 10h220" stroke={p.accent} strokeWidth="1" strokeOpacity="0.6" />
      </g>
    </>
  )
}

function WheatScene({ p }) {
  return (
    <>
      <Bokeh color={p.accent} count={10} />
      <g transform="translate(308 120)">
        <circle r="48" fill={p.accent} opacity="0.25" filter="url(#art-blur)" />
        <circle r="28" fill={p.accent} opacity="0.7" />
      </g>
      <Hill y="410" color="#0A1405" opacity="0.8" />
      <g transform="translate(200 430)">
        {[0, 1, 2, 3, 4, 5, 6].map((index) => (
          <g key={index} transform={`translate(${-120 + index * 40} 0) rotate(${index % 2 ? 4 : -4})`} opacity="0.9">
            <path d="M0 0v-120" stroke={p.accent} strokeWidth="2" strokeOpacity="0.8" />
            {[0, 1, 2, 3, 4, 5].map((leaf) => (
              <g key={leaf}>
                <path d={`M0 ${-30 - leaf * 16}c-12-2-18-8-22-14 10 0 18 4 22 10`} fill={p.accent} opacity="0.7" />
                <path d={`M0 ${-30 - leaf * 16}c12-2 18-8 22-14-10 0-18 4-22 10`} fill={p.accent} opacity="0.55" />
              </g>
            ))}
          </g>
        ))}
      </g>
      <g transform="translate(200 300)" opacity="0.8">
        <circle r="34" fill="none" stroke={p.accent} strokeWidth="3" />
        <circle r="22" fill="none" stroke={p.accent} strokeWidth="2" />
        <path d="M0 -52v104M-34 0h68" stroke={p.accent} strokeWidth="2" />
      </g>
      <g transform="translate(200 430)" opacity="0.75">
        <ellipse cx="0" cy="10" rx="44" ry="10" fill="#000" opacity="0.3" />
        <path d="M-34 -10h68l-8 18c-14 6-38 6-52 0Z" fill="#C99A3F" opacity="0.65" />
        <ellipse cx="0" cy="-12" rx="34" ry="6" fill="#E8C87A" opacity="0.55" />
      </g>
    </>
  )
}

function BuddhaScene({ p }) {
  return (
    <>
      <g transform="translate(200 180)">
        <circle r="105" fill={p.accent} opacity="0.1" filter="url(#art-blur)" />
        <circle r="78" fill={p.accent} opacity="0.12" />
      </g>
      <g opacity="0.6">
        {STAR_POINTS.slice(0, 12).map(([x, y, r], index) => (
          <Sparkle key={index} x={x} y={y} r={r} color={p.accent} opacity={0.4} delay={index * 0.3} />
        ))}
      </g>
      <g transform="translate(200 320)" opacity="0.92">
        <circle cx="0" cy="-96" r="34" fill={p.accent} opacity="0.9" />
        <path d="M-30 -60c-4 26-2 48 10 66h40c12-18 14-40 10-66Z" fill={p.accent} opacity="0.85" />
        <path d="M-26 -40c-30 10-48 30-56 54 20-4 36-14 48-28M26 -40c30 10 48 30 56 54-20-4-36-14-48-28" fill={p.accent} opacity="0.7" />
        <path d="M-42 6c-20 14-34 32-40 52h164c-6-20-20-38-40-52Z" fill={p.accent} opacity="0.75" />
      </g>
      <g transform="translate(200 430)">
        {[0, 1, 2, 3, 4].map((index) => (
          <path
            key={index}
            d={`M0 0c-${40 + index * 8} -${10 + index * 2} -${46 + index * 10} -${26 + index * 4} -${50 + index * 12} -${36 + index * 4}`}
            fill={index === 0 ? p.accent : 'none'}
            stroke={p.accent}
            strokeOpacity={0.8 - index * 0.12}
            strokeWidth="2"
          />
        ))}
        <path d="M0 0c40 -10 46 -26 50 -36" fill="none" stroke={p.accent} strokeOpacity="0.6" strokeWidth="2" />
      </g>
      <g opacity="0.8">
        {[-104, -156, 104, 156].map((x, index) => (
          <Flame key={x} x={200 + x} y={440} scale={0.6} color={p.accent} />
        ))}
      </g>
      <g opacity="0.5">
        {[0, 1, 2, 3].map((index) => (
          <path
            key={index}
            d={`M${60 + index * 78} 70c${8 + index * 4} 18 ${-10 + index * 5} 32 ${12 + index * 3} 50`}
            fill="none"
            stroke={p.accent}
            strokeOpacity="0.4"
            strokeWidth="1"
          />
        ))}
      </g>
    </>
  )
}

function LotusScene({ p }) {
  return (
    <>
      <g opacity="0.65">
        {STAR_POINTS.slice(0, 16).map(([x, y, r], index) => (
          <Sparkle key={index} x={x} y={y} r={r} color={p.accent} opacity={0.45} delay={index * 0.25} />
        ))}
      </g>
      <g transform="translate(310 120)">
        <path d="M0 0a44 44 0 1 0 44 44 36 36 0 1 1-44-44Z" fill={p.accent} opacity="0.75" />
      </g>
      <Lantern x={92} y={220} scale={0.7} color={p.accent} drop={40} />
      <g transform="translate(200 400)">
        <ellipse cx="0" cy="20" rx="120" ry="20" fill="#000" opacity="0.3" />
        <ellipse cx="0" cy="8" rx="130" ry="20" fill="#0A1A34" opacity="0.7" />
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const angle = -150 + index * 24
          return (
            <ellipse
              key={index}
              cx="0"
              cy="-20"
              rx="20"
              ry="52"
              fill={index % 2 ? p.accent : '#F4C2D7'}
              opacity={0.45 + (index % 3) * 0.12}
              transform={`rotate(${angle})`}
            />
          )
        })}
        <ellipse cx="0" cy="-18" rx="26" ry="30" fill={p.accent} opacity="0.9" />
        <circle cx="0" cy="-18" r="10" fill="#FFF3D6" opacity="0.8" />
      </g>
      <g transform="translate(200 330)" opacity="0.35">
        <path d="M-70 90V20a70 70 0 0 1 140 0v70" fill="none" stroke={p.accent} strokeWidth="2" />
      </g>
      <g opacity="0.5">
        {[0, 1, 2, 3].map((index) => (
          <Sparkle key={index} x={60 + index * 92} y={70 + (index % 2) * 30} r={1.1} color={p.accent} opacity={0.5} delay={index * 0.5} />
        ))}
      </g>
    </>
  )
}

function JainScene({ p, variant }) {
  return (
    <>
      <g opacity="0.55">
        {STAR_POINTS.slice(0, 14).map(([x, y, r], index) => (
          <Sparkle key={index} x={x} y={y} r={r} color={p.accent} opacity={0.4} delay={index * 0.3} />
        ))}
      </g>
      <g transform="translate(200 300)" opacity="0.9">
        <rect x="-120" y="-10" width="240" height="120" rx="4" fill="#0B0703" />
        <path d="M-60 -10c0-36 20-56 60-56s60 20 60 56Z" fill="#0B0703" />
        <path d="M-30 -10c0-22 10-34 30-34s30 12 30 34Z" fill={p.accent} opacity="0.2" />
        <rect x="-92" y="-52" width="12" height="52" fill="#0B0703" />
        <rect x="80" y="-52" width="12" height="52" fill="#0B0703" />
        <path d="M-104 -52c0-16 6-26 6-26s6 10 6 26Z" fill={p.accent} opacity="0.7" />
        <path d="M74 -52c0-16 6-26 6-26s6 10 6 26Z" fill={p.accent} opacity="0.7" />
        <path d="M0 -80c5 8 8 13 8 19a8 8 0 0 1-16 0c0-6 4-11 8-19Z" fill={p.accent} opacity="0.8" />
      </g>
      <g transform="translate(200 420)">
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const angle = -150 + index * 24
          return (
            <ellipse key={index} cx="0" cy="-12" rx="16" ry="42" fill={index % 2 ? p.accent : '#E8D6A8'} opacity={0.35 + (index % 3) * 0.12} transform={`rotate(${angle})`} />
          )
        })}
        <ellipse cx="0" cy="-10" rx="22" ry="24" fill={p.accent} opacity="0.8" />
      </g>
      <g transform="translate(200 455)" opacity="0.8">
        <Diya x={-72} y={0} scale={0.7} color={p.accent} bowl="#5A3208" />
        <Diya x={72} y={0} scale={0.7} color={p.accent} bowl="#5A3208" />
      </g>
      {variant === 'paryushan' ? (
        <g opacity="0.5" transform="translate(200 200)">
          <circle r="70" fill="none" stroke={p.accent} strokeWidth="1" strokeDasharray="2 8" />
          <circle r="48" fill="none" stroke={p.accent} strokeWidth="1" strokeOpacity="0.6" />
        </g>
      ) : null}
    </>
  )
}

function FlagScene({ p, variant }) {
  return (
    <>
      <Bokeh color={p.accent} count={10} />
      <g transform="translate(200 90)">
        <path d="M-150 40c50-30 100 30 150 0s100-30 150 0v46c-50-30-100 30-150 0s-100-30-150 0Z" fill="#FF9933" opacity="0.85" />
        <path d="M-150 72c50-30 100 30 150 0s100-30 150 0v40c-50-30-100 30-150 0s-100-30-150 0Z" fill="#FFF7EC" opacity="0.9" />
        <path d="M-150 104c50-30 100 30 150 0s100-30 150 0v40c-50-30-100 30-150 0s-100-30-150 0Z" fill="#1E8A5A" opacity="0.85" />
      </g>
      <g transform="translate(200 300)" opacity="0.95">
        <circle r="78" fill="none" stroke="#1B3A6B" strokeWidth="3" opacity="0.7" />
        <circle r="14" fill="#1B3A6B" opacity="0.7" />
        {Array.from({ length: 24 }, (_, index) => {
          const angle = (index / 24) * Math.PI * 2
          return <line key={index} x1="0" y1="0" x2={Math.cos(angle) * 70} y2={Math.sin(angle) * 70} stroke="#1B3A6B" strokeWidth="1.4" opacity="0.55" />
        })}
      </g>
      <g transform="translate(0 400)" fill="#030A16">
        <path d="M0 100V52h56v-16h40v20h34v44h60V40h44v60h52V54h40v46h74V20h40v80h-40v0H0Z" opacity="0.8" />
        <path d="M120 64c0-40 20-60 54-60s54 20 54 60Z" opacity="0.8" />
        <rect x="172" y="64" width="4" height="36" opacity="0.8" />
      </g>
      {variant === 'republic' ? (
        <g opacity="0.55">
          {[110, 290].map((x, index) => (
            <g key={x} transform={`translate(${x} ${360 + index * 10})`}>
              <circle cx="0" cy="0" r="10" fill={p.accent} />
              <path d="M0 10v30M-16 20h32" stroke={p.accent} strokeWidth="4" strokeLinecap="round" />
            </g>
          ))}
        </g>
      ) : null}
      <g opacity="0.5">
        {[0, 1, 2, 3].map((index) => (
          <Sparkle key={index} x={60 + index * 92} y={70 + (index % 2) * 30} r={1.1} color={p.accent} opacity={0.5} delay={index * 0.5} />
        ))}
      </g>
    </>
  )
}

function PookalamScene({ p }) {
  return (
    <>
      <Bokeh color={p.accent} count={10} />
      <g transform="translate(200 300)">
        <Mandala cx="0" cy="0" r="150" color={p.accent} opacity="0.45" petals={24} />
        <Mandala cx="0" cy="0" r="112" color={p.glow} opacity="0.35" petals={20} />
        <Mandala cx="0" cy="0" r="74" color={p.accent} opacity="0.5" petals={16} />
        <circle r="26" fill={p.accent} opacity="0.55" />
        <circle r="12" fill="#FFF3D6" opacity="0.8" />
      </g>
      <g transform="translate(200 430)" opacity="0.85">
        <ellipse cx="0" cy="16" rx="140" ry="18" fill="#000" opacity="0.3" />
        <path d="M-130 0c30-26 60-26 90 0 30 26 70 26 110 0 20-13 40-16 60-8v26h-260Z" fill="#0A1A0C" opacity="0.8" />
        <Diya x={-58} y={-8} scale={0.75} color={p.accent} bowl="#5A3208" />
        <Diya x={58} y={-8} scale={0.75} color={p.accent} bowl="#5A3208" />
      </g>
      <g opacity="0.75" transform="translate(200 300)">
        <path d="M-120 70c40-16 80-16 120 0" fill="none" stroke={p.accent} strokeWidth="1" strokeOpacity="0.3" />
        <path d="M-120 86c40-16 80-16 120 0" fill="none" stroke={p.accent} strokeWidth="1" strokeOpacity="0.2" />
      </g>
      <g opacity="0.5">
        {[0, 1, 2, 3, 4].map((index) => (
          <Sparkle key={index} x={56 + index * 76} y={80 + (index % 2) * 32} r={1.1} color={p.accent} opacity={0.55} delay={index * 0.4} />
        ))}
      </g>
    </>
  )
}

function PongalScene({ p }) {
  return (
    <>
      <Bokeh color={p.accent} count={10} />
      <g transform="translate(300 110)">
        <circle r="40" fill={p.accent} opacity="0.7" />
        <circle r="56" fill={p.accent} opacity="0.15" filter="url(#art-blur)" />
      </g>
      <g transform="translate(200 390)" opacity="0.95">
        <ellipse cx="0" cy="34" rx="112" ry="20" fill="#000" opacity="0.3" />
        <path d="M-76 0h152l-16 34c-28 10-92 10-120 0Z" fill="#8A4420" opacity="0.8" />
        <ellipse cx="0" cy="-2" rx="78" ry="14" fill="#E8C87A" opacity="0.75" />
        <path d="M-64 -6c-6-24 6-40 26-48 10 16 6 34-2 48Z" fill="#FFF3D6" opacity="0.55" />
        <path d="M-18 -8c-4-30 10-48 32-56 12 20 2 40-8 56Z" fill="#FFF9EC" opacity="0.6" />
        <path d="M22 -8c-2-24 10-38 26-44 10 16 4 32-4 44Z" fill="#FFF3D6" opacity="0.5" />
        <Flame x={0} y={20} scale={0.75} color={p.accent} />
      </g>
      <g transform="translate(88 400)" opacity="0.85">
        {[0, 1, 2].map((index) => (
          <g key={index} transform={`translate(${index * 20} ${-index * 12}) rotate(${index * 4 - 4})`}>
            <path d="M0 0v-100" stroke={p.accent} strokeWidth="5" strokeLinecap="round" />
            {[0, 1, 2, 3].map((leaf) => (
              <path key={leaf} d={`M0 ${-18 - leaf * 20}c-12-2-20-8-24-14 12 0 20 4 24 10`} fill={p.accent} opacity="0.6" />
            ))}
          </g>
        ))}
      </g>
      <g transform="translate(200 440)" fill="none" stroke={p.accent} strokeOpacity="0.45" strokeWidth="1.2">
        <ellipse cx="0" cy="0" rx="150" ry="22" />
        <ellipse cx="0" cy="0" rx="110" ry="16" />
        <ellipse cx="0" cy="0" rx="70" ry="10" />
      </g>
      <g opacity="0.5">
        {[0, 1, 2, 3].map((index) => (
          <Sparkle key={index} x={60 + index * 92} y={70 + (index % 2) * 30} r={1.1} color={p.accent} opacity={0.5} delay={index * 0.5} />
        ))}
      </g>
    </>
  )
}

function BihuScene({ p }) {
  return (
    <>
      <Bokeh color={p.accent} count={10} />
      <g transform="translate(300 120)">
        <circle r="42" fill={p.accent} opacity="0.55" />
      </g>
      <Hill y="390" color="#051A10" opacity="0.9" />
      <g opacity="0.85">
        {Array.from({ length: 10 }, (_, index) => (
          <g key={index} transform={`translate(${20 + index * 40} ${420 - (index % 3) * 18}) rotate(${index % 2 ? 4 : -4})`}>
            <path d="M0 0v-100" stroke={p.accent} strokeWidth="2" strokeOpacity="0.5" />
            {[0, 1, 2, 3].map((leaf) => (
              <path key={leaf} d={`M0 ${-20 - leaf * 18}c-10-2-16-8-20-14 10 0 16 4 20 10`} fill={p.accent} opacity="0.4" />
            ))}
          </g>
        ))}
      </g>
      <g transform="translate(200 360)" opacity="0.92">
        <circle cx="0" cy="-62" r="13" fill={p.ink} opacity="0.85" />
        <path d="M-7 -50c-2 16-1 30 3 44h9c4-14 5-28 3-44Z" fill={p.ink} opacity="0.9" />
        <path d="M-5 -48c-22 6-36 18-44 34M5 -48c22 6 36 18 44 34" fill="none" stroke={p.ink} strokeWidth="6" strokeLinecap="round" opacity="0.85" />
        <path d="M-8 0h18l24 62c-12 8-42 8-54 0Z" fill={p.accent} opacity="0.7" />
        <path d="M-26 64h58" stroke={p.accent} strokeWidth="2" opacity="0.8" />
      </g>
      <g transform="translate(310 380)" opacity="0.8">
        <ellipse cx="0" cy="10" rx="30" ry="9" fill="#000" opacity="0.3" />
        <path d="M-26 -10h52l-6 18c-12 6-28 6-40 0Z" fill="#C99A3F" opacity="0.65" />
        <ellipse cx="0" cy="-12" rx="26" ry="6" fill="#E8C87A" opacity="0.55" />
      </g>
      <g opacity="0.5">
        {[0, 1, 2, 3, 4].map((index) => (
          <Sparkle key={index} x={56 + index * 76} y={80 + (index % 2) * 30} r={1.1} color={p.accent} opacity={0.5} delay={index * 0.4} />
        ))}
      </g>
    </>
  )
}

function BonfireScene({ p }) {
  return (
    <>
      <g opacity="0.45">
        {STAR_POINTS.slice(0, 14).map(([x, y, r], index) => (
          <Sparkle key={index} x={x} y={y} r={r} color={p.accent} opacity={0.4} delay={index * 0.3} />
        ))}
      </g>
      <Hill y="420" color="#050309" opacity="0.95" />
      <g transform="translate(200 400)">
        <ellipse cx="0" cy="26" rx="110" ry="18" fill="#000" opacity="0.35" />
        <ellipse cx="0" cy="10" rx="84" ry="16" fill="#3A1C0C" opacity="0.8" />
        <path d="M-64 4c22-6 44-6 66 0M-58 12c20-4 38-4 58 0" stroke="#C95A1E" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        <path d="M0 -68c22 24 34 40 34 58a34 34 0 1 1-68 0c0-18 12-34 34-58Z" fill={p.glow} opacity="0.9" />
        <path d="M0 -40c14 16 20 26 20 38a20 20 0 1 1-40 0c0-12 6-22 20-38Z" fill={p.accent} opacity="0.9" />
        <path d="M0 -16c8 9 12 14 12 21a12 12 0 1 1-24 0c0-7 4-12 12-21Z" fill="#FFF3D6" />
        {Array.from({ length: 14 }, (_, index) => (
          <circle
            key={index}
            cx={Math.cos((index / 14) * Math.PI * 2) * (46 + (index % 3) * 18)}
            cy={-46 + Math.sin((index / 14) * Math.PI * 2) * (30 + (index % 4) * 8)}
            r={1.5 + (index % 2)}
            fill={p.accent}
            opacity="0.6"
            className="fx animate-twinkle"
            style={{ animationDelay: `${index * 0.2}s`, animationDuration: '3s' }}
          />
        ))}
      </g>
      <g transform="translate(310 400)" opacity="0.8">
        <ellipse cx="0" cy="10" rx="28" ry="8" fill="#000" opacity="0.3" />
        <path d="M-24 -10h48l-6 16c-10 6-26 6-36 0Z" fill="#C99A3F" opacity="0.6" />
      </g>
      <g transform="translate(88 390)" opacity="0.65">
        {[0, 1, 2].map((index) => (
          <g key={index} transform={`translate(${index * 14} ${-index * 8})`}>
            <circle cy="-22" r={10 + index * 3} fill="#C95A1E" opacity="0.7" />
            <circle cy="-22" r={6 + index * 2} fill="#E8A94C" opacity="0.7" />
          </g>
        ))}
      </g>
    </>
  )
}

function SunScene({ p }) {
  return (
    <>
      <g transform="translate(200 220)">
        <circle r="72" fill={p.accent} opacity="0.25" filter="url(#art-blur)" />
        <circle r="46" fill={p.accent} opacity="0.8" />
        {Array.from({ length: 20 }, (_, index) => {
          const angle = (index / 20) * Math.PI * 2
          return <line key={index} x1={Math.cos(angle) * 56} y1={Math.sin(angle) * 56} x2={Math.cos(angle) * 78} y2={Math.sin(angle) * 78} stroke={p.accent} strokeWidth="1.5" opacity="0.4" />
        })}
      </g>
      <g transform="translate(0 340)">
        <path d="M0 160V40c60-20 110-20 170 0 50 16 100 16 150 0 40-12 60-10 80 0v120Z" fill="#0A1020" opacity="0.75" />
        <path d="M0 90c60-16 110-16 170 0 50 14 100 14 150 0 40-10 60-8 80 0" fill="none" stroke={p.accent} strokeOpacity="0.35" strokeWidth="1.5" />
        <path d="M0 120c60-16 110-16 170 0 50 14 100 14 150 0 40-10 60-8 80 0" fill="none" stroke={p.accent} strokeOpacity="0.2" strokeWidth="1" />
      </g>
      <g transform="translate(200 460)" opacity="0.7">
        {[-92, -46, 46, 92].map((x, index) => (
          <Diya key={x} x={x} y={0} scale={index % 2 ? 0.65 : 0.8} color={p.accent} bowl="#5A3208" />
        ))}
      </g>
      <g opacity="0.5">
        {[0, 1, 2, 3].map((index) => (
          <Sparkle key={index} x={62 + index * 90} y={70 + (index % 2) * 28} r={1.1} color={p.accent} opacity={0.5} delay={index * 0.5} />
        ))}
      </g>
    </>
  )
}

function GudiScene({ p }) {
  return (
    <>
      <Bokeh color={p.accent} count={10} />
      <g transform="translate(200 300)" opacity="0.85">
        <line x1="0" y1="-140" x2="0" y2="120" stroke={p.accent} strokeWidth="4" strokeOpacity="0.7" />
        <path d="M2 -128h74v66H2Z" fill="#F26B5E" opacity="0.75" />
        <path d="M2 -128h74v66H2Z" fill="none" stroke={p.accent} strokeWidth="1" strokeOpacity="0.5" />
        <path d="M12 -118h54M12 -102h54M12 -86h54" stroke="#FFF3D6" strokeWidth="2" strokeOpacity="0.35" />
        <circle cx="2" cy="-128" r="10" fill={p.accent} opacity="0.8" />
        <path d="M-12 -128c-18-18-34-18-48-4 16 10 32 10 48 4Z" fill="#7FD3A0" opacity="0.7" />
        <path d="M16 -128c18-18 34-18 48-4-16 10-32 10-48 4Z" fill="#7FD3A0" opacity="0.55" />
      </g>
      <g transform="translate(200 430)" opacity="0.75">
        <ellipse cx="0" cy="14" rx="120" ry="18" fill="#000" opacity="0.25" />
        <ellipse cx="0" cy="0" rx="112" ry="14" fill="#C99A3F" opacity="0.4" />
        <circle cx="-34" cy="-8" r="11" fill={p.accent} opacity="0.8" />
        <circle cx="0" cy="-10" r="10" fill="#FFF3D6" opacity="0.8" />
        <circle cx="34" cy="-8" r="9" fill={p.accent} opacity="0.7" />
      </g>
      <g opacity="0.45">
        {[0, 1, 2, 3].map((index) => (
          <Sparkle key={index} x={60 + index * 92} y={70 + (index % 2) * 30} r={1.1} color={p.accent} opacity={0.5} delay={index * 0.5} />
        ))}
      </g>
    </>
  )
}

/* ------------------------------------------- abstract fallbacks (everyday) */

function ConfettiScene({ p }) {
  return (
    <>
      <g filter="url(#art-blur)" opacity="0.65">
        <circle cx="110" cy="160" r="80" fill={p.accent} opacity="0.35" />
        <circle cx="300" cy="220" r="95" fill={p.glow} opacity="0.25" />
        <circle cx="200" cy="380" r="80" fill="#A97BE8" opacity="0.2" />
      </g>
      <Confetti colors={[p.accent, p.glow, '#FFF3D6', '#7FD3A8', '#A97BE8']} count={34} />
      <g transform="translate(200 330)" opacity="0.9">
        <Mandala cx="0" cy="0" r="110" color={p.accent} opacity="0.3" petals={20} />
        <circle r="46" fill={p.accent} opacity="0.55" />
        <path d="M0 -34l10 24 24 10-24 10-10 24-10-24-24-10 24-10Z" fill="#FFF3D6" opacity="0.9" />
      </g>
      <g opacity="0.7">
        {[0, 1, 2, 3, 4].map((index) => (
          <Sparkle key={index} x={56 + index * 74} y={80 + (index % 2) * 34} r={1.2} color={p.accent} opacity={0.6} delay={index * 0.4} />
        ))}
      </g>
    </>
  )
}

function HeartsScene({ p }) {
  const heart = 'M0 12C-14 2-22-5-22-13c0-7 5-12 12-12 4 0 8 2 10 6 2-4 6-6 10-6 7 0 12 5 12 12 0 8-8 15-22 25Z'
  return (
    <>
      <Bokeh color={p.accent} count={12} />
      <g opacity="0.6">
        {[
          [80, 120, 0.6],
          [310, 180, 0.45],
          [140, 300, 0.35],
          [280, 360, 0.55],
          [60, 400, 0.4],
        ].map(([x, y, s], index) => (
          <path key={index} d={heart} fill={p.accent} transform={`translate(${x} ${y}) scale(${s})`} opacity={0.6} />
        ))}
      </g>
      <g transform="translate(200 300)">
        <circle r="118" fill="none" stroke={p.accent} strokeWidth="1" strokeOpacity="0.3" />
        <circle r="88" fill="none" stroke={p.accent} strokeWidth="1" strokeDasharray="2 8" strokeOpacity="0.4" />
        <path d={heart} fill={p.accent} transform="translate(0 -10) scale(2.2)" opacity="0.9" />
        <path d="M0 -14C-7 -22-11-26-11-30c0-3.5 2.5-6 6-6 2 0 4 1 5 3 1-2 3-3 5-3 3.5 0 6 2.5 6 6 0 4-4 8-11 16Z" fill="#FFF3D6" opacity="0.8" />
      </g>
      <g opacity="0.55">
        {[0, 1, 2, 3, 4].map((index) => (
          <Sparkle key={index} x={60 + index * 74} y={80 + (index % 2) * 36} r={1.2} color={p.accent} opacity={0.6} delay={index * 0.5} />
        ))}
      </g>
    </>
  )
}

function FriendsScene({ p }) {
  return (
    <>
      <Bokeh color={p.accent} count={12} />
      <g transform="translate(200 360)">
        {[
          [-92, 0.75, -6],
          [-32, 0.9, 3],
          [34, 0.85, -3],
          [96, 0.7, 7],
        ].map(([x, s, rotate], index) => (
          <g key={index} transform={`translate(${x} 0) scale(${s}) rotate(${rotate})`} opacity="0.9">
            <circle cy="-70" r="16" fill={p.ink} opacity="0.85" />
            <path d="M-8 -54c-2 20-1 36 4 50h10c5-14 6-30 4-50Z" fill={p.ink} opacity="0.85" />
            <path d="M-6 -50c-26 4-42 18-50 40M6 -50c26 4 42 18 50 40" fill="none" stroke={p.ink} strokeWidth="8" strokeLinecap="round" opacity="0.85" />
            <path d="M-10 0h22l16 70H-26Z" fill={p.accent} opacity="0.7" />
          </g>
        ))}
      </g>
      <Hill y="430" color="#071006" opacity="0.8" />
      <Confetti colors={[p.accent, p.glow, '#FFF3D6']} count={18} />
      <g opacity="0.55">
        {[0, 1, 2, 3].map((index) => (
          <Sparkle key={index} x={60 + index * 90} y={70 + (index % 2) * 30} r={1.1} color={p.accent} opacity={0.5} delay={index * 0.5} />
        ))}
      </g>
    </>
  )
}

function SunriseScene({ p }) {
  return (
    <>
      <g transform="translate(200 260)">
        <circle r="88" fill={p.accent} opacity="0.22" filter="url(#art-blur)" />
        <circle r="46" fill={p.accent} opacity="0.75" />
      </g>
      <Hill y="380" color="#081006" opacity="0.9" />
      <Hill y="430" color="#040803" opacity="0.95" />
      <g opacity="0.6">
        {[
          [90, 160],
          [130, 140],
          [300, 180],
        ].map(([x, y], index) => (
          <path key={index} d={`M${x} ${y}c8-8 14-8 22 0-8-2-14-2-22 0Z`} fill={p.ink} opacity="0.5" />
        ))}
      </g>
      <g opacity="0.6">
        {[0, 1, 2, 3].map((index) => (
          <Sparkle key={index} x={60 + index * 92} y={80 + (index % 2) * 30} r={1.1} color={p.accent} opacity={0.5} delay={index * 0.5} />
        ))}
      </g>
    </>
  )
}

function MoonScene({ p }) {
  return (
    <>
      <g opacity="0.8">
        {STAR_POINTS.slice(0, 22).map(([x, y, r], index) => (
          <Sparkle key={index} x={x} y={y} r={r} color={p.accent} opacity={0.5} delay={index * 0.2} />
        ))}
      </g>
      <g transform="translate(270 160)">
        <circle r="76" fill={p.accent} opacity="0.12" filter="url(#art-blur)" />
        <circle r="48" fill={p.accent} opacity="0.85" />
        <circle cx="14" cy="-12" r="48" fill={p.ink} opacity="0.08" />
      </g>
      <Hill y="400" color="#03050D" opacity="0.9" />
      <Hill y="450" color="#010208" opacity="0.95" />
      <g transform="translate(200 460)" opacity="0.5">
        {[-92, 92].map((x, index) => (
          <Diya key={x} x={x} y={0} scale={0.65} color={p.accent} bowl="#3A2A18" />
        ))}
      </g>
    </>
  )
}

function GiftScene({ p }) {
  return (
    <>
      <Bokeh color={p.accent} count={10} />
      <g transform="translate(200 320)">
        <ellipse cx="0" cy="120" rx="108" ry="18" fill="#000" opacity="0.3" />
        <rect x="-72" y="-20" width="144" height="120" rx="8" fill={p.accent} opacity="0.75" />
        <rect x="-84" y="-42" width="168" height="34" rx="6" fill={p.accent} opacity="0.9" />
        <path d="M-12 -42v142M-12 -42c-28-2-46-16-46-34 0-12 10-20 22-20 16 0 24 20 24 54ZM-12 -42c28-2 46-16 46-34 0-12-10-20-22-20-16 0-24 20-24 54Z" fill="none" stroke="#FFF3D6" strokeWidth="10" strokeOpacity="0.7" />
        <path d="M-12 -22h24v70H-12Z" fill="#FFF3D6" opacity="0.35" />
      </g>
      <g opacity="0.7">
        {[0, 1, 2, 3].map((index) => (
          <Sparkle key={index} x={60 + index * 92} y={80 + (index % 2) * 30} r={1.1} color={p.accent} opacity={0.55} delay={index * 0.5} />
        ))}
      </g>
    </>
  )
}

function LetterScene({ p }) {
  return (
    <>
      <Bokeh color={p.accent} count={10} />
      <g transform="translate(200 320) rotate(-4)">
        <rect x="-120" y="-90" width="240" height="180" rx="10" fill="#FBF3E2" opacity="0.92" />
        <rect x="-120" y="-90" width="240" height="180" rx="10" fill="none" stroke={p.accent} strokeWidth="1" />
        <path d="M-110 -78h220M-110 -58h160M-110 -38h190M-110 -18h130" stroke={p.accent} strokeOpacity="0.28" strokeWidth="2" />
        <path d="M-120 90l120-100 120 100Z" fill="#E8D6B8" opacity="0.8" />
        <path d="M-120 90l120-100 120 100" fill="none" stroke={p.accent} strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="76" cy="52" r="20" fill={p.accent} opacity="0.85" />
        <path d="M68 52l6 6 12-14" stroke="#FFF3D6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g transform="translate(88 200)" opacity="0.8">
        <path d="M0 60V-20" stroke={p.accent} strokeWidth="2" />
        <path d="M0 -20c-22-6-32 8-36 22 18 0 30-8 36-22ZM0 -20c22-6 32 8 36 22-18 0-30-8-36-22Z" fill={p.accent} opacity="0.6" />
      </g>
      <g opacity="0.6">
        {[0, 1, 2, 3].map((index) => (
          <Sparkle key={index} x={60 + index * 92} y={70 + (index % 2) * 30} r={1.1} color={p.accent} opacity={0.5} delay={index * 0.5} />
        ))}
      </g>
    </>
  )
}

const SCENES = {
  diya: DiyaScene,
  holi: HoliScene,
  rakhi: RakhiScene,
  peacock: PeacockScene,
  modak: ModakScene,
  garba: GarbaScene,
  durga: DurgaScene,
  bow: BowScene,
  kite: KiteScene,
  trishul: TrishulScene,
  karwa: KarwaScene,
  crescent: CrescentScene,
  lantern: LanternScene,
  iftar: IftarScene,
  mosque: MosqueScene,
  christmas: ChristmasScene,
  easter: EasterScene,
  cross: CrossScene,
  fireworks: FireworksScene,
  table: TableScene,
  gurdwara: GurdwaraScene,
  wheat: WheatScene,
  buddha: BuddhaScene,
  lotus: LotusScene,
  jain: JainScene,
  flag: FlagScene,
  pookalam: PookalamScene,
  pongal: PongalScene,
  bihu: BihuScene,
  bonfire: BonfireScene,
  sun: SunScene,
  gudi: GudiScene,
  confetti: ConfettiScene,
  hearts: HeartsScene,
  friends: FriendsScene,
  sunrise: SunriseScene,
  moon: MoonScene,
  gift: GiftScene,
  letter: LetterScene,
}

export default function OccasionArt({ occasion, className = '', variant, rounded = true }) {
  const rawId = useId()
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, '')
  const p = { ...PALETTE_FALLBACK, ...(occasion?.art || {}) }
  const Scene = SCENES[p.scene] || DiyaScene
  const sceneVariant = occasion?.artVariant

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${rounded ? 'rounded-[inherit]' : ''} ${className}`}
      role="img"
      aria-label={occasion?.imageAlt || occasion?.label || 'Decorative occasion artwork'}
    >
      <defs>
        <linearGradient id={`art-sky-${uid}`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor={p.sky?.[0] || PALETTE_FALLBACK.sky[0]} />
          <stop offset="0.55" stopColor={p.sky?.[1] || PALETTE_FALLBACK.sky[1]} />
          <stop offset="1" stopColor={p.sky?.[2] || PALETTE_FALLBACK.sky[2]} />
        </linearGradient>
        <radialGradient id={`art-glow-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={p.glow} stopOpacity="0.42" />
          <stop offset="0.5" stopColor={p.glow} stopOpacity="0.14" />
          <stop offset="1" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`art-scrim-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.45" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.45" />
        </linearGradient>
        <filter id="art-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <rect width="400" height="500" fill={`url(#art-sky-${uid})`} />
      <ellipse cx="200" cy="300" rx="260" ry="240" fill={`url(#art-glow-${uid})`} />
      <ellipse cx="40" cy="80" rx="140" ry="120" fill={p.accent} opacity="0.05" />
      <Scene p={p} variant={sceneVariant} />
      <rect width="400" height="500" fill={`url(#art-scrim-${uid})`} />
      <rect width="400" height="500" fill="none" stroke={p.accent} strokeOpacity="0.12" strokeWidth="1" />
    </svg>
  )
}

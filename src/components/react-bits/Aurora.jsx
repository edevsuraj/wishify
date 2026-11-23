/**
 * Aurora background — inspired by React Bits' Aurora (https://reactbits.dev).
 * Implemented with blurred CSS gradients instead of WebGL so it stays cheap
 * on mobile and works with reduced-motion settings.
 */
export default function Aurora({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute -top-[28%] left-[4%] h-[34rem] w-[34rem] rounded-full bg-[#F6A6B2]/45 blur-[88px] animate-drift" />
      <div
        className="absolute -top-[16%] right-[2%] h-[30rem] w-[30rem] rounded-full bg-[#F2B45C]/30 blur-[92px] animate-float-slow"
        style={{ animationDelay: '-3s' }}
      />
      <div
        className="absolute bottom-[-30%] left-[36%] h-[28rem] w-[28rem] rounded-full bg-[#A9C6AE]/35 blur-[100px] animate-drift"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-[-24%] right-[8%] h-[24rem] w-[24rem] rounded-full bg-[#C6B2EE]/25 blur-[96px] animate-float"
        style={{ animationDelay: '-2s' }}
      />
    </div>
  )
}

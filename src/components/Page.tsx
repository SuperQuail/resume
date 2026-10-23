import type { ReactNode } from 'react'

/** A4 纸张容器：屏幕上是一张卡片，打印时铺满页面 */
export function Page({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-[820px] bg-paper px-5 py-7 md:my-10 md:rounded-lg md:border md:border-line md:px-14 md:py-12 print:my-0 print:max-w-none print:rounded-none print:border-0 print:p-0">
      {children}
    </main>
  )
}

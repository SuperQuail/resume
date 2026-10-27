/** 从编辑面板跳到预览里对应的区块（只做显式点击，不自动跟随） */

export function locatePreview(title: string | null): void {
  const pane = document.querySelector('.preview-pane')
  if (!(pane instanceof HTMLElement)) return

  if (!title) {
    pane.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const target = pane.querySelector('[data-section="' + title + '"]')
  if (!(target instanceof HTMLElement)) return

  const offset = target.getBoundingClientRect().top - pane.getBoundingClientRect().top
  pane.scrollTo({ top: pane.scrollTop + offset - 16, behavior: 'smooth' })
}

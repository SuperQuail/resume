let counter = 0

/** 生成轻量唯一 id（浏览器端够用，不依赖 crypto 兼容性） */
export function createId(prefix = 'id'): string {
  counter += 1
  return prefix + '-' + Date.now().toString(36) + '-' + counter.toString(36)
}

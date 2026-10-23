import { Fragment } from 'react'

/** 行内富文本：**加粗**、==强调==（强调样式为等宽 + 主色，用来突出数字） */
const TOKEN = /(\*\*[^*]+\*\*|==[^=]+==)/g

export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return (
            <strong key={index} className="font-semibold text-ink">
              {part.slice(2, -2)}
            </strong>
          )
        }

        if (part.startsWith('==') && part.endsWith('==') && part.length > 4) {
          return (
            <span key={index} className="font-mono font-semibold text-accent">
              {part.slice(2, -2)}
            </span>
          )
        }

        return <Fragment key={index}>{part}</Fragment>
      })}
    </>
  )
}

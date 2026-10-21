import React from 'react'
import type { CodeBlock as CodeBlockData } from '@/payload-types'

import { Code } from './CodeClient'

export type CodeBlockProps = Pick<CodeBlockData, 'code' | 'language' | 'blockType'>

type Props = CodeBlockProps & {
  className?: string
}

export const CodeBlock: React.FC<Props> = ({ className, code, language }) => {
  return (
    <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
      <Code code={code} language={language ?? undefined} />
    </div>
  )
}

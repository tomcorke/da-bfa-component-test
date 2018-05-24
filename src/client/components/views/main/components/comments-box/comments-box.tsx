import * as React from 'react'

import * as STYLES from './comments-box.scss'

interface CommentsBoxProps {
  onChange: (newValue: string) => any
  value?: string
}

const CommentsBox = ({ onChange, value }: CommentsBoxProps) => {
  return (
    <div className={STYLES.commentsBox}>
      <textarea
        onChange={e => onChange(e.target.value)}
        placeholder={'Comments'}
        value={value} />
    </div>
  )
}

export default CommentsBox

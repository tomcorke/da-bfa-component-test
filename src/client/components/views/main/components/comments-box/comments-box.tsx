import * as React from 'react'

import * as STYLES from './comments-box.scss'

interface CommentsBoxProps {
  onChange: (newValue: string) => any
  value?: string
  isLocked?: boolean
}

const CommentsBox = ({ onChange, value, isLocked }: CommentsBoxProps) => {

  const rootClasses = [STYLES.commentsBox]
  if (isLocked) rootClasses.push(STYLES.commentsBox__locked)

  return (
    <div className={rootClasses.join(' ')}>
      <textarea
        onChange={e => onChange(e.target.value)}
        placeholder={'Comments'}
        value={value}
        readOnly={isLocked} />
    </div>
  )
}

export default CommentsBox

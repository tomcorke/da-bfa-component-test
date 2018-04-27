import React from 'react'

import STYLES from './comments-box.scss'

const CommentsBox = ({ onChange, value }) => {
  return (
    <div className={STYLES.commentsBox}>
      <textarea
        onChange={e => onChange(e.target.value)}
        placeholder={'Comments'}>
        {value}
      </textarea>
    </div>
  )
}

export default CommentsBox

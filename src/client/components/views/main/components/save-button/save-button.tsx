import * as React from 'react'

import Button from '../../../../button'

interface SaveButtonProps {
  onClick: () => any
  highlight: boolean
}

const SaveButton = ({ onClick, highlight }: SaveButtonProps) => {
  return <Button
    type='save'
    text='Save your selections'
    onClick={onClick}
    highlight={highlight} />
}

export default SaveButton

import React from 'react'

import Button from '../../../../button'

const SaveButton = ({ onClick, highlight }) => {
  return <Button
    type='save'
    text='Save your selections'
    onClick={onClick}
    highlight={highlight} />
}

export default SaveButton

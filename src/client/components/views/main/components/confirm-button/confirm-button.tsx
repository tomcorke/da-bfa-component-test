import * as React from "react";

import Button from "../../../../button";

interface ConfirmButtonProps {
  onClick: () => any;
  highlight: boolean;
}

const ConfirmButton = ({ onClick, highlight }: ConfirmButtonProps) => {
  return (
    <Button type="save" text="Agree & confirm selections" onClick={onClick} />
  );
};

export default ConfirmButton;

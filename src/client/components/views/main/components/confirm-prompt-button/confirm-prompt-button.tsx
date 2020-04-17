import * as React from "react";

import Button from "../../../../button";

interface ConfirmPromptButtonProps {
  onClick: () => any;
}

const ConfirmPromptButton = ({ onClick }: ConfirmPromptButtonProps) => {
  return (
    <Button type="save" text="Confirm locked selections" onClick={onClick} />
  );
};

export default ConfirmPromptButton;

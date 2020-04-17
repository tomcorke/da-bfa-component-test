import * as React from "react";

import * as STYLES from "./feedback-message.scss";

interface FeedbackMessageProps {
  message: string;
  fade: boolean;
  hide: boolean;
  style: string;
  onClick: () => any;
}

const FeedbackMessage = ({
  message,
  fade,
  hide,
  style,
  onClick
}: FeedbackMessageProps) => {
  if (!message || hide) {
    return null;
  }

  const classNames = `${STYLES.feedbackMessage} ${fade && STYLES.fadeout} ${
    STYLES[`feedbackMessage__${style}`]
  }`;

  return (
    <div onClick={onClick} className={classNames}>
      {message}
    </div>
  );
};

export default FeedbackMessage;

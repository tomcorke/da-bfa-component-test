import * as React from "react";

import * as STYLES from "./login-button.scss";

interface LoginButtonProps {
  href?: string;
  onClick?: () => any;
  text: string;
  type?: string;
  disabled?: boolean;
}

const LoginButton = ({
  href,
  onClick,
  text,
  type = "default",
  disabled
}: LoginButtonProps) => {
  const className = `${STYLES.loginButton} ${STYLES[`loginButton__${type}`]} ${
    disabled ? STYLES.disabled : ""
  }`;

  if (disabled) {
    return <div className={className}>{text}</div>;
  }

  if (href) {
    return (
      <a href={href} className={className}>
        {text}
      </a>
    );
  } else if (onClick) {
    return (
      <div onClick={onClick} className={className}>
        {text}
      </div>
    );
  } else {
    throw Error("href or onClick required");
  }
};

export default LoginButton;

import * as React from "react";

import * as STYLES from "./button.scss";

interface ButtonWrapperProps {
  children?: any;
  onClick: () => any;
  href?: string;
  type: string;
}

const ButtonWrapper = ({
  children,
  onClick,
  href,
  type
}: ButtonWrapperProps) => {
  const className = `${STYLES.wrapper} ${STYLES[`wrapper__${type}`]}`;
  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  } else {
    return (
      <div onClick={onClick} className={className}>
        {children}
      </div>
    );
  }
};

interface ButtonProps {
  text: string;
  onClick: () => any;
  href?: string;
  type: string;
  highlight?: boolean;
}

const Button = ({ text, onClick, href, type, highlight }: ButtonProps) => {
  const buttonClasses = `${STYLES.button} ${highlight && STYLES.highlight}`;
  return (
    <ButtonWrapper {...{ onClick, href, type }}>
      <div className={buttonClasses}>
        <div className={STYLES.buttonOuter}>
          <div className={STYLES.buttonInner}>
            <div className={STYLES.label}>{text}</div>
          </div>
        </div>
      </div>
    </ButtonWrapper>
  );
};

export default Button;

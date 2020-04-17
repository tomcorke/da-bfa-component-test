import * as React from "react";

import * as STYLES from "./footer.scss";

import daLogo from "../../../../images/da.png";

const Footer = () => {
  return (
    <div className={STYLES.footer}>
      <p>
        <img src={daLogo} className={STYLES.logo} />
      </p>
      <p>Site &copy; Distinctly Average</p>
      <p>Created by some kind of wizard</p>
      <p>
        Artwork used without permission from Blizzard. I don't think they'll
        mind.
      </p>
      <p>
        SVG icons from{" "}
        <a href="https://fontawesome.com/license">Font Awesome</a>
      </p>
      <p>v{process.env.GIT_VERSION}</p>
    </div>
  );
};

export default Footer;

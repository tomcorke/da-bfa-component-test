import * as React from "react";
import { hot } from "react-hot-loader";

import Divider from "../divider";
import FeedbackMessage from "../feedback-message";
import Footer from "../footer";
import Header from "../header";
import MainSection from "../main-section";
import Section from "../section";
import SubHeader from "../subheader";
import WindowMessageReceiver from "../window-message-receiver";

import * as STYLES from "./bfa-planner.scss";

interface BfaPlannerProps {
  init: () => any;
}

class BfaPlanner extends React.Component<BfaPlannerProps> {
  componentDidMount() {
    this.props.init();
  }

  render() {
    return (
      <div className={STYLES.bfaPlanner}>
        <Section type={"header"}>
          <Header>
            Distinctly Average Class Selection
            <SubHeader>
              For Kids Who Can't Raid Good And Want To Learn How To Do Other
              Good Stuff Too
            </SubHeader>
          </Header>
        </Section>

        <Divider />

        <MainSection />

        <Divider type={"bottom"} />

        <Section type={"fill"}>
          <Footer />
        </Section>

        <FeedbackMessage />

        <WindowMessageReceiver />
      </div>
    );
  }
}

export default hot(module)(BfaPlanner);

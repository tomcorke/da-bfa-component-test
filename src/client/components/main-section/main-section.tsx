import * as React from "react";

import { View } from "../../redux/reducers/views";
import Section from "../section";
import ViewMenu from "../view-menu";
import AuditView from "../views/audit";
import IntroView from "../views/intro";
import MainView from "../views/main";
import OverviewView from "../views/overview";
import SummaryView from "../views/summary";

interface MainSectionProps {
  view: View;
}

const MainSection = ({ view }: MainSectionProps) => {
  const ViewComponent = {
    intro: IntroView,
    main: MainView,
    overview: OverviewView,
    summary: SummaryView,
    audit: AuditView,
  }[view];

  return (
    <Section type="main">
      <ViewMenu />

      <ViewComponent />
    </Section>
  );
};

export default MainSection;

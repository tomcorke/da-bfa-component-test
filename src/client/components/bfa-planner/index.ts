import { hot } from "react-hot-loader";
import { connect } from "react-redux";

import { init } from "../../redux/actions/init";

import BfaPlanner from "./bfa-planner";

const ConnectedBfaPlanner = connect(null, { init })(BfaPlanner);

export default hot(module)(ConnectedBfaPlanner);

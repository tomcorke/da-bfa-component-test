import * as adminActions from './admin'
import * as feedbackActions from './feedback'
import * as loginActions from './login'
import * as overviewSelectionActions from './overview-selections'
import * as overviewActions from './overview'
import * as userDataActions from './user-data'
import * as viewActions from './views'

const actions = {
  admin: adminActions,
  feedback: feedbackActions,
  login: loginActions,
  overviewSelections: overviewSelectionActions,
  overview: overviewActions,
  userData: userDataActions,
  views: viewActions
}

export type ApplicationAction =
  | adminActions.AdminAction
  | feedbackActions.FeedbackAction
  | loginActions.LoginActions
  | overviewSelectionActions.OverviewSelectionsActions
  | overviewActions.OverviewAction
  | userDataActions.UserDataActions
  | viewActions.ViewActions

export default actions

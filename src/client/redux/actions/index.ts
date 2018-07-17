import * as adminActions from './admin'
import * as auditActions from './audit'
import * as feedbackActions from './feedback'
import * as loginActions from './login'
import * as overviewSelectionActions from './overview-selections'
import * as overviewActions from './overview'
import * as summaryActions from './summary'
import * as userDataActions from './user-data'
import * as viewActions from './views'

const actions = {
  admin: adminActions,
  audit: auditActions,
  feedback: feedbackActions,
  login: loginActions,
  overviewSelections: overviewSelectionActions,
  overview: overviewActions,
  summary: summaryActions,
  userData: userDataActions,
  views: viewActions
}

export type ApplicationAction =
  | adminActions.AdminAction
  | auditActions.AuditAction
  | feedbackActions.FeedbackAction
  | loginActions.LoginActions
  | overviewSelectionActions.OverviewSelectionsActions
  | overviewActions.OverviewAction
  | summaryActions.SummaryAction
  | userDataActions.UserDataActions
  | viewActions.ViewActions

export default actions

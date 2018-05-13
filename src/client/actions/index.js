import * as userDataActions from './user-data'
import * as viewActions from './views'
import * as feedbackActions from './feedback'
import * as loginActions from './login'
import * as overviewActions from './overview'
import * as adminActions from './admin'

const actions = {
  userData: userDataActions,
  views: viewActions,
  feedback: feedbackActions,
  login: loginActions,
  overview: overviewActions,
  admin: adminActions
}

export default actions

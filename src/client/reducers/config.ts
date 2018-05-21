const config = require(`../config/${process.env.NODE_ENV}`).default

const initialState = config

const ConfigReducer = (state = initialState) => {
  return state
}

export default ConfigReducer

import {combineReducers} from 'redux'
import client from '../ApolloClient'
import {reducer as formReducer} from 'redux-form'


export default combineReducers({
  apollo: client.reducer(),
  form: formReducer,

})

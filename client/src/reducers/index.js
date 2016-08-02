import { combineReducers } from 'redux';
import BillsReducer from './reducer_bills';
import UserReducer from './reducer_user';
import ValidateUserFieldsReducer from './reducer_validateUserFields';
import { reducer as formReducer } from 'redux-form';
const rootReducer = combineReducers({
  user: UserReducer,
  validateFields: ValidateUserFieldsReducer,
  bills: BillsReducer, //<-- Bills
  form: formReducer // <-- redux-form
});

export default rootReducer;

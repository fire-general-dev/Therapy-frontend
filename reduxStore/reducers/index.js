import { combineReducers } from "redux"

import counterReducer from "./counterReducer"
import timerReducer from "./timerReducer"
import authReducer from "./authReducer"
import messageReducer from "./messageReducer"
import doctorsList from "./doctorsListReducer"
import categoriesList from "./categoriesListReducer"
import articlesList from "./articlesListReducer"
import quizzesList from "./quizzesListReducer"
import bookAppointmentReducer from "./bookAppointmentReducer"

const reducers = {
  counter: counterReducer,
  timer: timerReducer,
  auth: authReducer,
  messageReducer,
  doctorsList,
  categoriesList,
  articlesList,
  quizzesList,
  cart: bookAppointmentReducer,
}

export default combineReducers(reducers)

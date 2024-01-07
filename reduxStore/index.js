import { createStore, applyMiddleware } from "redux"
import { createWrapper, HYDRATE } from "next-redux-wrapper"
import thunkMiddleware from "redux-thunk"
import combinedReducer from "./reducers"

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension")
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}
const reducer = (state, action) => {
  console.log(action.type)
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    // if (state.count.count) nextState.count.count = state.count.count // preserve count value on client side navigation
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore)

// /// initial states here
// const initalState = {};

// // middleware
// const middleware = [thunk];

// // creating store
// const reducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     };
//     if (state.count) nextState.count = state.count; // preserve count value on client side navigation
//     return nextState;
//   } else {
//     return combinedReducer(state, action);
//   }
// };

// export const store = createStore(
//   reducers,
//   initalState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// // create a makeStore function
// const makeStore = (context) => store;

// // export an assembled wrapper
// export const wrapper = createWrapper(makeStore, { debug: true });

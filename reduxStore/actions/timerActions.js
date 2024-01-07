import * as types from "../types"

// INITIALIZES CLOCK ON SERVER
export const serverRenderClock = () => (dispatch) =>
  dispatch({
    type: types.TICK,
    payload: { light: false, ts: Date.now() },
  })

// INITIALIZES CLOCK ON CLIENT
export const startClock = () => (dispatch) =>
  setInterval(() => {
    //   debugger;
    dispatch({ type: types.TICK, payload: { light: true, ts: Date.now() } })
  }, 1000)

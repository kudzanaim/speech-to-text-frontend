import {legacy_createStore as createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import {reducer} from "./reducer"

export const Store = createStore(reducer,
  { poems: null }, applyMiddleware(...[thunk.withExtraArgument()]))
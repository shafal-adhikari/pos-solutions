import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers/index";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./rootEpics";

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  );
  epicMiddleware.run(rootEpic);
  return store;
}

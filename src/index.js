import React from "react";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import "./styles.css";

import App from "./Components/App";
import rootReducer from "./reducers";

const logger = function ({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      // console.log("ACTION_TYPE", action.type);
      next(action);
    };
  };
};

// const thunk = ({ dispatch, getState }) => (next) => (action) => {
//   if (typeof action === "function") {
//     action(dispatch);
//     return;
//   }
//   next(action);
// };

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log("store", store);
// console.log("state", store.getState());

// export const StoreContext = createContext();

// console.log("StoreContext", StoreContext);

// class Provider extends React.Component {
//   render() {
//     const { store } = this.props;
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     );
//   }
// }

// store.dispatch({
//   type: "ADD_MOVIES",
//   movies: [{ name: "Superman" }]
// });

// console.log("After state", store.getState());

// export function connect(callback) {
//   return function (Component) {
//     class ConnectedComponent extends React.Component {
//       constructor(props) {
//         super(props);

//         this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
//       }

//       ComponentWillUnmount() {
//         this.unsubscribe();
//       }
//       render() {
//         const { store } = this.props;
//         const state = store.getState();
//         const dataToBePassedAsProps = callback(state);
//         return (
//           <Component {...dataToBePassedAsProps} dispatch={store.dispatch} />
//         );
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => <ConnectedComponent store={store} />}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return ConnectedComponentWrapper;
//   };
// }

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

import "./App.css";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import { all_reducers } from "./redux/reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";

const store = createStore(all_reducers);

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" exact element={<Main />} />
            <Route path="/signin" exact element={<Signin />} />
            <Route path="/signup" exact element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

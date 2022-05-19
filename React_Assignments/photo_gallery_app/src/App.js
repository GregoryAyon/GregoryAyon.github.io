import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainComponent from "./components/MainComponent";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { all_reducers } from "./redux/reducers/Reducer";

const store = createStore(all_reducers);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <MainComponent />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Users from "./views/Users";
import Clazz from "./views/Clazz/Clazz";
import Presence from "./views/Presence/Presence";
import ClazzTime from "./views/ClazzTime";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />}></Route>
          <Route exact path="/users" element={<Users />}></Route>
          <Route exact path="/clazz" element={<Clazz />}></Route>
          <Route exact path="/clazzTime" element={<ClazzTime />}></Route>
          <Route exact path="/presenca" element={<Presence />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

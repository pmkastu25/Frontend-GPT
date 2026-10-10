import { useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./myContext.jsx";

function App() {
    const providerValues = {};

  return (
  <div className='app'>
    <MyContext.Provider values = {providerValues}>
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
    </MyContext.Provider>
  </div>
  );
}

export default App;

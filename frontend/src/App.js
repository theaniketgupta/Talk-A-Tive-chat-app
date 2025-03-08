import "./App.css";
import { Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="App">
      {/* // <Button colorScheme="blue">Button</Button> */}
      <Route exact path="/chats" component={ChatPage}/>
      <Route exact path="/" component={Homepage}/>
    </div>
  );
}

export default App;

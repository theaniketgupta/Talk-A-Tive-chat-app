import "./App.css";
import { Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";

export const endpoint = "https://talk-a-tive-chat-app-du4i.onrender.com";

function App() {
  return (
    <div className="App">
      {/* // <Button colorScheme="blue">Button</Button> */}
      <Route exact path="/chats" component={ChatPage} />
      <Route exact path="/" component={Homepage} />
    </div>
  );
}

export default App;

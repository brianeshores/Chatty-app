import React, {Component} from 'react';
import MessageList from "./message_list.jsx"
import Message from "./message.jsx";
import Chatbar from './chatbar.jsx';
const URL = 'ws://localhost:3001';


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentUser: "",
      messages: []
    };
  }
  
  socket = new WebSocket(URL);
  componentDidMount() {
    this.socket.onopen= function() {
      console.log("connected to server")
    }
    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const oldMessages = this.state.messages;
      const newMessages = [...oldMessages, msg];
      this.setState({messages: newMessages});
    } 
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 8, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 3000);
  }

  newMessage = (type, username, message) => {
    const newMessage = {
      type: type,
      content: message,
      username: username,
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = {this.state.messages}/>
        <Chatbar currentUser = {this.state.currentUser} 
                 newMessage={this.newMessage}/>
      </div>
    );
  }
}
export default App;




import React, {Component} from 'react';
import MessageList from "./message_list.jsx"
import Chatbar from './chatbar.jsx';
const URL = 'ws://localhost:3001';


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      messages: [],
      clientNum: 0,
      clientColor: "",
      currentUser: "Anonymous"
    };
  }
  
  socket = new WebSocket(URL);
  
  componentDidMount() {
    this.socket.onmessage = (event) => {
      
      const msg = JSON.parse(event.data);
      if(msg.type === "incomingMessage" || msg.type === "username changed") {
        const oldMessages = this.state.messages;
        const newMessages = [...oldMessages, msg];
        this.setState({
          messages: newMessages,
        });
      } 
      
      else if (msg.type === "colorChange") {
        this.setState({clientColor: msg.clientColor});
      }
      
      else if (msg.type === "clientNumChange") {
        this.setState({clientNum: msg.clientNum});
      }
      
      this.scrollToBottom();
    } 
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  newMessage = (type, username, message) => {
    const newMessage = {
      type: type,
      username: username,
      content: message,
      clientColor: this.state.clientColor
    }
    
    this.socket.send(JSON.stringify(newMessage));
  }

  newName = (newName) => {
    this.setState({currentUser: newName})
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="navbar-brand" id="counter">{this.state.clientNum} users online</div>
        </nav>
        <MessageList messages = {this.state.messages} currentUser = {this.state.currentUser}/>
        <Chatbar currentUser = {this.state.currentUser} newMessage={this.newMessage} newName={this.newName}/>
        <div style={{ float:"left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
    );
  }
}
export default App;



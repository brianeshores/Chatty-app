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
      currentUser: {name: "Anonymous"}
    };
  }
  
  socket = new WebSocket(URL);
  
  componentDidMount() {
    
    this.socket.onopen= function() {
    }
    
    this.socket.onmessage = (event) => {
      
      const msg = JSON.parse(event.data);

      if(msg.type) {
        const oldMessages = this.state.messages;
        const newMessages = [...oldMessages, msg];
        this.setState({
          messages: newMessages,
        });
      } 
      
      if (msg.clientColor) {
        this.setState({clientColor: msg.clientColor});
      }
      
      if (msg.clientNum) {
        this.setState({clientNum: msg.clientNum});
      }
    } 
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
    
    this.setState({currentUser: {name: newName}})
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="navbar-brand" id="counter">{this.state.clientNum} users online</div>
        </nav>
        <MessageList messages = {this.state.messages} currentUser = {this.state.currentUser}/>
        <Chatbar currentUser = {this.state.currentUser} newMessage={this.newMessage} newName={this.newName} />
      </div>
    );
  }
}
export default App;




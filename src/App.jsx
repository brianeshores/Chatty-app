import React, {Component} from 'react';
import MessageList from "./message_list.jsx"
import Message from "./message.jsx";
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
      console.log("connected to server")
    }
    this.socket.onmessage = (event) => {
      
      const msg = JSON.parse(event.data);

      if(msg.type) {
        const oldMessages = this.state.messages;
        const newMessages = [...oldMessages, msg];
        this.setState({
          messages: newMessages,
        });
      } else {
        this.setState({clientNum: msg.clientNum});
        this.setState({clientColor: msg.clientColor});
      }

    } 
    // console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   const newMessage = {id: 8, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   this.setState({messages: messages})
    // }, 3000);
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




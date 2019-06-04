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
      //   {
      //     id: 1,
      //     type: "incomingMessage",
      //     content: "I won't be impressed with technology until I can download food.",
      //     username: "Anonymous1"
      //   },
      //   {
      //     id: 2,
      //     type: "incomingNotification",
      //     content: "Anonymous1 changed their name to nomnom",
      //   },
      //   {
      //     id: 3,
      //     type: "incomingMessage",
      //     content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
      //     username: "Anonymous2"
      //   },
      //   {
      //     id: 4,
      //     type: "incomingMessage",
      //     content: "...",
      //     username: "nomnom"
      //   },
      //   { 
      //     id: 5,
      //     type: "incomingMessage",
      //     content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
      //     username: "Anonymous2"
      //   },
      //   { 
      //     id: 6,
      //     type: "incomingMessage",
      //     content: "This isn't funny. You're not funny",
      //     username: "nomnom"
      //   },
      //   { 
      //     id: 7,
      //     type: "incomingNotification",
      //     content: "Anonymous2 changed their name to NotFunny",
      //   }
      // ]
    };
  }

  socket = new WebSocket(URL);
  componentDidMount() {
    this.socket.onopen= function() {
      console.log("connected to server")
    }
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 8, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  newMessage = (username, message) => {
    this.setState({messages: [...this.state.messages,
    { id: this.state.messages.length,
      type: "incomingMessage",
      content: message,
      username: username 
    }]})
    this.socket.send(`User ${username} says ${message}`);
    //[messages..., newthing]
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




import React, {Component} from 'react';
import Message from "./message.jsx";

class MessageList extends Component {
  
  render() {
    console.log("this.props: ", this.props);
    const printMessages = this.props.messages.map((msg) => 
      <Message key={msg.id} message={msg} color={msg.clientColor}/>
    )

    return (
      <div>
        <main className="messages">{printMessages}</main>
      </div>
    )
  }
}
export default MessageList;
  
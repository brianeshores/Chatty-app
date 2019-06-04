import React, {Component} from 'react';
import Message from "./message.jsx";

class MessageList extends Component {
  render() {
    const printMessages = this.props.messages.map((msg) => 
      <Message key={msg.id} message={msg}/>
    )

    return (
      <div>
        <main className="messages">{printMessages}</main>
      </div>
    )
  }
}
export default MessageList;
  
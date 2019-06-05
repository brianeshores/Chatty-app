import React, {Component} from 'react';
import MessageList from './message_list.jsx'

class Message extends Component {
  
  render() {
    if (this.props.message.type === "incomingMessage") {
      return (
        <div>
          <div className="message">
            <span className="message-username">{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
          </div>
        </div>);
      } else {
      return (
        <div>  
          <div className="message system">
            <span className="message-username">{this.props.message.type} to {this.props.message.username}</span>
          </div>
        </div>);
      }
    }
  }
export default Message;
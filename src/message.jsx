import React, {Component} from 'react';
import MessageList from './message_list.jsx'

class Message extends Component {
  render() {
    const style = {
      color: this.props.color
    }
    const message = this.props.message;
    
    function checkUrl(url){
      var arr = [ "jpeg", "jpg", "gif", "png" ];
      var ext = url.substring(url.lastIndexOf(".")+1);
      return (arr.includes(ext));
     }

    if (this.props.message.type === "incomingMessage" && !checkUrl(message.content)) {
      return (
        <div>
          <div className="message">
            <span style={style} className="message-username">{message.username} :</span>
            <span className="message-content">{message.content}</span>
          </div>
        </div>);
    } 
    else if (message.type === "incomingMessage" && checkUrl(message.content)) {  
    return (
      <div>
        <div>
          <span style={style} className="message-username">{message.username} :</span>
          <img id="images" src={message.content}/>
        </div>
      </div>); 
    }
    else {
      return (
        <div>  
          <div className="message">
            <span className="message-username">{message.content}</span>
          </div>
        </div>);
    }
  }
}
export default Message;
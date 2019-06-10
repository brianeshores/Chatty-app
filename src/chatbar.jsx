import React, {Component} from 'react';
class Chatbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: props.currentUser,
      message: "",
      type: ""
    }
  }

  onUsernameChange = (evt) => {
    evt.preventDefault();
    this.setState({
      username: evt.target.value,
      type: "postNotification",
      message:`${this.props.currentUser} has changed their name to ${evt.target.value}`
    }, () => {
      this.props.newName(this.state.username)
      this.props.newMessage(this.state.type, this.state.username, this.state.message);
    })
  }

  onMessageChange = (evt) => {
      if(evt.target.value !== "") {
      this.setState({
        message: evt.target.value,
        type: "incomingMessage"
      })
      if(evt.keyCode == 13) {
        evt.preventDefault();
        this.props.newMessage(this.state.type, this.state.username, this.state.message);
        evt.target.value = '';
      }
    }
  }  
  
  render() {
    return (
      <div className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onBlur = {this.onUsernameChange}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.onMessageChange}/>
      </div>
    )
  }
}

export default Chatbar;
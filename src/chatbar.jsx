import React, {Component} from 'react';
class Chatbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: "",
      message: ""
    }
  }

  onUsernameChange = (evt) => {
    this.setState({username: evt.target.value})
    if(evt.keyCode == 13) {
      evt.preventDefault();
      this.props.newMessage(this.state.username, this.state.message);
    }
  }

  onMessageChange = (evt) => {
    this.setState({message: evt.target.value})
    if(evt.keyCode == 13) {
      evt.preventDefault();
      this.props.newMessage(this.state.username, this.state.message);
      evt.target.value = '';
    }
  }  
  render() {
    return (
      <div className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onChange={this.onUsernameChange}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.onMessageChange}/>
      </div>
    )
  }
}
export default Chatbar;
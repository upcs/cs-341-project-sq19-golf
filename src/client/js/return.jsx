import React, {Component} from 'react';

export default class Return extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="section">
        <button className="return" onClick={window.history.back()}>Return</button>
      </div>
    )
  }
}

import React, { Component } from "react";

class DefaultButton extends Component {
  render() {
    return (
      <>
        <button
          type={this.props.type ? this.props.type : "button"}
          style={{
            outline: "none",
            border: "1px solid",
            borderColor: this.props.borderColor
              ? this.props.borderColor
              : "#000000",
            backgroundColor: this.props.backgroundColor
              ? this.props.backgroundColor
              : "#FFFFFF",
            color: this.props.textColor ? this.props.textColor : "#000000",
            textTransform: "capitalize",
            fontSize: "15px",
            padding: "2px 15px",
            width: "100%",
          }}
          onClick={this.props.onClick}
        >
          {this.props.text}
        </button>
      </>
    );
  }
}

export default DefaultButton;

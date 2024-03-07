"use strict";

import React from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

class SketchExample extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: "255",
      g: "255",
      b: "255",
      a: "1",
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });

    if (this.props.onColorChange) {
      this.props.onColorChange(color.rgb);
    }
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },
        swatch: {
          display: "flex",
          cursor: "pointer",
          alignItems: "center",
        },
        popover: {
          position: "absolute",
          zIndex: "2",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default SketchExample;

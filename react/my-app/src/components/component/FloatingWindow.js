import React from "react";
import PropTypes from 'prop-types';
import Draggable from 'react-draggable'; // The default
import "./css/FloatingWindowStyle.css";

class FloatingWindow extends React.Component {
    render() {
        return (
            <Draggable>
                <div className="window">
                    <FloatingWindowHeader />
                    <FloatingWindowContent />
                    <FloatingWindowStatusBar />
                </div>
            </Draggable>
        );
    }
}


class FloatingWindowHeader extends React.Component {
    constructor(props){
        super(props);
        this.expandWindow = PropTypes.func;
        this.compressWindow = PropTypes.func;
    }

    render() {
        return (
            <div className="window-header">
                <span className="window-title">Window title</span>
                <FloatingWindowControl 
                expandWindow={this.expandWindow}
                compressWindow={this.compressWindow}
                />
            </div>
        );
    }
}
  
class FloatingWindowControl extends React.Component {
    constructor(props) {
        super(props);
        this.expandWindow = PropTypes.func;
        this.compressWindow = PropTypes.func;
    }

    render() {
        return (
        <span className="window-control">
            <i className="icon minus"></i>
            <i className="icon expand" onClick={this.expandWindow}></i>
            <i className="icon remove"></i>
        </span>
        );
    }  
};
  
class FloatingWindowContent extends React.Component {
    render() {
        return (
            <div className="window-content">blablajdsfsfasdfsdf sadf sdfdsfads f af sdfsadfsdfsdfsafdsaf dsf sad s f aa fdsf a sadf sad f adsf dsfjlkds jfalkdsfj lasdj fsaas lfads lfdsja flksjflaksjfd fjfkjdsf</div>
        );
    }  
}
  
class FloatingWindowStatusBar extends React.Component {
    render() {
        return (
            <div className="window-statusbar">
                <span className="window-status">Status bar</span>
                <span className="window-resize-control">
                    <i className="icon maximize"></i>
                </span>
            </div>
        );
    }  
}
  
const Test = () => {
    return(
        <FloatingWindow />
    );
  }
  
export default Test;
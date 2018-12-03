import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <ul id="header">
        <li id='flex-header'>
          <h2>Header here</h2>
        </li>
      </ul>
    );
  }
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.triggerRef = React.createRef();
    this.bgRef = React.createRef();
    this.contentRef = React.createRef();

  }

  componentDidMount() {
    // Pass the required refs to App parent component:
    let passBgRef = this.props.bgRef;
    passBgRef(this.bgRef);
    let passContentRef = this.props.contentRef;
    passContentRef(this.contentRef);
  }

  handleClick = () => {
    let background = this.bgRef.current;
    let content = this.contentRef.current;

    if (content.classList.contains("active")) {
      content.classList.remove("active");
      background.classList.remove("active");
    } else {
      content.classList.add("active");
      background.classList.add("active");
    }
  }

  render() {

    return (
      <div className='sidebar'>
          <button className="sidebar-trigger" ref={this.triggerRef} onClick={this.handleClick}>
            &#9881;
          </button>
          {/* A mock layer to click on and hide menu: */}
          <div className="sidebar-background" ref={this.bgRef} onClick={this.handleClick} />

          <div className="sidebar-content" ref={this.contentRef}>
              <button>&times; Close</button>
              <button>&#9776; Navigation</button>
              <button>&#9881; Settings</button>
          </div>

      </div>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xDown: null,
      yDown: null,
      bgRef: null,
      contentRef: null,
    };
  }

  getBgRef = (bgRef) => {
    this.setState({ bgRef: bgRef });
  }

  getContentRef = (contentRef) => {
    this.setState({ contentRef });
  }

  handleTouchStart = (evt) => {
      let xDown = evt.touches[0].clientX;
      let yDown = evt.touches[0].clientY;
      this.setState({ xDown, yDown });
  }

  handleTouchMove = (evt) => {
      let xDown = this.state.xDown;
      let yDown = this.state.yDown;

      if ( !xDown || !yDown ) {
          return;
      }

      let content = this.state.contentRef.current;
      let bg = this.state.bgRef.current;

      if ( xDown > ((10/100) * (window.screen.width)) ) {
        if ( !content.classList.contains("active")) {
          return;
        }
      }

      let xUp = evt.touches[0].clientX;
      let yUp = evt.touches[0].clientY;

      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;

      if ( Math.abs(xDiff) > Math.abs(yDiff) ) {
          if ( xDiff > 0 ) {
              /* left swipe */ 
              content.classList.remove("active");
              bg.classList.remove("active");
          } else {
              /* right swipe */
              content.classList.add("active");
              bg.classList.add("active");
          }
      }
      xDown = null;
      yDown = null;
      this.setState({ xDown, yDown });
  }


  render() {

    return (
      <div id='app'
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove} >
            
          <Header />
          <Sidebar contentRef={this.getContentRef}
                   bgRef={this.getBgRef} />
          <Content />
      </div>
    );
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div id='content'>
        <p>Content here ...</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud
          xercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud
          xercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud
          xercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
      </div>
    );
  }
}


//==============================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

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
    this.state = {
      isActive: false,
    };
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
    let isActive = !this.state.isActive;
    this.setState({ isActive });

    // let passSidebarState = this.props.sidebarState;
    // passSidebarState(isActive);
  }

  handleSideClick = () => {
    let isActive = this.state.isActive;
    if (!isActive) {
      this.setState({ isActive: !isActive });

      // let passSidebarState = this.props.sidebarState;
      // passSidebarState(!isActive);
    }
  }

  render() {
    let bgClass = this.state.isActive ? 'sidebar-background active' : 'sidebar-background';
    let contentClass = this.state.isActive ? 'sidebar-content active' : 'sidebar-content';

    return (
      <div className='sidebar' onClick={this.handleSideClick}>
          <button className="sidebar-trigger" onClick={this.handleClick}>
            &#9881;
          </button>

          {/* A mock background layer to hide sidebar by clicking on it: */}
          <div className={bgClass} ref={this.bgRef} onClick={this.handleClick} />

          {/* The content of the sidebar: */}
          <div className={contentClass} ref={this.contentRef}>
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

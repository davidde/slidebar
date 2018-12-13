import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.scss';


function Header() {
  return (
    <div id="header">
        <h2>Header here</h2>
    </div>
  );
}

function Sidebar(props) {
  // 'active' class is used for portrait orientation,
  // while 'passive' class is used for landscape:
  let sidebarClass = props.isActive ? 'sidebar' : 'sidebar passive';
  let bgClass = props.isActive ? 'sidebar-background active' : 'sidebar-background';
  let contentClass = props.isActive ? 'sidebar-content active' : 'sidebar-content passive';
  // Prevent body from scrolling when Sidebar is active:
  document.body.classList.toggle('noScroll', props.isActive);

  return (
    <div className={sidebarClass} onClick={props.onSideClick}>
        <button className="sidebar-trigger" onClick={props.onClick}>
          &#9881;
        </button>

        {/* A mock background layer to hide the sidebar by clicking on it: */}
        <div className={bgClass} onClick={props.onClick} />

        {/* The content of the sidebar: */}
        <div className={contentClass} >
            <div className='sidebar-name'>Settings</div>
            <hr className='line' />
            <div className='padding'>
              <button>&times; Close</button>
              <button>&#9776; Navigation</button>
              <button>&#9881; Settings</button>
            </div>
        </div>
    </div>
  );
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarActive: false,
      clientX: null,
      clientY: null,
    };
  }

  componentDidMount() {
    // If in landscape:
    if ( window.matchMedia("(orientation: landscape)").matches && window.innerWidth > styles.mediaQueryWidth) {
      this.setState({ sidebarActive: true });
    }
    // Apparently, custom events don't support custom conditions to activate them,
    // which makes things complicated if that's what you wanna do ...
    // The first 'general' event sets up the second 'conditional' event:
    window.addEventListener('resize', this.widthBreakpoint);
    window.addEventListener("widthBP", this.toggleSidebar );  // Doesn't trigger reliably!
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.widthBreakpoint);
    window.removeEventListener("widthBP", this.toggleSidebar );
  }

  toggleSidebar = () => {this.setState({ sidebarActive: !this.state.sidebarActive });}

  widthBreakpoint() {
    // console.log(window.innerWidth);  // = integer
    // console.log(styles.mediaQueryWidth);  // = string
    if (window.innerWidth == styles.mediaQueryWidth) {
      // console.log('Toggle');
      // Create the event
      var event = new CustomEvent("widthBP");
      // Dispatch/Trigger/Fire the event
      window.dispatchEvent(event);
    }
  }

  handleTouchStart = (event) => {
    // 'touches' returns a list of all the touch objects
    // that are currently in contact with the surface;
    // touches[0] indicates that it will only show the
    // coordinates of one finger (the first).
    let clientX = event.touches[0].clientX;
    let clientY = event.touches[0].clientY;
    this.setState({ clientX, clientY });
  }

  handleTouchMove = (event) => {
    // 'clientX' returns the X coordinate of the touch point
    // relative to the left edge of the browser viewport,
    // not including any scroll offset.
    let clientX = this.state.clientX;
    // 'clientY' returns the Y coordinate of the touch point
    // relative to the top edge of the browser viewport,
    // not including any scroll offset.
    let clientY = this.state.clientY;

    if ( !clientX || !clientY ) {
        return;
    }

    if ( clientX > ((25/100) * (window.screen.width)) ) {
      if ( !this.state.sidebarActive ) {
        return;
      }
    }

    let xDelta = event.touches[0].clientX - clientX;
    let yDelta = event.touches[0].clientY - clientY;

    if ( Math.abs(xDelta) > Math.abs(yDelta) ) {
      // if xDelta > 0: right swipe
      if (xDelta > 0) {
        this.setState({ sidebarActive: true });
      } else {
        // if xDelta < 0: left swipe
        this.setState({ sidebarActive: false });
      }
    }

    clientX = null;
    clientY = null;
    this.setState({ clientX, clientY });

    event.preventDefault();
  }

  handleClick = () => {
    let sidebarActive = !this.state.sidebarActive;
    this.setState({ sidebarActive });
  }

  handleSideClick = () => {
    let sidebarActive = this.state.sidebarActive;
    if (!sidebarActive) {
      this.setState({ sidebarActive: !sidebarActive });
    }
  }

  render() {
    return (
      <div id='app'
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove} >
            
          <Header />
          <Sidebar isActive={this.state.sidebarActive}
                   onClick={this.handleClick}
                   onSideClick={this.handleSideClick} />
          <Content />
      </div>
    );
  }
}

function Content() {
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


//==============================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

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
        <li id='flex-trigger'>

        </li>
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
    this.state = {
      
    };
  }

  // handleStuff() {
  //   // This handles the slider status:
  //   var sliderTrigger = document.getElementById("slider-trigger");
    

    

  //   sliderTrigger.addEventListener( "click" , handleSlider);
  //   sliderBg.addEventListener("click", handleSlider);

  //   // This handles the touch:
  //   document.addEventListener('touchstart', handleTouchStart, false);
  //   document.addEventListener('touchmove', handleTouchMove, false);

  //   var xDown = null;
  //   var yDown = null;

  //   function handleTouchStart(evt) {
  //       xDown = evt.touches[0].clientX;
  //       yDown = evt.touches[0].clientY;
  //   };                                                

  //   function handleTouchMove(evt) {
  //       if ( !xDown || !yDown ) {
  //           return;
  //       }

  //       if ( xDown > ((10/100) * (screen.width)) ) {
  //         if ( !slider.classList.contains("active")) {
  //           return;
  //         }
  //       }

  //       var xUp = evt.touches[0].clientX;
  //       var yUp = evt.touches[0].clientY;

  //       var xDiff = xDown - xUp;
  //       var yDiff = yDown - yUp;

  //       if ( Math.abs(xDiff) > Math.abs(yDiff) ) {
  //           if ( xDiff > 0 ) {
  //               /* left swipe */ 
  //               slider.classList.remove("active");
  //               sliderBg.classList.remove("active");
  //           } else {
  //               /* right swipe */
  //               slider.classList.add("active");
  //               sliderBg.classList.add("active");
  //           }
  //       }
  //       xDown = null;
  //       yDown = null;
  //   };
  // }

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  

  render() {
    return (
      <div id='app'>
          <Header />
          <Sidebar />
          <Content />
      </div>
    );
  }
}

//==============================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

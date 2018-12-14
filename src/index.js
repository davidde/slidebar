import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.scss';


function Header() {
  return (
    <div id="header">
        Header here
    </div>
  );
}

function Sidebar(props) {
  let sidebarClass = 'sidebar';
  let bgClass = 'sidebar-background';
  let contentClass = 'sidebar-content';

  if (props.landscapePassive) {
    sidebarClass += ' landscapePassive';
    contentClass += ' landscapePassive';
  }

  if (props.portraitActive) {
    bgClass += ' portraitActive';
    contentClass += ' portraitActive';
  }

  document.body.classList.toggle('noScroll', props.portraitActive);

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
      portraitActive: false,
      landscapePassive: false,
      clientX: null,
      clientY: null,
    };
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

    if ( Math.abs(clientX) > ((25/100) * (window.screen.width)) ) {
      if ( !this.state.portraitActive ) {
        return;
      }
    }

    let xDelta = event.touches[0].clientX - clientX;
    let yDelta = event.touches[0].clientY - clientY;

    if ( Math.abs(xDelta) > Math.abs(yDelta) ) {
      // if xDelta > 0: right swipe
      if (xDelta > 0) {
        if ( window.matchMedia("(orientation: landscape)").matches && window.innerWidth > styles.mediaQueryWidth) {
          this.setState({ landscapePassive: true });
        } else {
          this.setState({ portraitActive: true });
        }
      } else {
        // if xDelta < 0: left swipe
        if ( window.matchMedia("(orientation: landscape)").matches && window.innerWidth > styles.mediaQueryWidth) {
          this.setState({ landscapePassive: false });
        } else {
          this.setState({ portraitActive: false });
        }
      }
    }

    clientX = null;
    clientY = null;
    this.setState({ clientX, clientY });

    //event.preventDefault();
  }

  toggleLandscape = () => {
    this.setState({ landscapePassive: !this.state.landscapePassive });
  }

  togglePortrait = () => {
    this.setState({ portraitActive: !this.state.portraitActive });
  }

  handleClick = () => {
    if ( window.matchMedia("(orientation: landscape)").matches && window.innerWidth > styles.mediaQueryWidth) {
      this.toggleLandscape();
    } else {
      this.togglePortrait();
    }
  }

  handleSideClick = () => {
    if ( window.matchMedia("(orientation: landscape)").matches && window.innerWidth > styles.mediaQueryWidth) {
      if (this.state.landscapePassive) {
        this.toggleLandscape();
      }
    } else {
      if (!this.state.portraitActive) {
        this.togglePortrait();
      }
    }
  }

  render() {
    return (
      <div id='app'
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove} >
            
          <Header />
          <Sidebar landscapePassive={this.state.landscapePassive}
                   portraitActive={this.state.portraitActive}
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor cursus feugiat. Suspendisse consectetur eros vel augue lacinia molestie. Aenean vitae eleifend tortor, non aliquet purus. Praesent fringilla purus sit amet tortor maximus lacinia. Pellentesque nec dui suscipit, egestas dui ut, fringilla nisl. Morbi suscipit quis est id sollicitudin. Donec ut ante quis lorem suscipit mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce mollis est et enim rhoncus tincidunt. Aliquam a justo facilisis, feugiat elit et, tristique sem. Maecenas consequat nunc tincidunt, cursus neque ac, egestas purus. Fusce lacinia, purus a malesuada aliquet, eros sapien ultrices risus, vel luctus justo elit vitae dui. Integer laoreet lacinia neque, non fermentum quam. Mauris lobortis neque nunc, vitae vestibulum nibh gravida consectetur. Pellentesque cursus iaculis augue.
      </p>

      <p>
        Nam eget maximus ligula, sit amet sodales nulla. Suspendisse lacus ipsum, sollicitudin eu ullamcorper in, imperdiet nec ante. Vestibulum faucibus hendrerit vehicula. Aenean convallis nulla nec massa vestibulum ultrices. Mauris a lacus venenatis, tincidunt nibh eu, dapibus est. Donec vitae eros metus. Morbi ac sapien sed risus finibus sagittis venenatis suscipit elit. Fusce vestibulum pretium nisl, non sodales lacus euismod eu. Nullam sed nibh enim. Aliquam sagittis turpis convallis augue dapibus ullamcorper. Suspendisse eu odio in augue dapibus elementum.
      </p>

      <p>
        Praesent luctus scelerisque viverra. Phasellus suscipit bibendum gravida. Morbi neque leo, semper at est id, rhoncus posuere lorem. Pellentesque sed elementum justo. Mauris elit massa, pretium eget venenatis ac, congue ut libero. Nunc consectetur sed risus quis faucibus. Aenean dignissim magna pulvinar eros rhoncus, vitae lacinia tellus hendrerit. Etiam hendrerit lorem est, at maximus elit maximus at. Nunc at mauris quis ipsum imperdiet condimentum. Nam tristique justo a arcu fringilla pretium.
      </p>

      <p>
        Sed placerat turpis vel orci rutrum porta. Nam molestie libero est, a vulputate justo sodales sed. Ut congue lacinia lorem, eget tincidunt nunc elementum ac. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer lectus est, dictum et dui non, condimentum finibus lacus. Phasellus scelerisque magna neque, ut consequat tortor vulputate at. Nulla enim quam, tempus eget lacus in, finibus efficitur sem.
      </p>

      <p>
        Integer sollicitudin interdum tempor. Nulla eget leo euismod, dapibus est non, volutpat augue. Aliquam erat volutpat. Mauris blandit urna id dictum rhoncus. Suspendisse mollis, nibh vel ullamcorper porta, lacus purus pharetra enim, nec malesuada sapien turpis id sapien. Etiam purus augue, molestie eu pretium sed, tincidunt non est. Quisque bibendum lacinia augue, luctus tristique nunc ultricies aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas urna felis, lobortis ac semper vitae, finibus ut ligula.
      </p>
      
      <p>
        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut et posuere purus, at maximus metus. Nullam sagittis dignissim justo, vitae venenatis urna condimentum ac. Sed est purus, molestie ut ante vel, venenatis posuere risus. Sed sed mauris sollicitudin, varius magna nec, pretium augue. Etiam at imperdiet eros. Ut lacinia pharetra nisl, non pulvinar metus euismod sit amet. In et sem luctus, commodo lorem in, cursus risus. Sed hendrerit semper nisl porta sollicitudin. Vivamus aliquam sagittis elit. Phasellus finibus pulvinar justo vitae tempus.
      </p>
      
      <p>
        Cras aliquet mauris eget cursus facilisis. Maecenas ligula mauris, consectetur nec quam rutrum, congue viverra erat. Maecenas ultricies porttitor tortor sit amet ultrices. Sed quis tellus placerat, blandit ipsum et, tempor mi. Aenean at magna ipsum. Phasellus rhoncus condimentum sollicitudin. In gravida leo in lectus mattis mattis. Sed congue urna ac diam pharetra mattis. Suspendisse augue risus, aliquam eget quam eleifend, faucibus placerat sapien. Vestibulum pulvinar, tellus sagittis pretium vehicula, lectus orci ornare nunc, at aliquam nisl risus non purus.
      </p>
      
      <p>
        Mauris sed ipsum pulvinar lacus sodales dapibus. Pellentesque et rutrum arcu, nec rhoncus eros. Pellentesque in rhoncus diam. Proin at convallis risus. Nunc imperdiet, eros et commodo sagittis, eros augue placerat nisl, non dictum erat velit sed sapien. Sed tincidunt ac odio id blandit. Nunc auctor id dui at aliquam. Suspendisse potenti.
      </p>
      
      <p>
        Donec lacus urna, fermentum sed accumsan sed, faucibus eu odio. Donec porttitor felis sem, id fringilla metus interdum ac. Vestibulum tristique cursus ultricies. In hac habitasse platea dictumst. Aenean efficitur, risus ac semper efficitur, turpis mauris semper libero, a feugiat velit arcu ut eros. Etiam gravida euismod erat a pretium. Maecenas turpis mi, fringilla scelerisque ornare sed, congue eget elit. Nulla magna diam, pharetra eu cursus eu, pharetra sit amet velit. Vivamus luctus sed elit at fermentum. Proin commodo ultrices felis ut porttitor. Curabitur vulputate dignissim vestibulum. Quisque porttitor erat at tristique porttitor. Maecenas mattis massa in viverra semper.
      </p>
      
      <p>
        Vivamus nec justo cursus, convallis ligula ut, commodo dolor. Donec porttitor eleifend fringilla. Nulla luctus sem et magna rutrum vehicula. Donec ultrices ultrices ante a semper. Mauris id aliquam est. Cras id eros tincidunt, tempus diam ac, fermentum nulla. Sed vitae velit in mi tristique consectetur. Nullam tempor lectus enim, id ornare tortor auctor non. Nam at aliquam urna. Maecenas euismod ornare velit, sed congue dolor commodo vel. Nunc sit amet feugiat tortor.
      </p>
    </div>
  );
}


//==============================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

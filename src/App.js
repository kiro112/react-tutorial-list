import React from 'react';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
 
import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';

import './App.css';


class Sidebar extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      gists: props.gists
    };
  }

  componentWillReceiveProps (nextProps) {
    this.state.gists = nextProps.gists;
  }

  render () {
    const gists = this.state.gists;


    return (
      <div style={{background: '#2c3e50', color: '#FFF', width: 220}}> 
          <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4' defaultSelected='sales'>       
              <Nav id='dashboard'>
                  <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio}/></NavIcon>    
                  <NavText> Dashboard </NavText>
              </Nav>
              <Nav id='sales'>
                  <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                  <NavText> Sales </NavText>
              </Nav>
          </SideNav>
      </div>
      
    );
  }
      // <sidebar>
      //   <li>
      //   {
      //     gists ? (
      //       gists.map(gist => (
      //         <a>{ gist.description }</a>
      //       ))
      //     ) : (
      //       <a>Loading...</a>
      //     )
      //   }
      //   </li>
      // </sidebar>

}


class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      gists: null
    };
  }

  componentDidMount () {
    fetch('http://api.github.com/gists')
      .then(res => res.json())
      .then(gists => {
        this.setState({ gists });
      });
  }

  render () {
    const gists = this.state.gists;

    return (
      <div>
        <Sidebar gists={gists}></Sidebar>
        {/* MAIN */}
        {/* FOOTER */}
      </div>
    );
  }

}




export default App;

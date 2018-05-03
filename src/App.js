import React from 'react';
import SideNav, { Nav, NavText } from 'react-sidenav';
import { Row, Grid, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Gists from './gists';

import './App.css';


class Sidebar extends React.Component {

  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      gists: props.gists
    };
  }

  handleChange (gists) {
    this.setState({ gists });
  }

  componentWillReceiveProps (nextProps) {
    this.handleChange(nextProps.gists);
  }

  render () {
    const gists = this.state.gists;

    const navItems = gists ?
      (gists.map(gist => (
         <Link  to={`/g/${gist.id}`} >
           <Nav id={ gist.id }>
             <NavText>{ trimText(gist.description || gist.id) }</NavText>
           </Nav>
         </Link>
       ))) : (
        <Nav id="Loading">
          <NavText> Loading... </NavText>
        </Nav>
      );
      

    return (
      <div style={{background: '#2c3e50', color: '#FFF', width: 220}}> 
          <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4'>       
              { navItems }
          </SideNav>
      </div>

    );
  }
}

class Main extends React.Component {

  render () {
    return (
      <div className="main">
        <Route exact={true} path="/" render={() => (
            <h1>Welcome</h1>
        )} />
        <Route path="/g/:gistId" render={({ match }) => <Gist data={ match } /> } />
      </div>
    );
  }

}


class Gist extends React.Component {

  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      gistId: props.data.params.gistId
    };
  }

  handleChange (gistId) {
    this.setState({ gistId });
  }

  componentWillReceiveProps (nextProps) {
    this.handleChange(nextProps.data.params.gistId);
  }

  render () {
    const data = Gists.find(gist => gist.id === this.state.gistId);
    console.log(data);

    return (
      <div>
        <h2>{ data.description || 'No Description' }</h2>
      </div>
    );
  }

}

// const Gist = ({ match }) => {
  // const data = Gists.find(gist => gist.id === match.params.gistId);
  
//   const files = Object.keys(data.files).map(file => {
//     fetch(`http://api.github.com/gists/${match.params.gistId}`)
//         .then(res => res.json())
//         .then(content => {
//           return (
//             <li>
//               <h4>{ file.filename }</h4>
//               <p>{ content }</p>
//             </li>
//           );
//         });
//   });
// };


class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      gists: null
    };
  }

  componentDidMount () {
    this.setState({
      gists: Gists
    });

    /*
    // Gisthub max limit -_-
    fetch('http://api.github.com/gists')
      .then(res => res.json())
      .then(gists => {
        this.setState({ gists });
      });*/
  }

  render () {
    const gists = this.state.gists;

    return (
      <Router>
        <Grid fluid>
          <Row className="show-grid">
            <Col xs={4} md={3}>
              <Sidebar gists={gists}></Sidebar>
            </Col>
            <Col xs={8} md={9}>
              <Main></Main>
            </Col>
          </Row>
        </Grid>
      </Router>
    );
  }

}


function trimText (text, len = 10) {
  if (text && text.length > len) {
    return text.substring(0, len) + '...';
  }
  return text;
}



export default App;

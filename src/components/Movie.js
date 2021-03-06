import React from "react";
import SearchForm from "./SearchForm"
import _ from "lodash"
// import { connect } from 'react-redux';
// import { makeApiCall } from './actions';
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { CSSTransitionGroup } from 'react-transition-group'
import {Icon,Label,Menu,Table} from 'semantic-ui-react'
const headers = { 'x-api-key': process.env.README_API_KEY };


class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      repositories: [],
      scores: [],
      searchparam: null,
      isSubmitted:false
    };
  }

  render() {
    let { error, repositories, searchparam } = this.state;
    if (error) {
      return <React.Fragment>Error: {error.message} </ React.Fragment>;
    } else if (repositories === undefined) {
      console.log("else if")
      return(
        <React.Fragment>
        <h4>No rawData Found</h4>
        <button className='btn btn-primary' onClick={this.resetMe}>Back to the search</button>
        </React.Fragment>
      )
    } 
    else {
      console.error('RENDERING RETURN')
      console.log(searchparam)
      console.log(this.state)
      /* API Returns N/A if No Poster. */

      return (
        <React.Fragment>
          <SearchForm onSubmit={this.handleSettingSearchParam} />
          <CSSTransitionGroup
          transitionName="example"
        transitionEnterTimeout={10000}
        transitionLeaveTimeout={300}>
          
          <ul className='headingpadding'>
              {repositories !== null && repositories.map(item => <p>{item}</p>)}
            </ul>
        </ CSSTransitionGroup>
        </React.Fragment>
      );
    }
  }

  makeOmdbApiCall = (parameter) => {
fetch(
  "https://2scou7syj7.execute-api.us-west-2.amazonaws.com/prod/grades?username=" +
    this.state.param,
  headers
).then((response) => response.json())
  .then((jsonifiedResponse) => jsonifiedResponse.Search)
  .then((jsonifiedResponse) => {
    console.log(jsonifiedResponse);
    this.setState({
      isLoaded: true,
      repositories: jsonifiedResponse.githubRepositories,
      scores: jsonifiedResponse.githubScores,
      isSubmitted: true,
    });
  })
  .catch((error) => {
    this.setState({
      isLoaded: true,
      error,
    });
  });
  };

  handleSettingSearchParam = (param) => {
    fetch(`https://2scou7syj7.execute-api.us-west-2.amazonaws.com/prod/grades?username=${param}`)
    .then((response) => response.json())
    .then((jsonifiedResponse) => {
      console.log(jsonifiedResponse)
      this.setState({
        isLoaded: true,
        searchparam: param,
        repositories: jsonifiedResponse.githubRepositories,
        scores: jsonifiedResponse.githubScores,
        isSubmitted: true
      });
    })
    .catch((error) => {
      this.setState({
        isLoaded: true,
        error,
      });
    });
  }

  makeDeleteApiCall = () => {
    // fetch('https://sheetdb.io/api/v1/58f61be4dda40/{'Budget'}/{'237000000'}')
  }

   resetMe = (state) => {
    this.setState({
      // prevState
      error: null,
      isLoaded: false,
      movies: {},
      searchparam: null,
      isSubmitted:false
    })
  }

  // makeDeleteApiCall = () => {
  //   fetch(`http://localhost:3000/directors/${this.id}`,{method: 'DELETE'})
  //   .then((response) => response.json())
  //   .then((jsonifiedResponse) => {
  //     console.log(jsonifiedResponse)
  //     if (jsonifiedResponse.code === 200){
  //       const newresponse = {...jsonifiedResponse.filter(this.state.directors.id !== this.id)}
  //     this.setState({
  //       isLoaded: true,
  //       directors: newresponse,
  //     });
  //     console.log('DELETED')
  //   }
  //   })
  //   .catch((error) => {
  //     this.setState({
  //       isLoaded: true,
  //       error,
  //     });
  //   });
  // }

  // componentDidMount() {
  //   // const { dispatch } = this.props;
  //   // dispatch(makeApiCall());
  //     console.log(this.state.searchparam)
  //   // if ( this.state.searchparam != useCallback()) {
  //   this.makeOmdbApiCall(this.state.searchparam)
  //   // }

  // }

  
}



// const mapStateToProps = (state) => {
//   return {
//     Movie: state.Movie,
//     isLoaded: state.isLoaded,
//     error: state.error,
//   };
// };

// export default connect(mapStateToProps)(Movie);
export default Movie;

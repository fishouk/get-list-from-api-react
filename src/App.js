import React, {Component} from 'react';
import './App.css';

const apiUrl = 'https://jsonplaceholder.typicode.com/users';

class App extends Component {
    constructor() {
      super();
      this.state = {
        data: [],
        isLoading: false,
        error: null,
      }
    }
    componentDidMount() {
      this.setState({ isLoading: true });

      fetch(apiUrl)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong ...');
          }
        })
        .then(data => this.setState({ data: data, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    }
    render() {
      const { data, isLoading, error } = this.state;
      if (error) {
        return (
          <div className="App">
            <h1 className="title">Get list of names by api with react app</h1>
            <p>{error.message}</p>
          </div>  
        );
      }

      if (isLoading) {
        return (
          <div className="App">
            <h1 className="title">Get list of names by api with react app</h1>
            <p>Loading ...</p>
          </div>
        );
      }

      return (    
        <div className="App">
          <h1 className="title">Get list of names by api with react app</h1>
          <div className="columns">
            <div className="column is-12">
            <ul>
              {data.map(hit =>
                <li key={hit.id}>
                  {hit.name}
                </li>
              )}
            </ul>
            </div>
          </div>
        </div>
      );  
    }
}



export default App;

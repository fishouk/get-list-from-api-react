import {Row, Col, Container, ListGroup, Form, InputGroup, FormControl} from 'react-bootstrap';
import React, {Component} from 'react';
import './App.css';

const apiUrl = 'https://jsonplaceholder.typicode.com/users';

class App extends Component { 

    constructor(props) {
      super(props);
      this.state = {
          searchString: "",
          data: [],
          isLoading: false,
          error: null,
      };
      this.formListOfNamesSearch = this.formListOfNamesSearch.bind(this);
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
      
        this.refs.searchName.focus();
    }
  
    formListOfNamesSearch() {
      this.setState({
        searchString: this.refs.searchName.value
      });
    }

    render() {
      const { isLoading, error } = this.state;
      let data = this.state.data;
      let search = this.state.searchString.trim().toLowerCase();
  
      if (search.length > 0) {
          data = data.filter(function(data) {
          return data.name.toLowerCase().match(search);
        });
      }

      return (    
          <Container>
            <Row>
              <Col>
                <h1>Get list of names by api with react app</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form>
                  <Form.Group controlId="FormListOfNamesSearch">
                    <Form.Label>Поиск</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        value={this.state.searchString}
                        ref="searchName"
                        placeholder="Начните печатать"
                        onChange={this.formListOfNamesSearch}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
              {error ? <p>{error.message}</p> : null}
              {!isLoading ? (
                <ListGroup variant="flush">
                  {data.map(hit => {
                    return(
                      <ListGroup.Item key={hit.id}>
                        {hit.name}
                      </ListGroup.Item>
                      );
                    })
                  }
                </ListGroup>
                ) : (
                <p>Loading ...</p>)}
              </Col>
            </Row>
          </Container>
      );  
    }
}

export default App;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CollectionWord from './../Collection/CollectionWord';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collection: {},
      hanziMode: true //true => show simplified characters, false => show traditional characters
    };
  }

  componentWillMount() {
    fetch('/collections', {
      method: 'GET',
      headers: {
        email: 'se.cardenas@uniandes'/* this.props.email */
      }
    }).then(resp => resp.json()).then(json => {
      const collection = json;
      collection.sort((a, b) => b.dateCreated - a.dateCreated);
      this.setState({ collection });
    }).catch(err => {
      console.log(err);
    });
  }

  renderRecentWords() {
    const recent = [];

    for (let i = 0; i < 5; i++) {
      if (this.state.collection[i]) {
        recent.push(this.state.collection[i]);
      }
    }

    return (
      recent.map(word =>
        <CollectionWord
          word={word}
          mode={this.state.hanziMode}
          key={word.simplified}
        />
      )
    );
  }

  render() {
    return (
      <div className='home-container'>
        <div className='collection-preview-container'>
          <h3>
            Your Collection
          </h3>
          <small>{this.state.collection.length} characters</small>
          <h4>Added recently</h4>
          <div>
            {this.renderRecentWords()}
          </div>
          <div>
            <button onClick={() => this.props.navigate('collection')}>
              <i className="material-icons">chevron_right</i>
              Go to your Collection
            </button>
            <button onClick={() => this.props.navigate('collection', {add: true})}>
              <i className="material-icons">add</i>
              Add a new word
            </button>
          </div>
        </div>
        <div className='vertical-hr'></div>
        <div className='tools-container'>
          <h3>Tools</h3>
          <div>
            <span>
              <button onClick={() => this.props.navigate('tools', {tool : 'h2p'})}>
                <i className='material-icons'>translate</i>
              </button>
              <label>Hanzi to pinyin</label>
            </span>

            <span>
              <button onClick={() => this.props.navigate('tools', {tool : 'dictSearch'})}>
                <i className='material-icons'>search</i>
              </button>
              <label>Dictionary search</label>
            </span>

            <span>
              <button onClick={() => this.props.navigate('tools', {tool : 'ocr'})}>
                <i className='material-icons'>image_search</i>
              </button>
              <label>Extraxt hanzi from image</label>
            </span>

            <span>
              <button onClick={() => this.props.navigate('tools', {tool : 'p2h'})}>
                <i className='material-icons'>translate</i>
              </button>
              <label>Pinyin to hanzi</label>
            </span>

          </div>
        </div>

      </div>
    );
  }
}

Home.propTypes = {
  email: PropTypes.string,
  navigate: PropTypes.func
};

export default Home;
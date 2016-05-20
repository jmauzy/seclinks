import React from 'react';
import moment from 'moment';
import DateTimeField from 'react-bootstrap-datetimepicker';

var LinkForm = React.createClass({

  createLink(event) {
    event.preventDefault();
    var link = { 
      target_url: this.refs.target_url.state.value,
      max_redirects: this.refs.max_redirects.state.value,
      //divide resulting unix timestamp to account for milliseconds
      expiration: this.refs.expiration.state.value / 1000
    }
    this.props.addLink(link);
  },

  render: function() {
    return(
      <form onSubmit={this.createLink}>
        <URLEntry ref="target_url"/>
        <RedirectsEntry ref="max_redirects" value="0"/>
        <ExpirationEntry ref="expiration" defaultExpiration={this.props.defaultExpiration}/>
        <FormSubmitButton />
      </form>
    );
  } 
});

var URLEntry = React.createClass({
  getInitialState: function() {
    return {value: ''};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    return(
      <fieldset className="form-group">
        <label for="target_url">Enter URL</label>
        <input 
          type="text"
          id="target_url" 
          className="form-control"
          ref="target_url" 
          required
          onChange={this.handleChange}
        />
        <small className="text-muted">URL must be valid</small>
      </fieldset>
    )
  }
});

var RedirectsEntry = React.createClass({
  getInitialState: function() {
    return({value: (this.props.value || '')})
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    return(
      <fieldset className="form-group">
        <label for="max_redirects">Maximum Redirects:</label>
        <input
          type="text"
          id="max_redirects"
          className="form-control"
          ref="max_redirects"
          value={this.state.value}
          required
          onChange={this.handleChange}
        />
        <small className="text-muted">Enter '0' for no limit</small>
      </fieldset>
    )
  }
});

var ExpirationEntry = React.createClass({
  getInitialState: function() {
    return({value: ''});
  },
  handleChange: function(newDate) {
    this.setState({value: newDate, inputValue: this.newDate})
  },
  render: function() {
    return(
      <fieldset className="form-group">
        <label for="expiration">Expiration date/time</label>
        <DateTimeField 
          onChange={this.handleChange}
          defaultText={this.props.defaultExpiration}
          required
        />
        <small className="text-muted">Expires in 1 year if blank</small>
      </fieldset>
    )
  }
});

var FormSubmitButton = React.createClass({
  render: function() {
    return(
      <button className="btn btn-primary" type="submit">Submit</button>
    )
  }
});

module.exports = LinkForm;

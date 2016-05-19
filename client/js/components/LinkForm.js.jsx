import React from 'react';

module.exports = React.createClass({

  createLink(event) {
    event.preventDefault();
    var link = { 
      target_url: this.refs.target_url.value, 
      max_redirects: this.refs.max_redirects.value
    }
    this.props.addLink(link);
  },

  render: function() {
    return(
      <form onSubmit={this.createLink}>
        <URLField />
        <RedirectsField />
        <FormSubmitButton />
      </form>
    );
  } 
});

var URLField = React.createClass({
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
        />
        <small className="text-muted">URL must be valid</small>
      </fieldset>
    )
  }
});

var RedirectsField = React.createClass({
  render: function() {
    return(
      <fieldset className="form-group">
        <label for="max_redirects">Maximum Redirects (0 for no limit)</label>
        <input
          type="text"
          id="max_redirects"
          className="form-control"
          ref="max_redirects"
          devaultValue="0"
          required
        />
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
/** @jsx React.DOM */
// the React Comments tutorial from http://facebook.github.io/react/docs/tutorial.html
// replaced showdown with marked
// added propTypes
var React = require('react');
var marked = require('marked');

var urls = require('./urls');

var Event = React.createClass({
    propTypes: {
        author: React.PropTypes.string.isRequired
    },
    render: function() {
        var rawMarkup = marked(this.props.children.toString());
        return (
            <div className="event">
                <h2 className="eventTitle">
                    {this.props.title}
                </h2>
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        );
    }
});

var EventBox = React.createClass({
    propTypes: {
    },
    loadEventsFromServer: function() {
        $.ajax({
            url: urls.GET.success,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.log("Checking where error occures");
                console.error(urls.GET.allEvents, status, err.toString());
            }.bind(this)
        });
    },

    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadEventsFromServer();
        // killed this because it was too spammy when changing tabs

    },
    render: function() {
        return (
            <div className="eventBox">
                <h1>Events</h1>
                <EventList data={this.state.data} />
            </div>
            );
    }
});

var EventList = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    render: function() {
        var eventNodes = this.props.data.map(function(event, index) {
            return (
                // `key` is a React-specific concept and is not mandatory for the
                // purpose of this tutorial. if you're curious, see more here:
                // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
                <Event title={event.title} key={event.key}>
                      {event.food}
                </Event>
            );
        });
        return (
            <div className="EventList">
                {eventNodes}
            </div>
        );
    }
});

module.exports = EventBox;
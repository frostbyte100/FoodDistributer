/** @jsx React.DOM */
// the React Comments tutorial from http://facebook.github.io/react/docs/tutorial.html
// replaced showdown with marked
// added propTypes
var React = require('react');
var marked = require('marked');

var urls = require('./urls');

var Comment = React.createClass({
    propTypes: {
        author: React.PropTypes.string.isRequired
    },
    render: function() {
        var rawMarkup = marked(this.props.children.toString());
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        );
    }
});

var CommentBox = React.createClass({
    propTypes: {
    },
    loadCommentsFromServer: function() {
        $.ajax({
            url: urls.GET.allComments,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(urls.GET.allComments, status, err.toString());
            }.bind(this)
        });
    },

    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        // killed this because it was too spammy when changing tabs
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
            </div>
            );
    }
});

var CommentList = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    render: function() {
        var commentNodes = this.props.data.map(function(comment, index) {
            return (
                // `key` is a React-specific concept and is not mandatory for the
                // purpose of this tutorial. if you're curious, see more here:
                // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
                <Comment author={comment.author} key={comment.key}>
                      {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

module.exports = CommentBox;
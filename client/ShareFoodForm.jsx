var React = require('react');

var ShareFoodForm = React.createClass({
    propTypes: {
        //onCommentSubmit: React.PropTypes.func.isRequired
    },
    handleSubmit: function() {
        var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();
        //this.props.onCommentSubmit({author: author, text: text});
        handleCommentSubmit({author: author, text: text});
        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';
        return false;
    },
    handleCommentSubmit: function(comment) {
        var comments = this.state.data;
        comments.push(comment);
        this.setState({data: comments}, function() {
            // `setState` accepts a callback. To avoid (improbable) race condition,
            // `we'll send the ajax request right after we optimistically set the new
            // `state.
            $.ajax({
                url: urls.POST.newComment,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                data: JSON.stringify(comment),
                success: function(data) {
                    setTimeout(1000, this.loadCommentsFromServer);
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(urls.POST.newComment, status, err.toString());
                }.bind(this)
            });
        });
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something..." ref="text" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

module.exports = ShareFoodForm;

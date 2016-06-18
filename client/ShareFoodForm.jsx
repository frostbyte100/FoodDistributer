var React = require('react');

var ShareFoodForm = React.createClass({

    getInitialState: function() {
        return {
            food: '',
            address: '',
            image: '',
            time: '',
        };
    },

    handleSubmit: function() {
        var data = {
            food: this.state.food,
            address: this.state.address,
            image: this.state.image,
            time: this.state.time,
        }
        $.ajax({
            type: 'POST',
            url: '/foodevents',
            data: data,
        }).done(function(data) {
                self.clearForm()
            })
            .fail(function(jqXhr) {
                console.log('failed to register');
            });
    },

    handleChange: function (name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },

    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Food" value={this.state.food} onChange={this.handleChange.bind(this, 'food')} />
                <input type="text" placeholder="Address" value={this.state.address} onChange={this.handleChange.bind(this, 'address')} />
                <input type="text" placeholder="Image" value={this.state.image} onChange={this.handleChange.bind(this, 'image')} />
                <input type="text" placeholder="Time"  value={this.state.time} onChange={this.handleChange.bind(this, 'time')} />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

module.exports = ShareFoodForm;

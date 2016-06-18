var React = require('react');
var urls = require('./urls');

var ShareFoodForm = React.createClass({

    getInitialState: function() {
        return {
            food: '',
            address: '',
            image: '',
            time: ''
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
            url: urls.POST.newEvent,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify(data),
            success: function(response) {
                console.log(response);
            },
            error: function(xhr, status, err) {
                console.log("fbaduibfiea!!!!!");
                console.error(urls.POST.newEvent, status, err.toString());
            }.bind(this)

        });
    },

    handleChange: function (name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },

    render: function() {
        return (
            <form className="foodOfferForm" onSubmit={this.handleSubmit}>
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

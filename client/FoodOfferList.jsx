/** @jsx React.DOM */
// the React Comments tutorial from http://facebook.github.io/react/docs/tutorial.html
// replaced showdown with marked
// added propTypes
var React = require('react');
var marked = require('marked');

var urls = require('./urls');

var FoodOffer = React.createClass({
    propTypes: {
        food: React.PropTypes.string.isRequired,
        address: React.PropTypes.string.isRequired,
        image: React.PropTypes.string.isRequired,
        time: React.PropTypes.string.isRequired,
    },
    render: function() {
        var rawMarkup = marked(this.props.children.toString());
        return (
            <div className="foodOffer">
                <span className="foodOfferFood">{this.props.food}</span>
                <span className="foodOfferAddress">{this.props.address}</span>
                <span className="foodOfferImage">{this.props.image}</span>
                <span className="foodOfferTime">{this.props.time}</span>
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        );
    }
});

var FoodOfferBox = React.createClass({
    propTypes: {
    },
    loadFoodOffersFromServer: function() {
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
        return {data: [{food:'cake', address:'my house', image:'heh', time:'9:30'},{food:'bread', address:'your house', image:'lol', time:'9:00'}]};
    },
    componentDidMount: function() {
        this.loadFoodOffersFromServer();
        // killed this because it was too spammy when changing tabs
        //setInterval(this.loadFoodOffersFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="foodOfferBox">
                <h1>Food Offers</h1>
                <FoodOfferList data={this.state.data} />
            </div>
            );
    }
});

var FoodOfferList = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    render: function() {
        var foodOfferNodes = this.props.data.map(function(foodOffer, index) {
            return (
                // `key` is a React-specific concept and is not mandatory for the
                // purpose of this tutorial. if you're curious, see more here:
                // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
                <FoodOffer food={foodOffer.food} address={foodOffer.address} image={foodOffer.image} time={foodOffer.time}  key={foodOffer.key}>
                      {foodOffer.food}
                </FoodOffer>
            );
        });
        return (
            <div className="foodOfferList">
                {foodOfferNodes}
            </div>
        );
    }
});

module.exports = FoodOfferBox;
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
        var styleFood = {
            color: '#202020',
            fontSize: 20,
            paddingRight: 20,
            fontStyle: 'bold',
        };
        var styleAddress = {
            color: '#202020',
            fontSize: 20,
            paddingRight: 20,
            fontStyle: 'bold',
        };
        var styleImage = {
            height: 200,
        };
        var styleTime = {
            color: '#202020',
            fontSize: 20,
            paddingRight: 20,
            fontStyle: 'bold',
        };
        var styleFoodOffer = {
            border: "5px solid blue", 
            padding: 20,

        };
        var styleHide = {
            fontSize: 50,
        };
      
        return (
            <div className="foodOffer" style = {styleFoodOffer}>
                <span className = "hideButton" style = {styleHide}> X </span>
                
                <span className="foodOfferFood" style={styleFood}>{this.props.food}</span>
                <span className="foodOfferAddress" style={styleAddress}>{this.props.address}</span>
                <span className="foodOfferTime" style={styleTime}>{this.props.time}</span>
                <img src={this.props.image} style={styleImage} />
                

            </div>
        );
    }
});

var FoodOfferBox = React.createClass({
    propTypes: {
    },
    loadFoodOffersFromServer: function() {
        $.ajax({
            url: urls.GET.allEvents,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
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
        
          var styleFoodOfferBox = {
            border: "5px solid green"
        };

        return (
            <div className="foodOfferBox" style = {styleFoodOfferBox}>
                
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
                <FoodOffer food={foodOffer.food} address={foodOffer.address} image={foodOffer.image} time={foodOffer.time}  key={foodOffer.key} />
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
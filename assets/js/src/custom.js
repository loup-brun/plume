// functions
Handlebars.registerHelper("getAvailableValues", function(context, category, options) {
	var values = "";

	for ( var i = 0; i < context.length; i++ ) {
		var item = context[i];

		// make sure the item has the targeted property
		if ( item.attributes.hasOwnProperty(category) ) {

			var current = item.attributes[category];
			//console.log(current);

			// check if the property isn't already in the array
			if ( values.indexOf(current)  < 0 ) {
				// the property isn't in the array;
				// push it into the array
				values = values + options.fn(current);
			}
		}
	}

	return values;
});

// not necessary - the logic filtering is done in the js file
Handlebars.registerHelper("getCorrespondingItems", function(context, criteria, options) {
	var filtered = "";

	for (var i = 0; i < context.length; i++) {
		var item = context[i];
		var corresponds = _.filter(item, criteria);

		if ( corresponds === true ) {
			filtered = filtered + options.fn(item.name);
		}
	}
	return filtered;
});

Handlebars.registerHelper("ifEmpty", function(context, options) {
	if ( _.isEmpty(context) ) {
		return options.fn(context);
	}
});

Handlebars.registerHelper("ifNotEmpty", function(context, options) {
	if ( !_.isEmpty(context) ) {
		return options.fn(context);
	}
});

Backbone.Transitions = {};
Backbone.Transitions.transit = function(view, arg) {
	var _self = this;
	arg = arg || null;
	if (_self.currView) {
		_self.currView.$el.removeClass("view-current");
		var rendered;

		//Render the new view after the transition has finished on the current view
		_self.currView.$el.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
			_.delay(function() {
				_self.render(view, arg);
				rendered = true;
			}, 200);
		});

		if(!Modernizr.csstransitions) {
			_self.currView.$el.trigger("transitionend");
		}
	} else {
		_self.render(view, arg);
	}
	_self.currView = view;
};
Backbone.Transitions.render = function(view, arg) {
	var _self = this;

	view.render(arg);

	// Delay the transitions on newly added elements by 20 s
	// to prevent the flickering effect
	_.delay(function() {
		view.$el
		.addClass("view-current");
	}, 20);
};

function Bg($elem) {
	var that = this,
		 slider = $elem, // a jquery object
		 backgrounds = slider.find("li"),
		 current = 0;

	// # | step
	// --------------
	// 1 | home
	// 2 | condition
	// 3 | ailment
	// 4 | ingestion
	// 5 | effect
	// 6 | result

	function setBg(target) {
		current = target;
		backgrounds.removeClass("bg-current");
		//$(backgrounds[current]).addClass("bg-current");
		$(".bg-" + target).addClass("bg-current");
	}

	return {
		setBg: function(target) {
			setBg(target);
		}
	}
}

// initialization
window.Bg = new Bg($(".bg"));

var spinner = $('.loader').spin({
	lines: 13,
	length: 10,
	width: 2,
	radius: 15,
	trail: 10,
	speed: 2
});

var userSelection = Backbone.Model.extend({

});

var Strains = Backbone.Collection.extend({
	url: 'assets/data/strains.json'
});

var viewHome = Backbone.View.extend({
	el: '.view',
	initialize: function() {
		//var that = this;
		//if ( !that.$el.hasClass("view-current") ) {
		//	that.$el.addClass("view-current");
		//}
	},
	render: function() {
		var that = this,
			 output = Handlebars.templates.home();
		that.$el.html(output);
		Bg.setBg('home');
	}
});

var viewDoctors = Backbone.View.extend({
	el: '.view',
	initialize: function() {
		//var that = this;
		//if ( !that.$el.hasClass("view-current") ) {
		//	that.$el.addClass("view-current");
		//}
	},
	render: function() {
		var that = this;
		var output = Handlebars.templates.doctors();
		that.$el.html(output);
		Bg.setBg('doctors');
	}
});

var viewPatients = Backbone.View.extend({
	el: '.view',
	initialize: function() {
		//var that = this;
		//if ( !that.$el.hasClass("view-current") ) {
		//	that.$el.addClass("view-current");
		//}
	},
	render: function() {
		var that = this,
			 output = Handlebars.templates.patients();
		that.$el.html(output);
		Bg.setBg('patients');
	}
});

var viewBrowse = Backbone.View.extend({
	el: '.view',

	cat: [
		"condition",
		"ailment",
		"ingestion",
		"effect"
	],

	currentCat: "",

	pos: function() {
		var index = _.indexOf(this.cat, this.currentCat);

		return index;
	},

	initialize: function() {
		var that = this;
		this.listenTo(this.model, 'change', function() {
			Backbone.Transitions.transit(that, that.currentCat);
		});
	},

	render: function(category) {
		var that = this;

		this.currentCat = category;

		// our strains collection
		var strains = new Strains();
		spinner.show();

		// get the collection
		strains.fetch({
			success: function(strains) {
				Bg.setBg(category);
				spinner.spin(false).hide(600);
				var output;
				// two possibilities:
				//
				// 1: the user is fetching results
				// 2: the user is still browsing

				// if the user is fetching results
				if ( category == "result" ) {
					var criteria = that.model.attributes,
						 //match = _.matches(criteria),
						 listOfItems = [],
						 filtered = [];


					console.log("criteria",criteria);

					//console.log("model attr", that.model.attributes);
					//console.log("model", that.model);

					for ( var i = 0; i < strains.models.length; i++ ) {
						listOfItems.push(strains.models[i].attributes);
					}

					// TEMPORARY
					// set the list to all of the items
					// until the real data comes out
					filtered = listOfItems;
					/*
					var match = _.matches(criteria);
					var add = _.filter(listOfItems, match);
					var filtered = _.union(filtered, add);
					console.log(add);

					//var filtered = _.filter(listOfItems, match);

					console.log("criteria", criteria);
					console.log("match", match);
					console.log("listOfItems", listOfItems);
					console.log("filtered", filtered);
					*/
					
					output = Handlebars.templates.result({
						items: filtered
					});
				} else {
					output = Handlebars.templates.browse({
						data: strains.models,
						category: category,
						criteria: that.model.attributes
					});
				}
				that.$el.html(output);
			}
		});
	},

	goTo: function(target) {
		var that = this,
			 max = this.cat.length - 1,
			 currentCat,
			 pos = this.pos();

		// if we're already in the target position, return
		if ( pos == target ) return;

		if ( pos < target ) {

			// if the target is greater than the max,
			// circle to back to the min position 
			if ( pos == max ) {
				currentCat = this.cat[0]
			} else {
				// otherwise, just move up one position
				currentCat = this.cat[pos + 1];
			}
		} else {
			// else,  pos > target
			// so we have to move down one position

			// if we're in the min position
			if ( pos == 0 ) {
				currentCat = this.cat[max];
			} else {
				// otherwise, just move down one position
				currentCat = this.cat[pos - 1];
			}
		}

		router.navigate('#/browse/' + currentCat, {});
	},

	prev: function() {
		this.goTo(this.pos() - 1);
	},

	next: function() {
		this.goTo(this.pos() + 1);
	},

	events: {
		"click .select": "saveUserSelection",
		"click .reset": "reset",
		"click .next": "next"
	},

	saveUserSelection: function(e) {
		// when the user clicks on a pellet,
		// catch the pellet's value (input)
		// and set it with the current category (this.currentCat)
		// to the model (userSelection)

		var input = $(e.currentTarget).text().trim(); // trim: remove whitespaces

		this.model.set(this.currentCat, input);

		var criteria = _.keys(this.model.attributes);

		// if all the criteria are filled in,
		// show the result page
		if ( criteria.length === this.cat.length ) {
			console.log("result",this.model.attributes);
			//this.result(this.model.attributes);
			router.navigate('#/browse/result', {});
		} else {
			this.next();
		}
	},

	reset: function() {
		this.model.clear();
	}
});

var viewDetail = Backbone.View.extend({
	el: '.view',

	render: function(id) {
		var that = this;
		var strains = new Strains();
		spinner.show();

		// get the collection
		strains.fetch({
			success: function(strains) {
				Bg.setBg("detail");
				spinner.spin(false).hide(600);
				var match = { id: id };
				var item = _.filter(strains.models, match);
				var output = Handlebars.templates.detail({
					item: item[0].attributes // just because it returns an array - pick the first item
				});

				that.$el.html(output);
			}
		});
	}
});

var EditUser = Backbone.View.extend({
	el: '.page',
	render: function() {
		var source = $('#edit-user-form').html(),
			 template = Handlebars.template(source);
		this.$el.html(template({}));
	},
	events: {

	},
	SaveUser: function(ev) {
		var userDetails = $(ev.currentTarget).serializeObject();
		var user = new User();
		user.save(userDetails, {
			success: function(user) {
				router.navigate('', {trigger: true});
			}
		});
		return false;
	}
});

var Router = Backbone.Router.extend({

	execute: function(options, args) {
		//console.log(options, args);
	},

	routes: {
		'browse/:query': 'browse',
		'browse': 'browse',
		'detail/:id': 'detail',
		'patients': 'patients',
		'doctors': 'doctors',
		'home': 'home',
		'*other': 'home'// redirect all to home
	}
});

// init views, models, routers...
var userSelection = new userSelection();

var viewHome = new viewHome();
var viewPatients = new viewPatients();
var viewDoctors = new viewDoctors();
var viewBrowse = new viewBrowse({
	model: userSelection
});
var viewDetail = new viewDetail();

var router = new Router();
router
.on('route:home', function() {
	Backbone.Transitions.transit(viewHome);
	router.navigate('#/home', {});
})
.on('route:patients', function() {
	Backbone.Transitions.transit(viewPatients);
})
.on('route:doctors', function() {
	Backbone.Transitions.transit(viewDoctors);
})
.on('route:browse', function(query) {

	// if the user navigates with an empty query,
	// i.e. '#/browse',
	// redirect the user by setting an existing query
	if( query === null) {
		query = viewBrowse.cat[0];
	}

	// if we're targetting the result page
	else if ( query == "result" ) {
		console.log("reached result");
		//viewBrowse.stopListening();
		//viewBrowse.remove();
	}

	// if the query does not match one
	// of the browsing categories,
	// redirect the user by setting an existing query
	else if ( !_.contains(viewBrowse.cat, query) ) {
		query = viewBrowse.cat[0];
	}

	router.navigate('#/browse/' + query, {});
	Backbone.Transitions.transit(viewBrowse, query);
})
.on('route:detail', function(id) {
	Backbone.Transitions.transit(viewDetail, id);
});

Backbone.history.start();

// Dropdowns

$('.dropdown-toggle').click(function() {
  $(this).parent().toggleClass('open');
});

$('.dropdown li a').click(function(){
  $(this).parents('.dropdown').removeClass('open');
});

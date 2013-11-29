//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('MatchNewCtrl', function ($scope, AuthenticationModel, GeolocationHelper, VenueModel) {

	$scope.AuthenticationModel = AuthenticationModel;
	$scope.VenueModel = VenueModel;

	$scope.activeTab = 0;
	$scope.tabs = [
		{ label: 'Title', icons: [ 'fa-tag' ] },
		{ label: 'Gender', icons: [ 'fa-male', 'fa-female' ] },
		{ label: 'Venue', icons: [ 'fa-map-marker' ] },
		{ label: 'Price', icons: [ 'fa-dollar' ] },
		{ label: 'Date', icons: [ 'fa-calendar' ] },
		{ label: 'Size', icons: [ 'fa-users' ] }
	];
	$scope.setActiveTab = function (index) {
		$scope.activeTab = index;
	};

	$scope.newMatch = {
		description: null,
		gender: null,
		venue: null,
		price: null,
		when: null,
		maxPlayers: null
	}

	$scope.venueMaxDistance = 10; // Km
	$scope.currentCoordinates;

	GeolocationHelper.getGeoLocation().then(function (location) {
		$scope.currentCoordinates = [
			location.coords.latitude,
			location.coords.longitude
		];

		VenueModel.getVenuesByCoordinates(location.coords, $scope.venueMaxDistance).then(function (data) {
			$scope.VenueModel.venues = data;
		});
	});


});
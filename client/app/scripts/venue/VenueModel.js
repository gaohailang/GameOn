//
//
//

'use strict';

app.service('VenueModel', function ($http, $q, CacheHelper, ApiUrl) {

	this.venues = [];

	return {
		venues: this.venues,

		getVenuesByCoordinates: function (coordinates, maxDistance) {
			var deferred = $q.defer();

			if (CacheHelper.get('venuesByCoordinates')) {
				deferred.resolve(CacheHelper.get('venuesByCoordinates'));
			} else {
				$http.get(ApiUrl + '/venue/finder/near', {
					params: {
						latitude: coordinates.latitude,
						longitude: coordinates.longitude,
						maxDistance: maxDistance || 10
					}
				})
				.success(function (data) {
					deferred.resolve(CacheHelper.put('venuesByCoordinates', data.payload));
				})
				.error(function () {
					deferred.resolve(CacheHelper.remove('venuesByCoordinates'));
				})
			}

			return deferred.promise;
		},

		create: function (venue) {
			var deferred = $q.defer();

			$http.post(ApiUrl + '/venue', venue)
				.success(function () {
					deferred.resolve();
				})
				.error(function () {
					deferred.reject();
				})

			return deferred.promise;
		}
	}

});
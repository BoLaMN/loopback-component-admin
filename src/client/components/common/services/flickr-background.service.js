'use strict';
angular.module('loopback-admin').factory('Flickr', function ($q, $http, LoopBackAdminConfiguration) {
    var baseUrl, flickrApiKey, params;
    flickrApiKey = LoopBackAdminConfiguration.options.flickrApiKey;
    baseUrl = 'https://api.flickr.com/services/rest/?';
    params = ['method=flickr.groups.pools.getPhotos', 'group_id=1463451@N25', 'safe_search=1', 'jsoncallback=JSON_CALLBACK', "api_key=" + flickrApiKey, 'format=json'].join('&');
    return {
        getBackgroundImage: function () {
            var defer;
            defer = $q.defer();
            if (flickrApiKey) {
                $http.get('http://freegeoip.net/json/').success(function (data) {
                    var latitude, longitude, optParams, region_name;
                    longitude = data.longitude, latitude = data.latitude, region_name = data.region_name;
                    optParams = "&tags=" + region_name + "&lat=" + latitude + "&lng=" + longitude + "&extras=url_l";
                    return $http.jsonp(baseUrl + params + optParams, {
                        cache: true
                    }).success(function (resp) {
                        var image, images, photos;
                        photos = resp.photos;
                        if (photos.photo.length) {
                            images = photos.photo;
                            image = images[Math.floor(Math.random() * images.length)];
                            return defer.resolve({
                                image: 'url(' + image.url_l + ')',
                                title: image.title
                            });
                        } else {
                            return defer.resolve();
                        }
                    });
                });
            } else {
                defer.resolve({
                    image: "url('./images/background.png')"
                });
            }
            return defer.promise;
        }
    };
});

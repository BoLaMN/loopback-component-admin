'use strict'

angular.module 'loopback-admin'

.factory 'Flickr', ($q, $http, LoopBackAdminConfiguration) ->
  { flickrApiKey } = LoopBackAdminConfiguration.options

  baseUrl = 'https://api.flickr.com/services/rest/?'

  params = [
    'method=flickr.groups.pools.getPhotos'
    'group_id=1463451@N25'
    'safe_search=1'
    'jsoncallback=JSON_CALLBACK'
    "api_key=#{ flickrApiKey }"
    'format=json'
  ].join '&'

  getBackgroundImage: ->
    defer = $q.defer()

    if flickrApiKey
      $http.get('http://freegeoip.net/json/').success (data) ->
        { longitude, latitude, region_name } = data

        optParams = "&tags=#{region_name}&lat=#{latitude}&lng=#{longitude}&extras=url_l"

        $http.jsonp(baseUrl + params + optParams, cache: true).success (resp) ->
          photos = resp.photos

          if photos.photo.length
            images = photos.photo
            image = images[Math.floor(Math.random() * images.length)]

            defer.resolve image: 'url(' + image.url_l + ')', title: image.title
          else defer.resolve()

    else defer.resolve image: "url('/images/background.png')"

    defer.promise

$http({method: 'GET', url: '/someUrl'})
   .success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
   })
   .error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
   });

/***********************************************************************************/
   angular.module('EmailApp')
   .factory('InboxFactory', [$q,$http,$location,function InboxFactory ($q, $http, $location) {
      'use strict';
      var exports = {};

      exports.messages = [];

      exports.getMessages = function () {
         var deferred = $q.defer();
         $http.get('json/emails.json')//$http
            .success(function (data) {
               exports.messages = data;
               deferred.resolve(data);
            })
            .error(function (data) {
               deferred.reject(data);
            });
         return deferred.promise;
      };

      return exports;
   }]);
/***********************************************************************************/

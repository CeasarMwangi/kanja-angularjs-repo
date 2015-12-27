app.factory('InboxFactory', function InboxFactory ($http) {
   var exports = {};

   exports.getMessages = function () {
      return $http.get('json/emails.json')
         .error(function (data) {
            console.log('There was an error!', data);
      });
   };

   return exports;
});


app.controller('InboxCtrl', function($scope, InboxFactory) {
   InboxFactory.getMessages()
      .success(function(jsonData, statusCode) {
         console.log('The request was successful!', statusCode, jsonData);
         // Now add the Email messages to the controller's scope
         $scope.emails = jsonData;
   });
});

/******************************************************************************/
angular.module('EmailApp')
   .factory('InboxFactory', function InboxFactory ($q, $http, $location) {
      'use strict';
      var exports = {};

      exports.messages = [];

      exports.goToMessage = function(id) {
         if ( angular.isNumber(id) ) {
            $location.path('inbox/email/' + id)
         }
      }

      exports.deleteMessage = function (id, index) {
         this.messages.splice(index, 1);
      }

      exports.getMessages = function () {
         var deferred = $q.defer();
         $http.get('json/emails.json')
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
   });

   /*********************************************************************************/
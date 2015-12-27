/*

<!-- the directive usage in a html file -->

<div id="someview">
   <my-custom-element></my-custom-element>
</div>

*/
app.directive('myCustomElement', function myCustomElement() {
   return {
      restrict: 'EA',
      replace: true,
      scope: true,
      template: [
         "<div>",
         "	<h1>My Custom Element's Heading</h1>",
         "	<p>Some content here!</p>",
         "	<pre>{{ ctrl.expression | json }}</pre>,"
         "</div>"
      ].join(""),
      controllerAs: 'ctrl',
      controller: function ($scope) {
         this.expression = {
            property: "Example"
         }
      },
      link: function (scope, element, attrs) {}
   }
});

/**********************************************************************/
app.directive('inbox', function () {
   return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: "js/directives/inbox.tmpl.html",
      controllerAs: 'inbox',
      controller: function (InboxFactory) {
         this.messages = [];
         this.goToMessage = function (id) {
            InboxFactory.goToMessage(id);
         };
         this.deleteMessage = function (id, index) {
            InboxFactory.deleteMessage(id, index);
         };
         InboxFactory.getMessages()
            .then( angular.bind( this, function then() {
               this.messages = InboxFactory.messages;
            })	);
      },
      link: function (scope, element, attrs, ctrl) {
         /*
         by convention we do not $ prefix arguments to the link function
         this is to be explicit that they have a fixed order
         */
      }
   }
});
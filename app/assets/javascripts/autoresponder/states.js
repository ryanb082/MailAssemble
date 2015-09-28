/* States */
AutoresponderApp
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider
        .when('/home', '/')
        .otherwise('/');

      // State Configurations
      $stateProvider
        .state("home", {
          url: "/",
          template: '<h1>Welcome to our new autoresponder</h1>',
        })

        .state("email_list", {
          url: "/email_list",
          abstract: true,
          // if we want to use a special layout for emails_lists we
          // just need to add some css style
          templateUrl: 'autoresponder/components/email_lists/main.html',
        })

        .state("email_list.list", {
          url: "",
          controller: 'emailListCtrl',
          templateUrl: 'autoresponder/components/email_lists/index.html',
        })

        .state("email_list.add", {
          url: "/add",
          controller: 'emailListAddCtrl',
          templateUrl: 'autoresponder/components/email_lists/add.html',
        })

        .state("email_list.details", {
          url: "/details/:emailListId",
          abstract: true,
          controller: 'emailListDetailsCtrl',
          templateUrl: 'autoresponder/components/email_lists/details/main.html',
          // if we want to share some information with the children
          // we can use resolve so that way if you need to use this variable from the
          // children controller just add this dependency in your controller
          // for instance:
          //
          //.controller('emailListSignupFormCtrl', [
          //            'findCurrentEmailListInParent',
          //            function (
          //              findCurrentEmailListInParent,
          //)            {
          //               $scope.email_list = findCurrentEmailListInParent;


          resolve:{
            findCurrentEmailListInParent: ['EmailListService', '$stateParams', function (EmailListService, $stateParams) {
              var listId = $stateParams.emailListId;
              return EmailListService.findOne(listId);
            }]
          }
        })

        .state("email_list.details.form", {
          url: "",
          templateUrl: 'autoresponder/components/email_lists/details/form.html',
        })

        .state("email_list.details.subscribers", {
          url: "/subscribers",
          controller: 'emailListDetailsCtrl',
          templateUrl: 'autoresponder/components/email_lists/details/subscribers.html',
        })

        .state("email_list.details.follow_ups", {
          url: "/follow_ups",
          controller: 'emailListDetailsCtrl',
          templateUrl: 'autoresponder/components/email_lists/details/follow_ups.html',
        })

        .state("email_list.details.stats", {
          url: "/stats",
          //controller: 'emailListStatsCtrl',
          templateUrl: 'autoresponder/components/email_lists/details/stats.html',
        })

        .state("email_list.details.add_subscriber", {
          url: "/add_subscriber",
          //controller: 'emailListFollowUpsCtrl',
          templateUrl: 'autoresponder/components/email_lists/details/add_subscriber.html',
        })
    }
  ]);



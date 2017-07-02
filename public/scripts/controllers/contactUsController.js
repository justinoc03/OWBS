myApp.controller("contactUsController", ['$scope', 'dbRoutesService', '$q', '$http', 'ngToast', '$location','$window','$timeout', '$interval', function($scope, dbRoutesService, $q, $http, ngToast, $location, $window, $timeout, $interval){
  console.log('In contactUsController');
  $window.scrollTo(0, 0);

  //////////////////////////////////ngToast Test //////////////////////////////////////////////////////////////
  // create a simple toast:
  // ngToast.create('a toast message...');
  //
  //   ngToast.create({
  //     className: 'info',
  //     dismissOnClick: false,
  //     dismissButton: true,
  //     // timeout: 4000,
  //     content: "HELLO!"
  // });
  // ...............End ngToast Test.........................

  //////////////////////////////Function: contactUsEmailInfo /////////////////////////////////
  $scope.contactUsEmailInfo = function(contactInfoFromUser){

    if (contactInfoFromUser.message === undefined){
      contactInfoFromUser.message = "";
    }

    //assemble object with new job details
    var contactInfo = {
      name: contactInfoFromUser.name,
      email: contactInfoFromUser.email,
      phoneNumber: contactInfoFromUser.phoneNumber,
      message: contactInfoFromUser.message,
    };

    console.log("contactInfo", contactInfo);

   dbRoutesService.contactInfoToSend(contactInfo)
     .then(function (responseObject){
       console.log(responseObject);
       //success
       //if statement checks if a successful statusCode has been sent back meaning sendgrid properly sent the emailInfo
       if(responseObject.data.statusCode === 202) {
        console.log('applicantEmail responseObject:', responseObject);

        // clear inputs after promise success response
        contactInfoFromUser.name = undefined;
        contactInfoFromUser.email = undefined;
        contactInfoFromUser.phoneNumber = undefined;
        contactInfoFromUser.message = undefined;

        ngToast.create({
          content: "Thank you for your interest in One Way Building Services! We are currently reading through your message and will contact you in the near future.",
          timeout: 20000,
        });
        //else statement to indiciate the email was not properly sent
      } else{
      ngToast.create({
        className: 'danger',
        content: "There was an error sending the information. Please try again or contact us",
        timeout: 20000,
      });
    }
  //
  //   }, function(errorObject){
  //     //err
  //     console.log('applicantEmail errorObject:', errorObject);
    });
  };




  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","static");
}]);

myApp.controller("contactUsController", ['$scope', 'dbRoutesService', '$q', '$http', '$location','$window', function($scope, dbRoutesService, $q, $http, $location, $window){
  console.log('In contactUsController');
  $window.scrollTo(0, 0);

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
        job.applicantFirstName = null;
        job.applicantLastName = null;
        job.applicantEmail = null;
        job.applicantPhone = null;
        job.commentsQuestions = null;
        angular.forEach(
          angular.element("input[type='file']"),
          function(inputElem) {
          angular.element(inputElem).val(null);
          });
        file = undefined;
        job.filePicker = undefined;
         $scope[fileToUpload] = undefined;

        ngToast.create({
          content: "Thank you for your application for the position title: " + responseObject.config.data.jobPostingTitle + ".<br> Please contact us with any further questions!",
        });
        //else statement to indiciate the email was not properly sent
      } else{
      ngToast.create({
        className: 'danger',
        content: "There was an error sending the information. Please try again or contact us",
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

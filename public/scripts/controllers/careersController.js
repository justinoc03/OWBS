myApp.controller("careersController", ['$scope', 'dbRoutesService', '$timeout', '$uibModal','$location','$http','$q', 'ngToast', '$interval', 'authService', function($scope, dbRoutesService, $timeout, $uibModal, $location, $http, $q, ngToast, $interval, authService, careersController){
  console.log('In careersController');

  //init function that is run at the bottom of this careersController
  $scope.init = function(){
    //global variables
    $scope.jobsArray = [];
    //functions to run on load
    $scope.getJobs();
  };

  $scope.auth0Login = function(){
    var vm = this;
    vm.authService = authService;
    vm.authService.login();

  };

  $scope.auth0Logout = function(){
    var vm = this;
    vm.authService = authService;
    vm.authService.logout();

    //redirect to careers page after logout
    $location.path('/careers');
    //checks localStorage to see if profile is cleared/null
    var profileParsed = JSON.parse(localStorage.getItem('profile'));
    console.log(profileParsed);
  };



  //////////////////////////////////toast info//////////////////////////////////////////////////////////////
  // create a simple toast:
  // ngToast.create('a toast message...');

//   ngToast.create({
//     className: 'info',
//     dismissOnClick: false,
//     dismissButton: true,
//     // timeout: 4000,
//     content: "HELLO!"
// });


  // $timeout(function() {
  //   toast();
  // }, 0);
  // $interval(function() {
  //   toast();
  // }, 5000);
  //........................................

  ////////////////////Function: validatePhoneNumber ///////////////////////
  $scope.validatePhoneNumber = function(evt) {
    console.log('in validate');
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9]/;
    if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
    }
  };


  ////////////////////Function: adminLogin ///////////////////////
  $scope.adminLogin = function(){
    var modalInstance = $uibModal.open({
      templateUrl: './views/modalViews/adminLoginModal.html',
      controller: 'adminLoginControllerModal'
    });

    modalInstance.result.then(function(res){
      //success
      console.log('logged in properly');
    }, function(err){
      //success
      console.log('error loggin in');
    });
  };

  ////////////////////Function: fileReaderFunction ///////////////////////
  $scope.fileReaderFunction = function(file, base64File){
    console.log(' in fileReaderFunction');

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      console.log(base64File);
      base64File = reader.result.split(',')[1];
      // console.log(reader.result.split(',')[1]);
      // console.log(base64File);

      reader.onerror = function (error) {
        console.log('Error: ', error);
        file = undefined;
        $scope[fileToUpload] = undefined;
      };

      console.log(file);
      console.log('base64File', base64File);
    };
    console.log(base64File);
    console.log(file);
    return file && base64File;
  };

  //////////////////////////////Function: emailInfo /////////////////////////////////
  $scope.emailInfo = function(job, file, base64File){
    if (job.commentsQuestions === undefined){
      job.commentsQuestions = "";
    }

    //assemble object with new job details
    var emailInfoToOWBS = {
      applicantFirstName: job.applicantFirstName,
      applicantLastName: job.applicantLastName,
      applicantEmail: job.applicantEmail,
      applicantPhone: job.applicantPhone,
      commentsQuestions: job.commentsQuestions,
      jobPostingTitle: job.jobposting_name,
      fileName: file.name,
      fileType: file.type,
      base64File: base64File,
    };

   console.log('emailInfo', emailInfoToOWBS);

   dbRoutesService.emailJobApplication(emailInfoToOWBS)
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
        //  $scope[fileToUpload] = undefined;

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

    }, function(errorObject){
      //err
      console.log('applicantEmail errorObject:', errorObject);
    });
  };

    ////////////////////Function: submitJobApplication in DB///////////////////////////////////
    $scope.submitJobApplication = function(job, fileToUpload){
      //fileModel directive allows theinput file chooser to work inside ng-repeat
      // $scope.fileInputs = [1,2,3];
      var file = $scope[fileToUpload];
      console.dir(file);
      console.log(job);

      var base64File;

      if(job.applicantFirstName === undefined || job.applicantLastName === undefined || job.applicantEmail === undefined || job.applicantPhone === undefined) {
        console.log('need to fill in data');
      } else if (file === undefined) {
          var test = confirm("You have not selected a file to send, would you like to proceed?");
            if (test === false){
            } else {
              // $scope.fileReaderFunction(file, base64File);
              file = {
                name: "",
                type: "",
              };
              $scope.emailInfo(job, file, base64File);
              $scope[fileToUpload] = undefined;
            }
          }
      else {
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
          console.log(base64File);
          base64File = reader.result.split(',')[1];
          // console.log(reader.result.split(',')[1]);
          // console.log(base64File);

          reader.onerror = function (error) {
            console.log('Error: ', error);
            file = undefined;
            $scope[fileToUpload] = undefined;
          };

          console.log(file);
          // console.log('base64File', base64File);

          $scope.fileReaderFunction(file, base64File);
          $scope.emailInfo(job, file, base64File);
          $scope[fileToUpload] = undefined;
        }; //end onload

     }

   };//end addNewJob

  /////////////////////////////////////////////Database calls to dbRoutesService//////////////////////////////////////////////
  ////////////////////Function GET Route: getJobs from DB ///////////////////////
  $scope.getJobs = function(){
    dbRoutesService.getJobPostings()
    .then(function (jobPostingsFromDB){
      //success
      $scope.jobsArray = jobPostingsFromDB.data;
      console.log('jobsArray', $scope.jobsArray);
    }, function(errorObject){
      //err
    });
  };

 ////////////////////Function: deleteJobPosting in DB///////////////////////
 $scope.deleteJobPosting = function(job){

   var test = confirm(job.jobposting_name + " job posting will be delete forever, would you like to proceed?");
      if (test === false){
      } else {

        console.log('job', job);
        //assemble object to send to DB put route
        jobToDelete = {
          jobPostingID: job.jobposting_id,
        };

         console.log('job', jobToDelete);

        //route status and promise to get the information back properly.
        dbRoutesService.deleteJob(jobToDelete)
        .then(function (responseObject){
          //success responseObject
          //timeout is used to make sure the slider visual is completed before the jobsArray object is rebuilt
          $timeout(function(){
          $scope.getJobs();
        }, 250);

        console.log('new jobsArray:', $scope.jobsArray);
        }, function(errorObject){
          //err
        });
  }//end of else statement
 };//end modifyJobPosting

  ////////////////////Function: modifyJobPosting in DB///////////////////////////
  $scope.modifyJobPosting = function(job){
    //assemble object to send to DB put route
    jobToModify = {
      jobPostingID: job.jobposting_id,
      jobPostingName: job.jobposting_name,
      jobPostingDescription: job.jobposting_description,
      jobPostingOpen: job.jobposting_open,
      jobPostingStart: job.jobposting_start
    };

    //if the job posting status is true, change to false and vice versa
    if(jobToModify.jobPostingOpen === true){
      jobToModify.jobPostingOpen = false;
    } else {
      jobToModify.jobPostingOpen = true;
    }

    //route status and promise to get the information back properly.
    dbRoutesService.modifyJobStatus(jobToModify)
    .then(function (responseObject){
      //success responseObject
      //timeout is used to make sure the slider visual is completed before the jobsArray object is rebuilt
      $timeout(function(){
       $scope.getJobs();
     }, 250);

      console.log('new jobsArray:', $scope.jobsArray);
    }, function(errorObject){
      //err
    });
  };//end modifyJobPosting
  //..................................End Database calls to dbRoutesService.......................................//


  //initialize any functions on load
  $scope.init();

  // set footer position for page
  angular.element(document.getElementById("footerSection")).css("position","fixed");
}]);

myApp.service('dbRoutesService', function(){

  console.log('in dbRoutesService!');

  this.testFunction = function() {
    x = 5*2;
    console.log(x);
  };

  ////////////////////Function: get all tasks already in DB///////////////////////
  this.getJobPostings = function(){
    $.ajax({
      type: 'GET',
      url: '/getJobPostings',
      success: function(data){
        console.log('got this back from server:', data);
        jobPostingsFromDB = data;
      }
    });
  };


});

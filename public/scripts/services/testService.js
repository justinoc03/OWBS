myApp.service('testService', function(){

  console.log('in testService!');

  this.testFunction = function() {
    x = 5*2;
    console.log(x);
  };


});

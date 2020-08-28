// Immediately invoked function and the concpet of Closures protect the code and helps us to achieve data encapsulation. 
// here the anonymus function returns an object to the variable budgetDataController by which we can access the protected data without exposing it globally. 
var budgetDataController = (function(){

    var x = 15;
    var add = function(a){
        return x + a;
    }
    return {
        publicTest: function(b){
            //console.log(add(b));
            return add(b); // returns the result of add(b)
        }
    }

})();

//budgetDataController.publicTest(5);

var budgetUIController = (function(){
   //
})();

// The budgetController helps to control the UI and data controllers. 

var budgetController = (function(datactrl, UIctrl){

    var z = budgetDataController.publicTest(89)
    return {
        checkPublic: function(){
            console.log(z);
        }

    }
})(budgetDataController,budgetUIController);
budgetController.checkPublic();


// DataController
var budgetDataController = (function(){

})();


// UI Controller
var budgetUIController = (function(){
   //
})();

// Global app Controller

var budgetController = (function(datactrl, UIctrl){

    var controlAddItem = function(){

        // 1. Get Input values
        // 2. Add the new item into budgetDataController
        // 3. Add the new item into the UI
        // 4. Calculate the buget
        // 5. Update the UI to display the budget
        console.log("Event handling works.")
    }
    
    //handling the check event when the user clicks the tick icon
    document.querySelector('.add__btn').addEventListener('click', controlAddItem);

    // user also preses the enter/return key genrally instead of click on tick or submit button.
    //handling the keyboard event of return/enter keys
    //event reference : https://developer.mozilla.org/en-US/docs/Web/Events
    document.addEventListener('keypress',function(event){

        //console.log(event);
        if (event.keyCode ===13 || event.which === 13){
            controlAddItem();
            //console.log("Enter/Return key was pressed.")
        }
    });

})(budgetDataController,budgetUIController);



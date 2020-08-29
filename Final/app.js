// DataController
var budgetDataController = (function(){

})();


// UI Controller
var budgetUIController = (function(){
    
    // 1. Get Input values
    // Creating object and storing the DOM class names. 
    var DOMAttributes = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'      
    } ;

    return {
        getUserInput: function(){
            return {
                type: document.querySelector(DOMAttributes.inputType).value, // inc or exp
                description: document.querySelector(DOMAttributes.inputDescription).value, //user description 
                value: document.querySelector(DOMAttributes.inputValue).value //get the value entered by user
            };
        },
        getDOMAttributes: function(){
            return DOMAttributes;
        }

    }
})();

// Global app Controller

var budgetController = (function(datactrl, UIctrl){
  
    // function that handles the events 
    var handleEventListeners = function(){
            var DOM = UIctrl.getDOMAttributes(); // receiving DOMAttributes 
            //console.log(DOM);
            //handling the check event when the user clicks the tick icon
            document.querySelector(DOM.inputBtn).addEventListener('click', controlAddItem);

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
    }

    
    var controlAddItem = function(){

        // 1. Get Input values
        var UserInupt = UIctrl.getUserInput(); //receiving the user input to handle the events
        // 2. Add the new item into budgetDataController
        // 3. Add the new item into the UI
        // 4. Calculate the buget
        // 5. Update the UI to display the budget
        //console.log("Event handling works.")
        console.log(UserInupt);
    }
    
    return {
        init: function(){
            handleEventListeners();
            console.log("Application has started");
        }
    };

})(budgetDataController,budgetUIController);

// calling the init function to start the application
budgetController.init();



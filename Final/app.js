// DataController
var budgetDataController = (function(){

    //creating function constructors for income and expense
    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // creating an object to store the data of income and expense 
    var budgetData = {
        allItems: {
            inc: [],
            exp: []
        },
        totalbudget: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percent: -1 // intitailly set to -1 as if it does not exist
    };
    var calculateTotal = function(type){
        var sum = 0;
        budgetData.allItems[type].forEach(currentType => sum += currentType.value);
        budgetData.totalbudget[type] = sum;
    }
    return {
        addNewBudgetItem: function(type,description,value){
            var newBudgetItem, budgetID;
            //creating an iD
            //Checking if already data available and adding the ID accordingly
            if (budgetData.allItems[type].length > 0){
            budgetID = budgetData.allItems[type][budgetData.allItems[type].length - 1].id + 1 
            } else {
                budgetID = 0;
            }
            //creating a newbudget item based on inc and exp
            if (type === 'exp'){
                newBudgetItem = new Expense (budgetID,description,value);
            } else if (type === 'inc'){
                newBudgetItem = new Income (budgetID,description,value);
            }
            //pushing the newbudget item into the data structure
            budgetData.allItems[type].push(newBudgetItem);
            return newBudgetItem;

        },
        calculateBudget: function(){

            //calculate total inc and exp
            calculateTotal('exp');
            calculateTotal('inc');
            //calculate the budget: inc - exp
            budgetData.budget = budgetData.totalbudget.inc - budgetData.totalbudget.exp;

            //calculate percentage of income the user spent
            if (budgetData.totalbudget.inc > 0){  // because if inc = 0 then percent will be infinity
                budgetData.percent = Math.round((budgetData.totalbudget.exp/budgetData.totalbudget.inc)*100); 
            } else {
                budgetData.percent = -1;
            }
            

        },
        getBudget: function(){
            return {
                budget: budgetData.budget,
                incTotal: budgetData.totalbudget.inc,
                expTotal: budgetData.totalbudget.exp,
                percent: budgetData.percent
            };

        },
        testing: function(){
            console.log(budgetData);
        }

    }

})();


// UI Controller
var budgetUIController = (function(){
    
    // 1. Get Input values
    // Creating object and storing the DOM class names. 
    var DOMAttributes = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn' ,
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',  
        incomeValue: 'budget__income--value',
        expenseValue: 'budget__expenses--value'
    } ;

    return {
        getUserInput: function(){
            return {
                type: document.querySelector(DOMAttributes.inputType).value, // inc or exp
                description: document.querySelector(DOMAttributes.inputDescription).value, //user description 
                value: parseFloat(document.querySelector(DOMAttributes.inputValue).value) //get the value entered by user
            };
        },
        //adding the newbuget item to the UI
        displayBudgetList: function(newBudgetItem, budgetType){
            
            var htmlString, newHTMLString,domElement;
            //create a HTML string with placeholders
            if (budgetType === 'inc'){

                domElement = DOMAttributes.incomeContainer;
                //console.log(domElement);
                htmlString = `<div  class="item clearfix" id="income-%id%">
                               <div class="item__description">%description%</div>  
                               <div class="right clearfix">
                               <div class="item__value"> + %value%</div>
                               <div class="item__delete">
                               <button class="item__delete--btn">
                               <i class="ion-ios-close-outline"></i>
                               </button>
                               </div>
                               </div>
                               </div>`;
               
            } else if (budgetType === 'exp'){

                domElement = DOMAttributes.expenseContainer;
                htmlString = ` <div class="item clearfix" id="expense-%id%">
                               <div class="item__description">%description%</div>
                               <div class="right clearfix">
                               <div class="item__value"> - %value%</div>
                               <div class="item__percentage">21%</div>
                               <div class="item__delete">
                               <button class="item__delete--btn">
                               <i class="ion-ios-close-outline"></i>
                               </button>
                               </div>
                               </div>
                               </div>`;
            }
            //replacing the place holders with userinput data
            newHTMLString = htmlString.replace('%id%',newBudgetItem.id)
            newHTMLString = newHTMLString.replace('%description%',newBudgetItem.description);
            newHTMLString = newHTMLString.replace('%value%',newBudgetItem.value);
            console.log(newHTMLString);
            //insert the HTML element into the DOM using insertAdjacentHTML
            document.querySelector(domElement).insertAdjacentHTML('beforeend',newHTMLString);
        },
        
        getDOMAttributes: function(){
            return DOMAttributes;
        },
        // clears the input values entered by the user and place the focus on the 
        clearUserInput: function(){
            var inputFields, fieldsArray;
            inputFields = document.querySelectorAll(DOMAttributes.inputDescription + ', ' +
            DOMAttributes.inputValue);
            fieldsArray = Array.from(inputFields);
            //console.log(fieldsArray);
            fieldsArray.map(e => e.value = "");
            fieldsArray[0].focus();
        },
        diplaybudget: function(budgetObj){
            var incomeTotal = document.getElementsByClassName(DOMAttributes.incomeValue);
            //console.log(incomeTotal);
            incomeTotal[0].innerHTML = `+ ${budgetObj.incTotal}`;
            //console.log(budgetObj.incTotal);
            var expenseTotal = document.getElementsByClassName(DOMAttributes.expenseValue);
            //console.log(incomeTotal);
            expenseTotal[0].innerHTML = `- ${budgetObj.expTotal}`;
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
    };

    var updateBudget = function(){

         // 1. Calculate the buget
            datactrl.calculateBudget();

         // 2. return the budget
            var budget = datactrl.getBudget();
            console.log(budget);
        // 3. Update the UI to display the budget
            UIctrl.diplaybudget(budget);
        
    };
    var controlAddItem = function(){
        
        var userInupt, newUserBudgetItem
        // 1. Get Input values
        userInupt = UIctrl.getUserInput(); //receiving the user input to handle the events
        console.log(userInupt);
        if (userInupt.description!=="" && !isNaN(userInupt.value) && userInupt.value > 0){
        // 2. Add the new item into budgetDataController
        newUserBudgetItem = datactrl.addNewBudgetItem(userInupt.type, userInupt.description,userInupt.value);
        //console.log(newUserBudgetItem);
        datactrl.testing(); //to see the biuget datat
        // 3. Add the new item into the UI
        UIctrl.displayBudgetList(newUserBudgetItem,userInupt.type);
        UIctrl.clearUserInput(); // to clear the user inputs 
        //console.log("Event handling works.")
        //calculate and update budget
        updateBudget();
        };
        
       
        
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



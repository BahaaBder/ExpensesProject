class ExpenseManager {
    constructor() {
        this.expenses = []
    }


    addExpense = function(newExpense) {
        let self = this.expenses
        $.ajax({
            url: '/expense',
            type: 'post',
            data: newExpense,
            async: false,
            success: function(data) {
                self = data
            }
        });
    }



    getExpenses = function() {
        let self = this.expenses
        $.ajax({
            url: '/expenses',
            type: 'get',
            async: false,
            success: function(data) {
                self = data
            }
        });
        return self
    }
}
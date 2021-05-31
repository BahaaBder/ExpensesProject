const renderData = new Render()
const manageExpenses = new ExpenseManager()
const nam = $(".nameExpense")
const amount = $(".amountExpense")
const item = $(".itemExpense")
const group = $(".groupExpense")
const date = $(".dateExpense")
const AddExpense = function() {
    manageExpenses.addExpense({
        name: nam.val(),
        amount: amount.val(),
        item: item.val(),
        group: group.val(),
        date: date.val()
    })

}
const getUpdatedExpenses = function() {
    let array = manageExpenses.getExpenses()
    array.forEach(a => {
        if (a.name == undefined) {
            a.name = "לא מזוהה"
        }
    })
    renderData.renderExpenses(array)
}

$("body").on("click", "i", function() {
    $(this).parent().children(".moreDetals").css('display', 'block');
})
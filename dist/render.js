class Render {
    constructor() {

    }

    renderExpenses = function(players) {
        const source = $("#players-template").html()
        const template = Handlebars.compile(source)
        let playerSheet = template({ players })
        $(".newDataResult").empty()
        $(".newDataResult").append(playerSheet)
    }
    renderAdd = function() {

    }
}
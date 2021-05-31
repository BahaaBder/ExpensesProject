const express = require('express')
const router = express.Router()
const expensesJSON = require('../../expenses')
const Expense = require('../../models/Expense')
const moment = require('moment')

/*
Function that was only performed once so was marked as a response
*/
// const setJsonOnDataBase = function() {
//     expensesJSON.forEach(e => {
//         const expense = new Expense(e)
//         expense.save()
//     })
// }
// setJsonOnDataBase()



router.get('/expenses', function(req, res) {
    const d1 = req.query.d1
    const d2 = req.query.d2
    if (d2 == undefined && d1 != undefined) {
        Expense.find({ date: { $gt: d1 } }).sort('date').exec(function(err, expenses) {
            res.send(expenses)
        })
    }
    if (d2 != undefined && d1 != undefined) {
        Expense.find({ $and: [{ date: { $gt: d1 } }, { date: { $lt: d2 } }] }).sort('date').exec(function(err, expenses) {
            res.send(expenses)
        })
    }
    if (d1 == undefined && d2 == undefined) {
        Expense.find({}).sort('date').exec(function(err, expenses) {
            res.send(expenses)
        })
    }
})



router.post('/expense', function(req, res) {
    const getTheNewExpense = req.body
    if (getTheNewExpense.date == "") {
        getTheNewExpense.date = moment().format()
    }
    const expense = new Expense(getTheNewExpense)
    expense.save().then(function() {
        console.log("amount: " + req.body.amount + "item: " + req.body.item)
        res.end()
    })

})

/// TODO /////////////////

/*

http://localhost:4200/update?group1=misc&group2=sheree

*/
router.put('/update', function(req, res) {
    const group1 = req.query.group1
    const group2 = req.query.group2
    Expense.findOneAndUpdate({ group: group1 }, { group: group2 }, function(err, result) {
        res.send(result.item + "Group changes to :" + group2)
    })

})



router.get('/expenses/:group', function(req, res) {
    const requstedGroup = req.params.group
    const isTotal = req.query.total
    let sum = 0
    Expense.find({ group: requstedGroup }).exec(function(err, expenses) {
        if (isTotal) {
            expenses.forEach(e => sum += e.amount)
        }
        console.log(sum)
        res.end()
    })
})




// router.delete('/apocalypse', function(req, res) {
//     Person.find({}, function(err, people) {
//         people.forEach(p => p.remove())
//         console.log(people)
//     })
//     res.end()
// })
module.exports = router
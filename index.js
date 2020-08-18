// Your code here

function createEmployeeRecord(info) {
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(records) {
    return records.map(
        function(object) {
            return createEmployeeRecord(object);
        }
    );
}

function createTimeInEvent(dateStamp) {
    let date = dateStamp.split(' ')[0];
    let hour = dateStamp.split(' ')[1];

    this['timeInEvents'].push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date
    });

    return this;
}

let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
let updatedBpRecord = createTimeInEvent.call(bpRecord, "2014-02-28 1400")
console.log(updatedBpRecord);


function createTimeOutEvent(dateStamp) {
    let date = dateStamp.split(' ')[0];
    let hour = dateStamp.split(' ')[1];

    this['timeOutEvents'].push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    });

    return this;
}



function hoursWorkedOnDate(dateStamp) {
    let dateIn = this.timeInEvents.find(e => e.date === dateStamp);
    let dateOut = this.timeOutEvents.find(e => e.date === dateStamp);
    // console.log(dateOut);
    // console.log(dateIn);
    return (dateOut['hour'] - dateIn.hour) / 100;
}





function wagesEarnedOnDate(dateStamp) {
    return this.payPerHour * hoursWorkedOnDate.call(this, dateStamp);
}

let allWagesFor = function() {
    let eligibleDates = this.timeInEvents.map(function(e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d) {
            return memo + wagesEarnedOnDate.call(this, d)
        }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(records, firstName) {
    return records.find(
        function(record) {
            return record['firstName'] === firstName;
        }
    );
}

let src = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
];

let employees = createEmployeeRecords.call(src);
console.log(employees);



function calculatePayroll(records) {
    return records.reduce(
        function(sum, record) {
            return sum + allWagesFor.call(record);
        }, 0
    );
}

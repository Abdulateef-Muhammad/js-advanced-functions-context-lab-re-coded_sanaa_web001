// Your code here
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

// let cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);

// let updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900");
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100");

// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")

// console.log(allWagesFor(cRecord));

// let hoursWorked = hoursWorkedOnDate(cRecord, '0044-03-15');
// console.log(wagesEarnedOnDate(cRecord, '0044-03-15'));

function findEmployeeByFirstName(firstName) {
    return this.find(
        function(record) {
            return record['firstName'] === firstName;
        }
    );
}

let src = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
]
let emps = createEmployeeRecords(src)
let loki = findEmployeeByFirstName.call(emps, "Loki");

console.log(loki);



function calculatePayroll() {
    return this.reduce(
        function(sum, record) {
            return sum + allWagesFor.call(record);
        }, 0
    );
}

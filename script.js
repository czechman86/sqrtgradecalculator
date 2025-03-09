//when the dropdown changes
document.getElementById('numAssignments').addEventListener('change', function () {
    var num = this.value;
    if (num && num > 0) {
        generateAssignmentInputs(num);
    } else {
        document.getElementById('assignmentsContainer').innerHTML = '';
    }
});

//generate input boxes for each assignment
function generateAssignmentInputs(num) {
    var container = document.getElementById('assignmentsContainer');
    container.innerHTML = ''; //clear previous inputs
    for (var i = 1; i <= num; i++){
        var label = document.createElement('label');
        label.textContent = 'Assignment ' + i + ' number of questions: ';
        var input = document.createElement('input');
        input.type = 'number';
        input.className = 'assignment-input';
        input.min = 1;
        input.step = 1;
        input.required = true; //must enter a value
        container.appendChild(label);
        container.appendChild(input);
        container.appendChild(document.createElement('br')); //new line
    }
}

//when submit button is clicked
document.getElementById('submitButton').addEventListener('click', function() {
    var inputs = document.getElementsByClassName('assignment-input');
    var tablesContainer = document.getElementById('tablesContainer');
    tablesContainer.innerHTML = ''; //clear previous tables
    for (var i = 0; i < inputs.length; i++) {
        var n = parseInt(inputs[i].value);
        if (!isNaN(n) && n > 0 && Number.isInteger(n)) {
            var header = document.createElement('h3');
            header.textContent = 'Assignment ' + (i + 1);
            tablesContainer.appendChild(header);
            var table = generateTable(n);
            tablesContainer.appendChild(table);
        }
    }
});

//generate table for an assignment
function generateTable(n) {
    var table = document.createElement('table');
    //headers
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    var th1 = document.createElement('th');
    th1.textContent = 'Number Correct';
    var th2 = document.createElement('th');
    th2.textContent = 'Curved Percentage';
    tr.appendChild(th1);
    tr.appendChild(th2);
    thead.appendChild(tr);
    table.appendChild(thead);
    //rows
    var tbody = document.createElement('tbody');
    for (var x = 0; x <= n; x++) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.textContent = x;
        var td2 = document.createElement('td');
        var percentage = (Math.sqrt(x / n) * 100).toFixed(2);
        td2.textContent = percentage + '%';
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    return table;
}

//when the reset button is clicked
document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('assignmentsContainer').innerHTML = '';
    document.getElementById('tablesContainer').innerHTML = '';
    document.getElementById('numAssignments').value = '';
});
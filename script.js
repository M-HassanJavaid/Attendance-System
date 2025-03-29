let btn = document.querySelector('#Attend-btn');
let RollNumInput = document.querySelector('.RollNum');
let NameInput = document.querySelector('.Name');
let table = document.querySelector('table');
let MonthsArray = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
let daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let LocalStorageData;

function RenderFromLocalStorage() {
    LocalStorageData = localStorage.getItem('Attendance');
    if (LocalStorageData === null) {
        LocalStorageData = [];
        return;
    }
    LocalStorageData = JSON.parse(LocalStorageData);
    LocalStorageData.forEach(element => {
        RenderHtml(element.RollNum , element.Name , element.Date , element.Day , element.Time)
    });
} RenderFromLocalStorage()

btn.addEventListener('click' , ()=>{
    let DateTime = new Date;
    if (RollNumInput.value === '' && NameInput.value === '') {
        alert('Kindly, Enter your Name and Roll number.');
        return;
    } else if (NameInput.value === '') {
        alert('Kindly, Enter your Name.');
        return;
    } else if (RollNumInput.value === '') {
        alert('Kindly, Enter your Roll Number.')
        return;
    }
    let date = `${DateTime.getDate()} ${MonthsArray[DateTime.getMonth()]} ${DateTime.getFullYear()}`
    let Day = daysArray[DateTime.getDay()];
    let hours = DateTime.getHours();
    let minutes = DateTime.getMinutes().toString().padStart(2 , '0');
    let Seconds = DateTime.getSeconds().toString().padStart(2 , '0');
    let AMorPM;
    if (hours === 12 ) {
        AMorPM = 'PM';
    } else if (hours < 12) {
        if (hours === 0) {
            hours = 12;
        }
        AMorPM = 'AM';
    } else {
        hours = hours - 12;
        AMorPM = 'PM';
    }
    hours = hours.toString().padStart(2 , '0');
    let Time = `${hours}:${minutes}:${Seconds} ${AMorPM}`
    RenderHtml(RollNumInput.value , NameInput.value , date , Day , Time)
    SaveInLocalStorage(RollNumInput.value , NameInput.value , date , Day , Time);
    
    RollNumInput.value = '';
    NameInput.value = '';

});

function RenderHtml(RollNum , Name, date , Day , Time) {
    let newRow = document.createElement('tr');
    newRow.innerHTML= `<td>${RollNum}</td>
                       <td>${Name}</td>
                       <td>${date}</td>
                       <td>${Day}</td>
                       <td>${Time}</td>`
    newRow.className = 'table-data';
    table.appendChild(newRow);
}

function SaveInLocalStorage(RollNum , Name, date , Day , Time) {
    let NewDataObject = {
        RollNum : RollNum,
        Name : Name,
        Date : date,
        Day : Day,
        Time : Time
    }

    LocalStorageData.push(NewDataObject);

    localStorage.setItem('Attendance' , JSON.stringify(LocalStorageData));

}

let ClearRecordsBtn = document.querySelector('#clear-Records');
ClearRecordsBtn.addEventListener('click' , ()=>{
    let isDelete = confirm('Do you really want to Delete all Records? It will Delete Permenently!');
    if (isDelete === false) {
        alert('Your Data is saved!');
        return;
    }
    document.querySelectorAll('.table-data').forEach((element)=>{
        element.remove();
    });
    localStorage.clear();

});


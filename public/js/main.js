async function getData(year, month, day){
    const call = await fetch(`/ranking/${year}/${month}/${day}`);
    const data = await call.json();

    console.log(data);
}

document.getElementById('submitDate').addEventListener('click', () => {
    function parseMonth(num){
        switch(num){
            case '01': {return 'january';}
            case '02': {return 'february';}
            case '03': {return 'march';}
            case '04': {return 'april';}
            case '05': {return 'may';}
            case '06': {return 'june';}
            case '07': {return 'july';}
            case '08': {return 'august';}
            case '09': {return 'september';}
            case '10': {return 'october';}
            case '11': {return 'november';}
            case '12': {return 'december';}
        }
    }

    let date = document.getElementById('date').value.split('-');

    getData(date[0], parseMonth(date[1]), date[2]);
})
export function getDate(offset = 0, sign = '-'){
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + offset)
    return formatDate(tomorrow, sign)
}

function formatDate(date, sign){
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; 
    let dd = date.getDate();
    
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    
    const formatted = yyyy + sign + mm + sign + dd;
    return formatted; 
}
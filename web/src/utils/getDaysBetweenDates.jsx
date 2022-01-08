export default function GetDaysBetweenDates(start, end) {
    let array=[];

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)){
        array.push(new Date(date).toLocaleDateString());
    };

    return array;
};
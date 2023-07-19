const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export function getDateTime(utcTime: Date): string {
    const localTime: Date = new Date(utcTime.toLocaleString());
    return localTime.getDate() + "/" + monthList[localTime.getMonth()] + "/" + localTime.getFullYear() + " " + localTime.getHours() + ":" + localTime.getMinutes();
}
export function getDayMonth(utcTime: Date):string {
    const localTime: Date = new Date(utcTime.toLocaleString());
    return localTime.getDate() + "/" + monthList[localTime.getMonth()]
}
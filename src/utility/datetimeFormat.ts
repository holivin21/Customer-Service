export function getDateTime(utcTime: Date) {
    const localTime: Date = new Date(utcTime.toLocaleString());
    return localTime.getDate() + "/" + (localTime.getMonth() + 1) + "/" + localTime.getFullYear() + " " + localTime.getHours() + ":" + localTime.getMinutes();
}
export function getCityTime(unixSeconds, timezone) {

    const date = new Date((unixSeconds + timezone) * 1000)
    
    return date.toLocaleTimeString("en-US", {timeZone: "UTC", hour: "numeric", minute: "2-digit"});
    
}

export function getCityDate(unixSeconds, timezone) {

    const date = new Date((unixSeconds + timezone) * 1000)
    return date.toLocaleDateString("en-US", {timeZone: "UTC", weekday: "short", month: "short", day: "numeric"});
}

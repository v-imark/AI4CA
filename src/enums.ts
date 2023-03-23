export interface Event {
    time: String,
    location: String,
    tweetText: String,
    tweetImage: String,
    severity: number,
}

export interface DataSelection {
    type: String,
    selection: Event[],
    closesWarning: String,
}
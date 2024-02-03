export default function getCurrentTime(): string {
    const currentTime: Date = new Date();
    const hours: string = currentTime.getHours().toString().padStart(2, "0");
    const minutes: string = currentTime
        .getMinutes()
        .toString()
        .padStart(2, "0");
    const seconds: string = currentTime
        .getSeconds()
        .toString()
        .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}

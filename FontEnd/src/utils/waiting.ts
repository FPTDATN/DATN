export const waiting = (time: number) => {
    return new Promise((resolve) => setTimeout((resolve), time))
}

export function async(promiseGenerator) {
    return () => {
        promiseGenerator();
    }
}

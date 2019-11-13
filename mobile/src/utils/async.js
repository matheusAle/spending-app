/**
 * prevent async functions to return a promise. Used in useEffects hooks
 * @param promiseGenerator
 * @returns {Function}
 */
export function async(promiseGenerator) {
    return () => {
        promiseGenerator();
    }
}

import { EffectCallback } from "react";

/**
 * prevent async functions to return a promise. Used in useEffects hooks
 * @param promiseGenerator
 * @returns {Function}
 */
export function async<T>(promiseGenerator: () => Promise<T>): EffectCallback {
    return () => {
        promiseGenerator();
    }
}

/**
 * Convert persisted checkbox values into booleans.
 *
 * @param {unknown} input The persisted widget value.
 * @returns {boolean} The normalized value.
 */
export function toBoolSafe(input) {
    return input !== false && input !== 'false' && Boolean(input);
}

/**
 * Normalize a countdown action while its states are still loading.
 *
 * @param {unknown} input The action state value.
 * @returns {'stop' | 'run' | 'pause' | 'end'} A supported countdown action.
 */
export function normalizeCountdownAction(input) {
    return input === 'run' || input === 'pause' || input === 'end' ? input : 'stop';
}

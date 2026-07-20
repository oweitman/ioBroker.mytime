/**
 * Convert persisted checkbox values into booleans.
 *
 * @param {unknown} input The persisted widget value.
 * @returns {boolean} The normalized value.
 */
export function toBoolSafe(input) {
    return input !== false && input !== 'false' && Boolean(input);
}

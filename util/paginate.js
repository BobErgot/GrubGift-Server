/**
 * This function divides an array into smaller arrays (pages) and returns the specified page.
 * The pagination starts with page 1.
 *
 * @param {Array} array - The array to be paginated.
 * @param {number} page_size - The size of each page.
 * @param {number} page_number - The page number to be returned.
 * @returns {Array} - The part of the array corresponding to the specified page.
 */
function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

module.exports = paginate;

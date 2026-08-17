/**
 * Base Drinks Library
 *
 * Standard drink selection for vending machines.
 * Excludes coffee products (use custom drinks for those).
 *
 * Patterns: circles, waves, swirl, zigzag, bubbles, stripe
 */

export const BASE_DRINKS = [
  // Colas & Dark Sodas
  { name: 'CYBERCOLA', pattern: 'circles', color: 'red' },
  { name: 'NEOCOLA ZERO', pattern: 'bubbles', color: 'red' },
  { name: 'SYNTH PEPPER', pattern: 'waves', color: 'red' },

  // Citrus & Light Sodas
  { name: 'NEOSPRITE', pattern: 'bubbles', color: 'green' },
  { name: 'LEMON SHOCK', pattern: 'zigzag', color: 'yellow' },
  { name: 'ORANGE BLAST', pattern: 'swirl', color: 'orange' },

  // Energy Drinks
  { name: 'QUANTUM QUENCH', pattern: 'zigzag', color: 'blue' },
  { name: 'CYBER BOOST', pattern: 'waves', color: 'orange' },
  { name: 'VOLTAGE GREEN', pattern: 'zigzag', color: 'green' },

  // Teas & Light Beverages
  { name: 'SYNTHTEA', pattern: 'swirl', color: 'yellow' },
  { name: 'ARCTIC MINT', pattern: 'waves', color: 'green' },
  { name: 'PEACH PULSE', pattern: 'circles', color: 'orange' },

  // Fruit Flavored
  { name: 'GRAPE MATRIX', pattern: 'swirl', color: 'purple' },
  { name: 'BERRY FUSION', pattern: 'bubbles', color: 'purple' },
  { name: 'TROPICAL SURGE', pattern: 'waves', color: 'orange' },

  // Water & Sports
  { name: 'HYDRO PURE', pattern: 'stripe', color: 'blue' },
  { name: 'ELECTRO WATER', pattern: 'zigzag', color: 'blue' },
  { name: 'SPORTS FUEL', pattern: 'stripe', color: 'red' },

  // Specialty
  { name: 'PINK LEMONADE', pattern: 'bubbles', color: 'red' },
  { name: 'BLUE RAZZ', pattern: 'swirl', color: 'blue' },
];

/**
 * Helper function to get drinks from base library
 *
 * @param {number[]} indices - Array of indices from BASE_DRINKS
 * @param {number[]} outOfStock - Array of positions (0-indexed) that should be out of stock
 * @returns {object[]} Array of drink objects with availability
 *
 * @example
 * // Get drinks 0,1,2,3,4,5 all in stock
 * getDrinks([0,1,2,3,4,5])
 *
 * @example
 * // Get drinks with positions 1 and 4 out of stock
 * getDrinks([0,1,2,3,4,5], [1,4])
 *
 * @example
 * // Mix with custom drinks
 * [
 *   ...getDrinks([0,1,2]),
 *   { name: 'CUSTOM', pattern: 'waves', color: 'orange', available: true }
 * ]
 */
export const getDrinks = (indices, outOfStock = []) => {
  return indices.map((idx, position) => ({
    ...BASE_DRINKS[idx],
    available: !outOfStock.includes(position)
  }));
};

export default BASE_DRINKS;

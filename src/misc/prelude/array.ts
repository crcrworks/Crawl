/**
 * Count the number of elements that satisfy the predicate
 */

// export const countIf = <T>(f: Predicate<T>, xs: T[]): number => {
//   return xs.filter(f).length
// }

// /**
//  * Count the number of elements that is equal to the element
//  */
// export const count = <T>(a: T, xs: T[]): number => {
//   return countIf(x => x === a, xs)
// }

/**
 * Concatenate an array of arrays
 */
export const concat = <T>(xss: T[][]): T[] => {
  return ([] as T[]).concat(...xss)
}

/**
 * Intersperse the element between the elements of the array
 * @param sep The element to be interspersed
 */
export const intersperse = <T>(sep: T, xs: T[]): T[] => {
  return concat(xs.map(x => [sep, x])).slice(1)
}

/**
 * Returns the array of elements that is not equal to the element
 */
export const erase = <T>(a: T, xs: T[]): T[] => {
  return xs.filter(x => x !== a)
}

/**
 * Finds the array of all elements in the first array not contained in the second array.
 * The order of result values are determined by the first array.
 */
export const difference = <T>(xs: T[], ys: T[]): T[] => {
  return xs.filter(x => !ys.includes(x))
}

/**
 * Remove all but the first element from every group of equivalent elements
 */
export const unique = <T>(xs: T[]): T[] => {
  return [...new Set(xs)]
}

export const sum = (xs: number[]): number => {
  return xs.reduce((a, b) => a + b, 0)
}

export const maximum = (xs: number[]): number => {
  return Math.max(...xs)
}

/**
 * Splits an array based on the equivalence relation.
 * The concatenation of the result is equal to the argument.
 */
// export const groupBy = <T>(f: EndoRelation<T>, xs: T[]): T[][] => {
//   const groups = [] as T[][]
//   for (const x of xs) {
//     if (groups.length !== 0 && f(groups[groups.length - 1][0], x)) {
//       groups[groups.length - 1].push(x)
//     } else {
//       groups.push([x])
//     }
//   }
//   return groups
// }

/**
 * Splits an array based on the equivalence relation induced by the function.
 * The concatenation of the result is equal to the argument.
 */
// export const groupOn = <T, S>(f: (x: T) => S, xs: T[]): T[][] => {
//   return groupBy((a, b) => f(a) === f(b), xs)
// }

export const groupByX = <T>(collections: T[], keySelector: (x: T) => string) => {
  return collections.reduce((obj: Record<string, T[]>, item: T) => {
    const key = keySelector(item)
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      obj[key] = []
    }

    obj[key].push(item)

    return obj
  }, {})
}

/**
 * Compare two arrays by lexicographical order
 */
export const lessThan = (xs: number[], ys: number[]): boolean => {
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    if (xs[i] < ys[i]) return true
    if (xs[i] > ys[i]) return false
  }
  return xs.length < ys.length
}

/**
 * Returns the longest prefix of elements that satisfy the predicate
 */
// export const takeWhile = <T>(f: Predicate<T>, xs: T[]): T[] => {
//   const ys = []
//   for (const x of xs) {
//     if (f(x)) {
//       ys.push(x)
//     } else {
//       break
//     }
//   }
//   return ys
// }

export const cumulativeSum = (xs: number[]): number[] => {
  const ys = Array.from(xs) // deep copy
  for (let i = 1; i < ys.length; i++) ys[i] += ys[i - 1]
  return ys
}

export const toArray = <T>(x: T | T[] | undefined): T[] => {
  return Array.isArray(x) ? x : x != null ? [x] : []
}

export const toSingle = <T>(x: T | T[] | undefined): T | undefined => {
  return Array.isArray(x) ? x[0] : x
}

export function isClient() {
  return typeof window !== "undefined";
}

/**
 * convert object Date to format yyyy-mm-dd
 * @param {Date} date
 * @returns {string} iso format yyyy-mm-dd
 */
export function dateToISO(date: Date) {
  return date.toISOString().split("T")[0];
}

/**
 * convert date Object to date string based on locale
 * @param {Date} date
 * @param {Intl.LocalesArgument} locale
 * @param {Intl.DateTimeFormatOptions} options
 * @returns {string} date returned depend on locale, for en-US mm-dd-yyyy
 */
export function formatDate(
  date: Date,
  locale: Intl.LocalesArgument = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
) {
  return date.toLocaleDateString(locale, options);
}

/**
 * convert number value to price with currency
 * @param {number} price
 * @param {string} locale
 * @param {Intl.NumberFormatOptions} options
 * @returns {srting} currency based on locale
 */
export function formatCurrency(
  price: number,
  locale = "en-US",
  options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "USD",
  }
) {
  return new Intl.NumberFormat(locale, options).format(price);
}

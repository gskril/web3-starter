const breakpoints = {
  xs: '22.5rem',
  sm: '40em',
  md: '48em',
  lg: '64em',
  xl: '80em',
}

/**
 * Breakpoints for CSS media queries
 * @example
 * `@media ${mq.sm.min} {
 *  ...
 * }`
 */
export const mq = {
  xs: {
    min: `screen and (min-width: ${breakpoints.xs})`,
    max: `screen and (max-width: ${breakpoints.xs})`,
  },
  sm: {
    min: `screen and (min-width: ${breakpoints.sm})`,
    max: `screen and (max-width: ${breakpoints.sm})`,
  },
  md: {
    min: `screen and (min-width: ${breakpoints.md})`,
    max: `screen and (max-width: ${breakpoints.md})`,
  },
  lg: {
    min: `screen and (min-width: ${breakpoints.lg})`,
    max: `screen and (max-width: ${breakpoints.lg})`,
  },
  xl: {
    min: `screen and (min-width: ${breakpoints.xl})`,
    max: `screen and (max-width: ${breakpoints.xl})`,
  },
}

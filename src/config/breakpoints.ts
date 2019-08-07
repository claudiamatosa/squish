import { css } from 'styled-components';

export const breakpoints = {
  mini: 200,
  small: 400,
  medium: 768,
  desktop: 1024,
  wide: 1308
}

export const useBreakpoints = (
  property: string,
  values: { [string: string]: any }
) => Object.keys(values).map((key, index) => {
  if (index === 0) {
    return `
      ${property}: ${values[key]};
    `;
  } else {
    return `
      // @ts-ignore
      @media (min-width: ${breakpoints[key]}px) {
        ${property}: ${values[key]};
      }
    `;
  }
});

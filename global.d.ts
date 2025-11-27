declare module 'prop-types' {
  const PropTypes: PropTypes;
  export default PropTypes;
}

declare module 'd3-scale' {
  export function scaleTime(...args: Parameters<typeof scaleTime>): ReturnType<typeof scaleTime>;
}



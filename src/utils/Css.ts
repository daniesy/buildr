export const extractByPosition = (
  value: string,
  position:
    | 'top'
    | 'top-left'
    | 'right'
    | 'top-right'
    | 'bottom'
    | 'bottom-right'
    | 'left'
    | 'bottom-left',
) => {
  // from a 0px 0px 0px 0px or 0px 0px 0px or 0px 0px or 0px string, extract the value of the position

  const values = value.split(' ');
  switch (position) {
    case 'top':
    case 'top-left':
      return values[0];
    case 'right':
    case 'top-right':
      return values[1] || values[0];
    case 'bottom':
    case 'bottom-right':
      return values[2] || values[0];
    case 'left':
    case 'bottom-left':
      return values[3] || values[1] || values[0];
  }
};

export const hasDifferentValues = (value: string): boolean => {
  const values = value.split(' ');

  // If there's only one value or all values are the same, return false
  return values.length > 1 && new Set(values).size > 1;
};

export const generateFromPositions = (top: string, right: string, bottom: string, left: string) =>
  `${top} ${right} ${bottom} ${left}`;

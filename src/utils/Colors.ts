export const colors = [
  {
    name: 'Red',
    bgColor: 'bg-rose-500',
    textColor: 'text-rose-500',
    selectedColor: 'ring-rose-500',
    value: 'rose-500',
    hex: '#f43f5e',
    rgb: 'rgb(244, 67, 54)',
  },
  {
    name: 'Pink',
    bgColor: 'bg-pink-500',
    textColor: 'text-pink-500',
    selectedColor: 'ring-pink-500',
    value: 'pink-500',
    hex: '#ec4899',
    rgb: 'rgb(236, 72, 153)',
  },
  {
    name: 'Purple',
    bgColor: 'bg-purple-500',
    textColor: 'text-purple-500',
    selectedColor: 'ring-purple-500',
    value: 'purple-500',
    hex: '#8b5cf6',
    rgb: 'rgb(139, 92, 246)',
  },
  {
    name: 'Blue',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-500',
    selectedColor: 'ring-blue-500',
    value: 'blue-500',
    hex: '#2563eb',
    rgb: 'rgb(37, 99, 235)',
  },
  {
    name: 'Green',
    bgColor: 'bg-green-500',
    textColor: 'text-green-500',
    selectedColor: 'ring-green-500',
    value: 'green-500',
    hex: '#10b981',
    rgb: 'rgb(16, 185, 129)',
  },
  {
    name: 'Yellow',
    bgColor: 'bg-yellow-500',
    textColor: 'text-yellow-500',
    selectedColor: 'ring-yellow-500',
    value: 'yellow-500',
    hex: '#f59e0b',
    rgb: 'rgb(245, 158, 11)',
  },
  {
    name: 'Gray',
    bgColor: 'bg-gray-500',
    textColor: 'text-gray-500',
    selectedColor: 'ring-gray-500',
    value: 'gray-500',
    hex: '#6b7280',
    rgb: 'rgb(107, 114, 128)',
  },
  {
    name: 'Black',
    bgColor: 'bg-black',
    textColor: 'text-black',
    selectedColor: 'ring-black',
    value: 'black',
    hex: '#000000',
    rgb: 'rgb(0, 0, 0)',
  },
  {
    name: 'White',
    bgColor: 'bg-white',
    textColor: 'text-white',
    selectedColor: 'ring-black',
    value: 'white',
    hex: '#ffffff',
    rgb: 'rgb(255, 255, 255)',
  },
  {
    name: 'Transparent',
    bgColor: 'bg-transparent',
    textColor: 'text-black',
    selectedColor: 'ring-black',
    value: 'transparent',
    hex: 'transparent',
    rgb: 'rgba(0, 0, 0, 0)',
  },
];

export const pickerColors = [
  {
    label: 'Black',
    color: '#000000',
    rgb: 'rgb(0, 0, 0)',
  },
  {
    label: 'Dark gray',
    color: '#545454',
    rgb: 'rgb(84, 84, 84)',
  },
  {
    label: 'Gray',
    color: '#737373',
    rgb: 'rgb(115, 115, 115)',
  },
  {
    label: 'Light Gray',
    color: '#a6a6a6',
    rgb: 'rgb(166, 166, 166)',
  },
  {
    label: 'Lighter Gray',
    color: '#d9d9d9',
    rgb: 'rgb(217, 217, 217)',
  },
  {
    label: 'White',
    color: '#ffffff',
    rgb: 'rgb(255, 255, 255)',
  },
  {
    label: 'Bright Red',
    color: '#ff3131',
    rgb: 'rgb(255, 49, 49)',
  },
  {
    label: 'Coral Red',
    color: '#ff5757',
    rgb: 'rgb(255, 87, 87)',
  },
  {
    label: 'Pink',
    color: '#ff66c4',
    rgb: 'rgb(255, 102, 196)',
  },
  {
    label: 'Magenta',
    color: '#cb6ce6',
    rgb: 'rgb(203, 108, 230)',
  },
  {
    label: 'Purple',
    color: '#8c52ff',
    rgb: 'rgb(140, 82, 255)',
  },
  {
    label: 'Violet',
    color: '#5e17eb',
    rgb: 'rgb(94, 23, 235)',
  },
  {
    label: 'Dark Turquoise',
    color: '#0097b2',
    rgb: 'rgb(0, 151, 178)',
  },
  {
    label: 'Aqua Blue',
    color: '#0cc0df',
    rgb: 'rgb(12, 192, 223)',
  },
  {
    label: 'Turquoise Blue',
    color: '#5ce1e6',
    rgb: 'rgb(92, 225, 230)',
  },
  {
    label: 'Light Blue',
    color: '#38b6ff',
    rgb: 'rgb(56, 182, 255)',
  },
  {
    label: 'Royal Blue',
    color: '#5271ff',
    rgb: 'rgb(82, 113, 255)',
  },
  {
    label: 'Cobalt Blue',
    color: '#004aad',
    rgb: 'rgb(0, 74, 173)',
  },
  {
    label: 'Green',
    color: '#00bf63',
    rgb: 'rgb(0, 191, 99)',
  },
  {
    label: 'Grass Green',
    color: '#7ed957',
    rgb: 'rgb(126, 217, 87)',
  },
  {
    label: 'Lime',
    color: '#c1ff72',
    rgb: 'rgb(193, 255, 114)',
  },
  {
    label: 'Yellow',
    color: '#ffde59',
    rgb: 'rgb(255, 222, 89)',
  },
  {
    label: 'Peach',
    color: '#ffbd59',
    rgb: 'rgb(255, 189, 89)',
  },
  {
    label: 'Orange',
    color: '#ff914d',
    rgb: 'rgb(255, 145, 77)',
  },
];

// Convert HSV to Hex
export const hsvToHex = (h: number, s: number, v: number): string => {
  const h1 = h / 360;
  const s1 = s / 100;
  const v1 = v / 100;

  let r, g, b;

  const i = Math.floor(h1 * 6);
  const f = h1 * 6 - i;
  const p = v1 * (1 - s1);
  const q = v1 * (1 - f * s1);
  const t = v1 * (1 - (1 - f) * s1);

  switch (i % 6) {
    case 0:
      r = v1;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v1;
      b = p;
      break;
    case 2:
      r = p;
      g = v1;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v1;
      break;
    case 4:
      r = t;
      g = p;
      b = v1;
      break;
    case 5:
      r = v1;
      g = p;
      b = q;
      break;
    default:
      r = 0;
      g = 0;
      b = 0;
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

// Convert Hex to HSV
export const hexToHsv = (hex: string): { h: number; s: number; v: number } => {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Convert to RGB
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16) / 255;
    g = parseInt(hex[1] + hex[1], 16) / 255;
    b = parseInt(hex[2] + hex[2], 16) / 255;
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16) / 255;
    g = parseInt(hex.substring(2, 4), 16) / 255;
    b = parseInt(hex.substring(4, 6), 16) / 255;
  }

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
};

// Check if a string is a valid hex color
export const isValidHex = (hex: string): boolean => {
  return /^#?([0-9A-F]{3}){1,2}$/i.test(hex);
};

// Normalize hex value (ensure it has # and is 6 digits)
export const normalizeHex = (hex: string): string => {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }
  return `#${hex.toUpperCase()}`;
};

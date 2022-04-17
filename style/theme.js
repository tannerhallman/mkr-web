import { extendTheme } from '@chakra-ui/react';

import colors from '../style/colors';

const components = {
  AccordionButton: {
    baseStyle: {
      _focus: {
        boxShadow: 'none'
      }
    }
  },
  Button: {
    baseStyle: {
      color: 'white',
      _focus: {
        boxShadow: 'none'
      }
    }
  },
  Drawer: {
    variants: {
      product: {
        parts: ['dialog, dialogContainer'],
        dialog: {
          pointerEvents: 'auto'
        },
        dialogContainer: {
          pointerEvents: 'none'
        }
      }
    }
  },
  Heading: {
    variants: {
      h1: {
        color: 'white',
        fontSize: ['32px', '40px', '48px', '56px'],
        fontWeight: 'normal'
      },
      'h2.bold': {
        color: 'white',
        fontSize: ['32px', '32px', '40px', '48px'],
        fontWeight: 'bold',
        lineHeight: 'normal'
      },
      h2: {
        color: 'white',
        fontSize: ['32px', '32px', '40px', '48px'],
        fontWeight: [500, 500, 200, 200],
        fontStyle: 'italic',
        lineHeight: 'normal'
      },
      h4: {
        color: 'white',
        fontSize: ['24px', '24px', '32px', '40px'],
        fontWeight: [500, 500, 200, 200],
        fontStyle: 'italic'
      },
      'h4.bold': {
        color: 'white',
        fontSize: ['24px', '24px', '32px', '40px'],
        fontWeight: 'bold'
      },
      h5: {
        color: 'white',
        fontSize: ['16px', '16px', '24px', '32px'],
        fontWeight: 'normal'
      },
      'h5.bold': {
        color: 'white',
        fontSize: ['16px', '16px', '24px', '32px'],
        fontWeight: 'bold'
      },
      'h5.footer': {
        color: 'white',
        fontSize: '36px',
        lineHeight: '48px'
      },
      subHeader: {
        color: 'white',
        fontSize: ['24px', '24px', '30px'],
        fontWeight: 'normal',
        lineHeight: 'normal'
      },
      'subHeader.bold': {
        color: 'white',
        fontSize: ['24px', '24px', '30px'],
        fontWeight: 'bold',
        lineHeight: 'normal'
      },
      h6: {
        color: 'white',
        fontSize: ['24px', '24px', '30px'],
        fontWeight: 'normal'
      },
      quote: {
        color: 'white',
        fontSize: ['24px', '24px', '32px', '32px'],
        fontStyle: 'italic',
        fontWeight: 200
      }
    }
  },
  Link: {
    baseStyle: {
      color: 'white',
      textTransform: 'uppercase',
      fontSize: '16px',
      whiteSpace: 'nowrap',
      _focus: {
        boxShadow: 'none'
      }
    },
    variants: {
      default: {
        textTransform: 'normal',
        fontSize: ['14px', '16px', '18px', '18px']
      },
      footer: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: '18px',
        lineHeight: '48px'
      }
    }
  },
  Text: {
    baseStyle: {
      color: 'white',
      fontSize: ['14px', '16px', '18px', '18px'],
      lineHeight: 'auto'
    },
    variants: {
      default: {
        color: 'white',
        fontSize: ['14px', '16px', '18px', '18px'],
        lineHeight: 'auto'
      },
      bold: {
        color: 'white',
        fontSize: ['14px', '16px', '18px', '18px'],
        fontWeight: 'bold',
        lineHeight: 'auto'
      },
      'bold.normal': {
        color: 'white',
        fontSize: ['14px', '16px', '18px', '18px'],
        fontWeight: 'bold',
        lineHeight: 'auto',
        textTransform: 'initial'
      },
      uppercase: {
        color: 'white',
        fontSize: ['14px', '16px', '18px', '18px'],
        lineHeight: 'auto',
        textTransform: 'uppercase',
        fontWeight: 'bold'
      }
    }
  },
  Select: {
    baseStyle: {
      color: 'white'
    }
  }
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const fonts = {
  heading: 'Montserrat, sans-serif',
  body: 'Montserrat, sans-serif'
};

const styles = {
  global: {
    body: {
      bg: 'transparent'
    },
    html: {
      bg: '#171923'
    }
  }
};

const theme = extendTheme({
  components,
  config,
  colors,
  fonts,
  styles
});

export default theme;

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    initialColorMode: 'light',
    useSystemColorMode: false,
    colors: {
        brand: {
            100: '#ecf0f1',
            // ...samo je 900 stavljen za sad
            900: '#34495e',
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'bold',
            },

            sizes: {
                xl: {
                    h: '56px',
                    fontSize: 'lg',
                    px: '32px',
                },
            },

            variants: {
                'with-shadow': {
                    bg: 'red.400',
                    boxShadow: '0 0 2px 2px #efdfde',
                },

                solid: (props) => ({
                    bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
                }),
            },
        },
    },
});

export default theme;

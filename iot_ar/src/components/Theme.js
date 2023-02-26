import React from 'react';
import { extendTheme, Icon, theme } from 'native-base';
import { Keyboard, Platform } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

function onRelease()
{
    Keyboard.dismiss();
}

const colors = {    
    primary: { ...theme.colors.lightBlue },
    secondary: { ...theme.colors.fuchsia },    
    tertiary: { ...theme.colors.amber },
    lightBlue: { ...theme.colors.lightBlue, 500: '#4199DA' },
    background: '#EAEFF6'
}

const customTheme = extendTheme({ 
    colors: colors,    
    components: {
        StatusBar: {
            defaultProps: {
                backgroundColor: 'secondary.900',
                barStyle: 'light-content'
            }
        },
        Heading: {
            defaultProps: {
                size: 'md',
                fontSize: 'lg',                                
            },
            variants: {
                primary: () => ({ color: 'primary.500' }),
                secondary: () => ({ color: 'secondary.900' })
            }
        },
        Divider: {
            defaultProps: {
                marginTop: 3,
                marginBottom: 3,
                width: '100%'
            }
        },
        Button: {
            defaultProps: {
                rounded: '2xl',
            },
            variants: {
                link: (props) => ({
                    // ...props,
                    colorScheme: 'primary',
                    _text: { color: 'primary.600', textAlign: 'center' },
                })
            }
        },
        Text: {
            defaultProps: {
                color: 'dark.300'
            },
            variants: {
                key: () => {
                    return {
                        fontWeight: 'medium',
                        style: { color: 'black' }
                    }
                },
                sub: () => {
                    return {                        
                        style: { color: 'grey' }
                    }
                },
            },
        },        
        Input: {
            baseStyle: {
                height: 50,
                width: '100%',
                // padding: 5,
                fontSize: 14,                
                rounded: 'xl',
                // overflowY: 'hidden',
                borderRadius: 10
            },
            defaultProps: {
                returnKeyType: 'done'
            }
        },        
        Icon: {
            defaultProps: {
                size: 5,
                color: 'primary.600',
                as: <MCIcon />
            },            
            sizes: {
                sm: 5,
            },            
        },        
        IconButton: {
            defaultProps: {                
                _icon: { size: 6 },
                _pressed: { backgroundColor: 'transparent', opacity: 0.1 }
            }
        },
        VStack: {
            defaultProps: {
                space: 5
            }
        },
        List: {
            baseStyle: {
                borderWidth: 0,
                padding: 0,
                space: 3
            },
        },
        ListItem: {
            defaultProps: {
                width: '100%',
                _hover: { backgroundColor: 'transparent' },
                borderBottomWidth: 1,
                padding: 0
            },
            baseStyle: {
                borderBottomWidth: 1,
                padding: 0, margin: 0
            },
        },
        Box: {
            variants: {
                card: () => {
                    return { backgroundColor: 'white', 
                        rounded: 'xl', padding: 5, margin: 6, shadow: null
                    };
                },
            },
        },
        Avatar: {
            defaultProps: {
                bgColor: 'dark.300',
                alt: 'Avatar'
            }
        },
        Image: {
            defaultProps: {
                size: 'md',
                alt: 'Image'
            }
        },

        
        View: {
            defaultProps: {
                width: '100%',
                onResponderRelease: onRelease,
                onStartShouldSetReponder: true
            }
        },
        ScrollView: {
            defaultProps: {
                // contentContainerStyle: { alignItems: 'center' },
                keyboardShouldPersistTaps: 'handled',
                keyboardDismissMode: 'interactive',
                scrollIndicatorInsets: { right: 1 },
                // backgroundColor: 'background'
            },
            variants: {
                full: () => {
                    return { contentContainerStyle: { alignItems: 'center', minHeight: '100%', flexGrow: 1 } };
                },
            },
        },
        FlatList: {
            defaultProps: {
                scrollIndicatorInsets: { right: 1 },
            }
        },
        HStack: {
            defaultProps: {
                alignItems: 'center',
                space: 2
            }
        },
        KeyboardAvoidingView: {
            defaultProps: {
                behavior: Platform.OS == 'ios' ? 'padding' : 'height',
            }
        },


        // MODAL
        Modal: {
            defaultProps: {
                size: 'lg'
            }
        },
        ModalContent: {
            defaultProps: {
                bgColor: 'white'
            }
        },
        ModalCloseButton: {
            defaultProps: {
                _icon: { as: <MCIcon /> }
            }
        },
        ModalHeader: {
            defaultProps: {
                backgroundColor: 'white',
                borderBottomWidth: 0,
                alignItems: 'center',
                padding: 5
            }
        },
        ModalBody: {
            defaultProps: {
                backgroundColor: 'white',
                borderBottomWidth: 0,
                padding: 5,
            }
        },
        ModalFooter: {
            defaultProps: {
                backgroundColor: 'white',
                borderTopWidth: 0
            }
        },


        // ACCORDION                   
        Accordion: {            
            baseStyle: {
                borderWidth: 0,
                rounded: 0
            }
        },
        AccordionItem: {
        },
        AccordionSummary: {
            baseStyle: {                
                _hover: { backgroundColor: 'transparent' },
                _expanded: { 
                    color: 'black',
                    bgColor: 'transparent', 
                    _text: { color: 'black', flex: 1 }, 
                },
                _text: { flex: 1 }, 
                borderTopWidth: 0,
                borderBottomWidth: 0,
                margin: 2, padding: 2,                
            },
        },
        AccordionDetails: {
            baseStyle: {
                paddingHorizontal: 3, 
                paddingVertical: 0,
                margin: 0
            }
        },
        AccordionIcon: {
            defaultProps: {
                as: '@expo/vector-icons',
            },            
            baseStyle: {
                color: 'primary.600',
                size: 4
            },            
        },

        Checkbox: {
            defaultProps: {                
                icon: (<Icon name='check' />)
            }
        },
        Radio: {
            defaultProps: {                
                ...(Platform.OS == 'android' && { icon: (<Icon name='circle' />) })
            },
        },
        Select: {
            defaultProps: {
                dropdownIcon: (<Icon name='chevron-down' mx={3} />)
            }
        }
        
    }
});

export default customTheme;
import { StyleSheet, Dimensions, Platform } from 'react-native'


export const pflCOLORS = {
    blue: '#0043B0',
    lightGrey: '#EEEEEE',
    transparent: '#00000000',
    white: '#FFFFFF',
    black: '#000000',
    textGrey: '#818181'
}
 
export const appFont = {
    regular: 'Avenir',
    italic: 'Avenir-BookOblique',
    bold: 'Avenir-Black',
    bolItalic: 'Avenir-BlackOblique',
    semiBold: 'Avenir-Medium',
    semiBoldItalic: 'Avenir-MediumOblique'
}

export const shadow =
    Platform.OS === 'ios'
        ? {
            shadowColor: 'black',
            shadowRadius: 2,
            shadowOpacity: 0.3,
            shadowOffset: {
                width: 0,
                height: 0
            }
        }
        : {
            elevation: 1
        }

export const dynamicShadow = (
    color = 'black',
    radius = 2,
    opacity = 0.3,
    shadowWidth = 0,
    shadowHeight = 0
) =>
    Platform.OS === 'ios'
        ? {
            shadowColor: color,
            shadowRadius: radius,
            shadowOpacity: opacity,
            shadowOffset: {
                width: shadowWidth,
                height: shadowHeight
            }
        }
        : {
            shadowColor: color,
            shadowRadius: radius,
            shadowOpacity: opacity,
            elevation: 1
        }

export const globalStyles = StyleSheet.create({
    section: {
        paddingHorizontal: 20
    },
    titleBig: {
        fontFamily: appFont.regular,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 32,
        margin: 8
    },
    titleNormal: {
        fontFamily: appFont.bold,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 24,
        margin: 8
    },
    subtitle: {
        fontFamily: appFont.regular,
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 16,
        marginLeft: 22,
        marginRight: 22
    },
    description: {
        fontFamily: appFont.regular,
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16
    },
    header: {
        fontFamily: appFont.regular,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 24,
        margin: 8
    },
    subHeader: {
        fontFamily: appFont.regular,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 26,
        color: pflCOLORS.textGrey
    },
    paragraph: {
        fontFamily: appFont.regular,
        textAlign: 'left',
        fontWeight: '400',
        fontSize: 16,
        color: pflCOLORS.textGrey
    },
    greyText: {
        textAlign: 'left',
        fontWeight: '400',
        fontSize: 14,
        color: pflCOLORS.textGrey
    },
    signin: {
        position: 'absolute',
        right: 20,
        top: 56
    },
    button: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 30,
        height: 60,
        marginRight: 10,
        marginLeft: 10
    }
})

export const theme = {
    'shoutem.ui.Text': {
        '.text-center': {
            textAlign: 'center'
        },
        color: '#4d4d4d',
        fontFamily: appFont.regular,
        '.small': {
            color: 'grey',
            fontSize: 10
        },
        '.input-prompt': {
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16,
            lineHeight: 0,
            color: '#ff4120'
        },
        '.bold': {
            fontFamily: appFont.bold,
            fontWeight: '700'
        },
        '.extra-bold': {
            fontFamily: appFont.bold,
            fontWeight: '900'
        }
    },
    'shoutem.ui.Title': {
        fontFamily: appFont.bold,
        '.jumbo': {
            fontSize: 28,
            lineHeight: 0
        },
        '.text-center': {
            textAlign: 'center'
        }
    },
    'shoutem.ui.TextInput': {
        '.pfl-blue': {
            color: '#0C3AB4'
        },
        '.dark': {
            backgroundColor: 'rgba(43, 43, 43, 0.75)',
            color: 'white'
        },

        '.search': {
            borderRadius: 30,
            backgroundColor: 'rgba(0,0,0,.04)',
            paddingLeft: 50,
            paddingRight: 30
        },
        marginTop: 10,
        fontFamily: appFont.regular,
        borderRadius: 6,
        ...shadow,

        '.onboard-input': {
            color: pflCOLORS.white,
            borderBottomColor: pflCOLORS.white,
            borderBottomWidth: 0,
            backgroundColor: '#FF3A1E',
            shadowColor: pflCOLORS.black,
            shadowRadius: 0,
            shadowOpacity: 0,
            shadowOffset: {
                width: 0,
                height: 0
            },
            placeholderTextColor: pflCOLORS.white
        }
    }
}
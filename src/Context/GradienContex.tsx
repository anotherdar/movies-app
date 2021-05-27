import * as React from 'react'

interface Colors {
    primary: string,
    secondary: string
}

interface IGradientContext {
    colors: Colors;
    prevColors: Colors;
    setMainColors: (colors: Colors) => void; 
    setPrevMainColors: (colors: Colors) => void;
}

export const GradientContext = React.createContext({} as IGradientContext);


export const GradientProvider: React.FC = ({children}) => {
    const [colors, setColors] = React.useState<Colors>({
        primary: 'transparent',
        secondary: 'transparent'
    })
    const [prevColors, setPrevColors] = React.useState<Colors>({
        primary: 'transparent',
        secondary: 'transparent'
    })

    const setMainColors = ( colors: Colors ) => {
        setColors( colors );
    }

    const setPrevMainColors = ( colors: Colors ) => {
        setPrevColors( colors );
    }
    return (
        <GradientContext.Provider
            value={{
                colors,
                prevColors,
                setMainColors,
                setPrevMainColors
            }}
        >
            {children}
        </GradientContext.Provider>
    )
}
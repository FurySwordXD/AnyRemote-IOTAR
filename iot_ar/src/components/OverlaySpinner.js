import React from 'react';
import { Center, Spinner, Text } from 'native-base';

export default function OverlaySpinner({ styleProps, message, opacity })
{
    return (
        <Center position='absolute' 
            w="100%" h="100%" 
            flex={1} bgColor={`rgba(234, 239, 246, ${opacity || 0.5})`} //opacity={opacity || 0.5}
            top={0} left={0} right={0} bottom={0}
            {...styleProps} 
        >
            <Spinner size="lg" color='primary.500' />
            {message && <Text>{message}</Text>}
        </Center>
    );
}
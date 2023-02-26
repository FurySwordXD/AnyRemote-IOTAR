import React, { useEffect, useRef, useState } from 'react';
import { Text, HStack, View, IconButton, Icon, Toast, Box } from 'native-base';
import { Animated, Easing } from 'react-native';

export default function CustomToast({ id, text, status = 'info', duration = 5000 })
{
    const bgColor = {
        info: 'teal.500',
        success: 'emerald.500',
        error: 'danger.500'
    }

    const progressAnim = useRef(new Animated.Value(0)).current;
    const [width, setWidth] = useState(null);

    useEffect(() => {
        if (width)        
            Animated.timing(progressAnim, { toValue: -width, easing: Easing.linear, useNativeDriver: true, duration }).start();           
    }, [width])

    
    return (
        <View backgroundColor={bgColor[status]} rounded="md" minWidth={300} overflow='hidden' mb={5}>
        <HStack px={4} py={3} display='flex' alignItems='center' w='100%'>
            <Text flex={1} fontSize={12} color='white'>{text}</Text>
            <IconButton icon={<Icon name='close-circle-outline' color='white' />}
                onPress={()=>Toast.close(id)} 
            />
        </HStack>
        <Box bgColor={'dark.300'} h={1} p={0} m={0} onLayout={event => setWidth(event.nativeEvent.layout.width)}>
            {width && <Animated.View 
                style={{ backgroundColor: 'white', width: '100%', height: '100%',
                    transform: [{ translateX: progressAnim }]
                }} 
            ></Animated.View>}
        </Box>
        </View>
    )
}
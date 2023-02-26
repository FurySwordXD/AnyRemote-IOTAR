import React from 'react';
import { SafeAreaView, Platform } from 'react-native';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { NativeBaseProvider, Toast, Text } from 'native-base';
import customTheme from './Theme';
import CustomToast from './Toast';
import { version } from '../../package.json';

const handleError = (err) => {
	if (__DEV__)
		console.log("Request Error", err?.response || err);

	const errorMessage = err.response?.data?.message || JSON.stringify(err.response?.data);
	Toast.closeAll();
	if (errorMessage)
		Toast.show({ render: (props) => <CustomToast {...props} text={errorMessage} status='error' />, duration: 5000, placement: 'top' });
	else			
		Toast.show({ render: (props) => <CustomToast {...props} text={'Network Error'} status='error' />, duration: 5000, placement: 'top' });
}

const handleSuccess  = (response) => {	
	Toast.closeAll();
	const successMessage = response?.data?.message;
	if (successMessage)					
		Toast.show({ render: (props) => <CustomToast {...props} text={successMessage} status='success' />, duration: 5000, placement: 'top' });
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			enabled: true,			
			retry: false,			
			refetchOnMount: true,
			refetchOnWindowFocus: true,
			staleTime: 5 * 60 * 1000,
			networkMode: 'online',			
			onError: handleError,
			onSuccess: handleSuccess
		},
		mutations: {
			networkMode: 'online',
			onError: handleError,
			onSuccess: handleSuccess
		},		
	}
});

export default function CustomProvider({ children })
{
	return (
		<NativeBaseProvider theme={customTheme} 
			config={{ strictMode: 'off' }}
		>
			<QueryClientProvider client={queryClient}>				
				{children}
			</QueryClientProvider>
			<SafeAreaView style={{position: Platform.OS == 'web' ? 'fixed' : 'absolute', bottom: 0, right: 2}}>
				<Text style={{fontSize: 11}}>DEV v{version}</Text>
			</SafeAreaView>
		</NativeBaseProvider>
	)
}
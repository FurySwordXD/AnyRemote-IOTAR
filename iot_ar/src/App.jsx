import './Config';
import React, { useEffect, useRef, useState, useCallback } from "react";
import 'react-native-reanimated'
import { Button, Divider, HStack, Icon, IconButton, Image, Text, View, Heading, useDisclose } from "native-base";
import { PermissionsAndroid, StyleSheet } from 'react-native';
import OverlaySpinner from "./components/OverlaySpinner";
import CustomProvider from "./components/CustomProvider";
import WifiManager from "react-native-wifi-reborn";
import { RNCamera } from 'react-native-camera';
import { Camera, useCameraDevices, useFrameProcessor } from "react-native-vision-camera";
import { useMutation, useQuery } from "@tanstack/react-query";
import { labelImage } from "vision-camera-image-labeler";
import { useSharedValue, useAnimatedProps } from 'react-native-reanimated';
import { Label } from "./components/Label";
import axios from "axios";
import ImageEditor from "@react-native-community/image-editor";
import RNFS from 'react-native-fs';
import CameraFrameImg from './cameraFrame.png';
import * as Animatable from 'react-native-animatable';

function App()
{
	const [loading, setLoading] = useState(true);
	const [rssi, setRssi] = useState(0);
	const devices = useCameraDevices();
  	const device = devices.back;	
	const [detectedObject, setDetectedObject] = useState(__DEV__ ? {
		id: 1,
		device_info: {
			device_name: 'Device',
			actions: {
				'on': 'http',
				'off': 'http'
			},
		}
	} : null);
	const {isOpen, onOpen, onClose} = useDisclose();
	const cameraRef = useRef();
	const [controls, setControls] = useState(['a']);

	const getPermissions = async () => {		
		const cameraPermission = await Camera.getCameraPermissionStatus();		
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
				title: 'Location permission is required for WiFi connections',
				message:
					'This app needs location permission as this is required  ' +
					'to scan for wifi networks.',
				buttonNegative: 'DENY',
				buttonPositive: 'ALLOW',
			},
		);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			// You can now use react-native-wifi-reborn
			setLoading(false);
			getRSSI();
		} else {
			// Permission denied
		}
	}

	const mutation = useMutation(data => axios.post(`${global.BASE_URL}/get_registered_object`, data, {
		headers: {
			'Accept': 'application/json',			
			'Content-Type': 'multipart/form-data'
		},
	}));

	const controlMutation = useMutation(data => axios.get(data));

	const getRSSI = async () => {
		const rssi = await WifiManager.getCurrentSignalStrength();
		setRssi(rssi);
		setTimeout(getRSSI, 2000);
	}

	// const frameProcessor = useFrameProcessor((frame) => {
	// 	'worklet';		
	// 	// const labels = labelImage(frame);
	// 	// detectedObject.value = labels[0]?.label;
	// 	// console.log(labels);
	// 	const imageAsBase64 = frameToBase64(frame);
	// 	console.log(imageAsBase64);
	// }, []);

	useEffect(() => {
		getPermissions();
	}, []);

	useEffect(() => {
		if (detectedObject)
			onOpen();
	}, [detectedObject])

	const captureFrame = async () => {				

		// const image = await cameraRef.current.takeSnapshot({
		// 	// flash: 'off',
		// 	quality: 50,
  		// 	skipMetadata: true,
		// });		
		
		const image = await cameraRef.current.takePictureAsync({
			quality: 1,			
		});
		console.log(image);
		
		const size = Math.min(image.width * .6, image.height * .6);
        const cropData = {
            offset: {x: image.width/2 - size/2, y: image.height/2 - size/2},
            size: {width: size, height: size},
            resizeMode: 'stretch',
        };
		const croppedImageUri = await ImageEditor.cropImage(image.uri, cropData);
		// const base64img = await RNFS.readFile(croppedImageUri, 'base64');
		
		console.log(croppedImageUri);
		const frame = {
			uri: croppedImageUri,
			type: 'image/jpg',
			name: 'frame.jpg',
		};
		
		var body = new FormData();		
		body.append('frame', frame);
		body.append('rssi', rssi);
		const response = await mutation.mutateAsync(body);
		console.log(response.data);	
		if (response.data?.device_data)	
			setDetectedObject(response.data?.device_data);

		// captureFrame();		
	}

	if (loading || !device)
		return <OverlaySpinner />;

	return (		
		<View flex={1} alignItems='center'>			
			<View flex={1}>
				<RNCamera 
					ref={cameraRef}
					autoFocus="on"
					style={StyleSheet.absoluteFill}
				/>
				{/* <Camera
					ref={cameraRef}
					style={StyleSheet.absoluteFill}
					device={device}
					isActive={true}
					// frameProcessor={frameProcessor}
					// frameProcessorFps={1}
				/> */}
			</View>
			<View style={StyleSheet.absoluteFill}>

				<View flex={1} alignItems='center' justifyContent='center'>
					<View w={200} h={200} alignItems='center'>
						<Text position='absolute' top={-50} color='white' fontSize={16}>RSSI: {rssi}</Text>
						<Image source={CameraFrameImg} w={200} h={200} />
					</View>
				</View>

				<View>
					<View position='absolute' p={5} top={-150} alignItems='center'>
						<Animatable.View animation={isOpen ? 'zoomInDown' : 'zoomOut'}>
						<Animatable.View animation={isOpen ? 'fadeInUp' : 'fadeOutDown'}>
							{detectedObject && <>
							<View>
								<HStack>									
									<Heading flex={1} color='white' textAlign='center'>{detectedObject.device_info.device_name}</Heading>	
									<IconButton position='absolute' right={2} icon={<Icon name='close' color='white' size={5} />} p={0} m={0} 
										onPress={onClose}
									/>
								</HStack>								
								<Divider borderColor='white' w={200}  />
							</View>
							<HStack justifyContent='center' space={5}>
								{Object.keys(detectedObject.device_info.actions).map(actionKey => (
									<Button key={actionKey} minW={75} onPress={()=>controlMutation.mutate(detectedObject.device_info.actions[actionKey])}>
										{actionKey.toTitleCase()}
									</Button>
								))}
							</HStack>			
							</>}
						</Animatable.View>
						</Animatable.View>
					</View>
					
					<View alignItems='center' my={5}>
						<Button p={5} bgColor='white' rounded='full' startIcon={<Icon name='camera-iris' size={7} color='black' />} onPress={captureFrame}></Button>
					</View>
				</View>
			</View>			
		</View>		
	);
}

export default function AppContainer()
{
	return (
		<CustomProvider>
			<App />
		</CustomProvider>
	);
}
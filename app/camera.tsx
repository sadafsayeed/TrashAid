import { TouchableOpacity, View, Text, Button, Image, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import { CameraView, CameraType, useCameraPermissions, Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { Buffer } from 'buffer';
import {useRouter} from "expo-router";


export default function OpenCamera() {
    const router = useRouter();
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>("back");
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const cameraRef = useRef<Camera | null>(null);

    function base64ToBlob(base64: string, type = 'application/pdf') {
        const binary = Buffer.from(base64, 'base64');
        const blob = new Blob([binary], { type });
        return blob;
      }

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission]);

    if (!permission) return <View />;
    if (!permission.granted) return <Text>Permission was not granted</Text>;

    const toggleCameraFacing = () => {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    };

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({quality:0.9});
            setPhotoUri(photo.uri);
        }
    };

    const sendImageToBackend = async(uri: string | null) =>{
        if (!uri) {
            console.warn("No photo URI to upload.");
            return;
        }
    
        const formData = new FormData();
        formData.append('file', {
            uri,
            name: "garbage.jpg",
            type: "image/jpeg",
        } as any); 
    
        try {
            const response = await fetch("https://119d-131-247-226-109.ngrok-free.app/", {
                method: "POST",
                body: formData,
            });
    
            const result = await response.json();
            console.log("Upload result:", result);
            router.push('/dashboard');
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };

    const retakePhoto = () => {
        setPhotoUri(null);
    };

    const submitPressed = ()=>{
        sendImageToBackend(photoUri);
    }

    if (photoUri) {
        return (
            <View style={styles.previewContainer}>
                <Image source={{ uri: photoUri }} style={styles.previewImage} />
                <View style={styles.controls}>
                    <Button title="Retake Photo" onPress={retakePhoto} />
                    <Button title="Submit" onPress={submitPressed}/>
                </View>
            </View>
        );
    }

    return (
        <CameraView style={{ flex: 1 }} facing={facing} ref={cameraRef}>
            <View style={styles.controls}>
                <TouchableOpacity onPress={toggleCameraFacing}>
                    <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={takePhoto}>
                    <Text style={styles.text}>Capture</Text>
                </TouchableOpacity>
            </View>
        </CameraView>
    );
}

const styles = StyleSheet.create({
    controls: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        color: 'white',
        fontSize: 18,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 8,
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    previewImage: {
        width: '100%',
        height: '80%',
        resizeMode: 'contain',
    },
});

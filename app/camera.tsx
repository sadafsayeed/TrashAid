import { TouchableOpacity, View, Text, Button, Image, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import { CameraView, CameraType, useCameraPermissions, Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";

export default function OpenCamera() {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>("back");
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const cameraRef = useRef<Camera | null>(null);

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
            const photo = await cameraRef.current.takePictureAsync();
            setPhotoUri(photo.uri);
            // sendImageToBackend(photo.uri);
        }
    };

    // const sendImageToBackend = async(uri:string) =>{
    //     const formData.append('file',{
    //         uri,
    //         name: "garbage.jpg",
    //         type:
    //     })
    // }

    const retakePhoto = () => {
        setPhotoUri(null);
    };

    if (photoUri) {
        return (
            <View style={styles.previewContainer}>
                <Image source={{ uri: photoUri }} style={styles.previewImage} />
                <Button title="Retake Photo" onPress={retakePhoto} />
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

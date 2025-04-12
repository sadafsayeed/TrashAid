import {TouchableOpacity, View, Text} from "react-native";
import {useState, useEffect} from "react";
import {CameraView, CameraType, useCameraPermissions} from "expo-camera";
export default function openCamera(){
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>("back");

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission]);

    if(!permission){
        return <View/>;
    }

    if(!permission.granted){
        return(
            <Text>
                Permission was not granted
            </Text>
        )
    }

    function toggleCameraFacing(){
        setFacing(current=>(current==='back'?'front':'back'));
    }
    return(
        <CameraView style={{flex:1}} facing={facing}>
            <TouchableOpacity style={{flex: 1, alignSelf: 'flex-end', alignItems: 'center'}} onPress={toggleCameraFacing}>
                <Text>Flip Camera</Text>
            </TouchableOpacity>
        </CameraView>
    )
}
// ScanQR.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as FileSystem from 'expo-file-system';

const ScanQR = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      // Create the 'scannedBarcodes' folder
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + 'scannedBarcodes',
        { intermediates: true }
      ).catch((error) => {
        console.error('Error creating directory:', error);
      });

      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    initializeApp();
  }, []);
  
  const CustomButton = ({ onPressIn = () => {}, onPressOut = () => {}, title }) => {
    return (
      <TouchableOpacity
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{
          backgroundColor: '#3498db',
          padding: 10,
          margin: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'white' }}>{title}</Text>
      </TouchableOpacity>
    );
  };  

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setShowCamera(false);

    // Use the QR code data as the filename (remove invalid characters)
    const sanitizedData = data.replace(/[^\w]/g, '_');
    const fileName = `${sanitizedData}_${Date.now()}.txt`;
    const filePath = FileSystem.documentDirectory + 'scannedBarcodes/' + fileName;

    try {
      await FileSystem.writeAsStringAsync(filePath, data);
      alert(`Bar code with type ${type} and ${data} has been scanned and saved!`);
    } catch (error) {
      console.error('Error saving barcode data:', error);
      alert('Error saving barcode data. Please try again.');
    }
  };

  const requestCameraPermission = async () => {
    setShowCamera(true);
    setScanned(false);
  };
  const navigateToGenScreen = () => {
    navigation.navigate('Gen'); // Navigate to the Gen screen
  };


  if (!showCamera) {
    return (
      <View style={styles.container}>
        <CustomButton title="Scan a QR code" onPressOut={requestCameraPermission} />
        <CustomButton title="Generate QR code" onPressOut={navigateToGenScreen}/>
      </View>
    );
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScanQR;

// GenScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const GenScreen = () => {
    const [textInputValue1, setTextInputValue1] = useState('');
  const [textInputValue2, setTextInputValue2] = useState('');
  const [generatedQRCode, setGeneratedQRCode] = useState(null);

  const handleInputChange1 = (text) => {
    setTextInputValue1(text);
  };

  const handleInputChange2 = (text) => {
    setTextInputValue2(text);
  };

  const handleGenerateQRCode = () => {
    // Combine both input values into a single string
    const combinedInput = `${textInputValue1} ${textInputValue2}`;
    setGeneratedQRCode(combinedInput);
  };


    return (
        <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
        placeholder="Input data 1"
        onChangeText={handleInputChange1}
        value={textInputValue1}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
        placeholder="Input data 2"
        onChangeText={handleInputChange2}
        value={textInputValue2}
      />
      <Button title="Generate QR Code" onPress={handleGenerateQRCode} />

      {generatedQRCode && (
        <View>
          <QRCode value={generatedQRCode} size={200} />
        </View>
      )}
    </View>
    );
  };
export default GenScreen;
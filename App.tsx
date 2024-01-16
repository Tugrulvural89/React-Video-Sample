import React, {useState} from 'react';
import {View, Button} from 'react-native';
import Video from 'react-native-video';
import DocumentPicker from 'react-native-document-picker';

const App = () => {
  const [videoUri, setVideoUri] = useState<string | null>(null);

  const pickVideo = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      // Access the first document's URI
      if (res.length > 0) {
        const uri = res[0].uri;
        setVideoUri(uri);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled video picker');
      } else {
        console.error('DocumentPicker Error: ', err);
      }
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Upload Video" onPress={pickVideo} />
      {videoUri && (
        <Video
          source={{uri: videoUri}}
          style={{width: 300, height: 300}}
          controls={true}
        />
      )}
    </View>
  );
};

export default App;

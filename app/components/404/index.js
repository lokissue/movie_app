import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const NotFound = ({text}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Icon name="ios-cloud-offline-outline" color="#000" size={40} />
      <Text style={{fontSize: 24}}>{text || 'Not Found'}</Text>
    </View>
  );
};

export default NotFound;

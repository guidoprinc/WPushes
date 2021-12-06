import { StyleSheet } from 'react-native';
import { green, white } from '@constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: green,
    padding: 15,
    borderRadius: 8
  },
  buttonText: {
    color: white,
    fontWeight: 'bold',
    fontSize: 20
  }
});

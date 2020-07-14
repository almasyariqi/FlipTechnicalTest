import { createStackNavigator } from 'react-navigation-stack'
import TransactionListScreen from '../screens/TransactionListScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';

export default StackNavigation = createStackNavigator(
  {
    TransactionList: {
      screen: TransactionListScreen,
      navigationOptions: {
        headerShown:  false
      }
    },
    TransactionDetail: {
      screen: TransactionDetailScreen,
      navigationOptions: {
        headerShown:  false
      }
    }
  }
)
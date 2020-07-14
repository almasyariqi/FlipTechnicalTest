import { createSwitchNavigator, createAppContainer } from "react-navigation";
import StackNavigation from "./StackNavigation";

const AppNavigator = createSwitchNavigator(
  {
    App: {
      screen: StackNavigation,
      path: ''
    }
  },
  {
    initialRouteName: 'App'
  }
)

export default createAppContainer(AppNavigator)
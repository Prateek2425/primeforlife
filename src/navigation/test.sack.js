const TestStack = createStackNavigator()
const TestStackNavigator = () => {
  return (
    <TestStack.Navigator initialRouteName="NewTestModal">
      <TestStack.Screen
        name="[TestNavigator] NewTestModal"
        component={NewTestScreen}
      />

      <TestStack.Screen
        name="[TestNavigator] NewSitTestModal"
        component={NewSitTestModalScreen}
      />``
    </TestStack.Navigator>
  )
}
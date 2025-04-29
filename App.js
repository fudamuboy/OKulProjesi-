import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabBottoms from './TabBottoms';
import YonetCourses from './screens/YonetCourses';
import CoursesContextProvider from './store/coursesContext';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CoursesContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="TabBottoms" component={TabBottoms}
            options={{ headerShown: false }} />
          <Stack.Screen name="YonetCourses" component={YonetCourses} />
        </Stack.Navigator>
      </NavigationContainer>
    </CoursesContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

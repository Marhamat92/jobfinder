import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Jobs from './pages/Jobs/Jobs';
import FavoriteJobs from './pages/FavoriteJobs/FavoriteJobs';
import tw from 'twrnc';
import JobDetails from './pages/JobDetails/JobDetails';
import useFetchData from './hooks/fetchData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import UserProvider from './context/provider.js';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Router({navigation, route}) {
  const {data, loading, error} = useFetchData('https://www.themuse.com/api/public/jobs?page=10');



  function JobsStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Jobs" component={Jobs} 
        options={({
          
          headerTintColor: '#rgb(239,83,80)',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#rgb(239,83,80)',
          },

        })}
        />
    
        <Stack.Screen name="JobDetails" component={JobDetails} 
        options={({
          
          headerTintColor: '#rgb(239,83,80)',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#rgb(239,83,80)',
          },

        })}
        />
      </Stack.Navigator>
     
    );
  }

  return (
    <UserProvider>
    <NavigationContainer>
       <Tab.Navigator>
        <Tab.Screen
       
          name="JobsTab"
          
          component={JobsStack}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="work" color={color} size={size} />
            ),
            tabBarActiveTintColor:'#rgb(239,83,80)',
            tabBarLabel: 'Jobs',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
            },
         
          }}
        />
        <Tab.Screen
          name="FavoriteJobs"
          component={FavoriteJobs}
          options={{
            tabBarIcon: ({color, size}) => (
              <Fontisto name="heart" color={color} size={size} />
            ),
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
            },
            tabBarActiveTintColor:'#rgb(239,83,80)',
            headerTitle: 'Favorite Jobs',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: '#rgb(239,83,80)',
            },
          }}
        />
        
      </Tab.Navigator>

     
    </NavigationContainer>
    </UserProvider>
  );
}


export default Router;

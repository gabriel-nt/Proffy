import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Favorites from '../pages/Favorites';
import TeacherList from '../pages/TeacherList';

const { Navigator, Screen } = createBottomTabNavigator();

interface IconProps {
    color: string,
    size: number,
    focused: string
}

function StudyTabs() {
    return (
        <Navigator 
            tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 64
                },
                tabStyle: {
                    flexDirection: 'row',
                    alignItem: 'center',
                    justifyContent: 'center'
                },
                iconStyle: {
                    flex:0,
                    width: 20,
                    height: 20
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16
                },
                inactiveBackgroundColor: '#fafafc',
                activeBackgroundColor: '#ebebf5',
                inactiveTintColor: '#c1bccc',
                activeTintColor: '#32264d'
            }}
        >
            <Screen 
                name="TeacherList" 
                component={TeacherList}
                options={{
                    tabBarLabel: 'Proffys',
                    tabBarIcon: ({ color, size, focused }:IconProps) => {
                        return (
                            <Ionicons name="ios-easel" color={focused ? '#8257e5' : color} size={size}/>
                        )
                    }
                }}
            />
            <Screen 
                name="Favorites" 
                component={Favorites}
                options={{
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({color, size, focused}:IconProps) => {
                        return (
                            <Ionicons name="ios-heart" color={focused ? '#8257e5' : color} size={size}/>
                        )
                    }
                }}
            />
        </Navigator>
    )
}

export default StudyTabs;
import React from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/color';

const CustomHeaderButton = props => {
    return <HeaderButton 
    {...props}
    IconComponent={Ionicons}
    iconSize={23}
    color={Platform.OS === 'android' ? 'white' : 'white'}
    />
};

const styles = StyleSheet.create({

});

export default CustomHeaderButton;
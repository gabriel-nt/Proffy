import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import landingImage from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import styles from './styles';
import api from '../../services/api';

function Landing() {
    const navigation = useNavigation();
    const [totalConnections, setTotalConnections] = useState([0]);

    useEffect(() => {
        api.get('connections').then(response => {
            setTotalConnections(response.data.total) 
        });
    }, []);

    function handleNavigateToGiveClassesPages() {
        navigation.navigate('GiveClasses');
    }

    function handleNavigateToStudyPages() {
        navigation.navigate('Study');
    }

    return (
        <View style={styles.container}>
            <Image source={landingImage} style={styles.banner}/>

            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton 
                    onPress={handleNavigateToStudyPages}
                    style={[styles.button, styles.buttonPrimary]}
                >
                    <Image source={studyIcon}/>

                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton 
                    onPress={handleNavigateToGiveClassesPages}
                    style={[styles.button, styles.buttonSecondary]}
                >
                    <Image source={giveClassesIcon}/>

                    <Text style={styles.buttonText}>Dar Aulas</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas {' '}
                <Image source={heartIcon} />
            </Text>
            
        </View>
    )
}

export default Landing;
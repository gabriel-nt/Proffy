import React, { useState } from 'react';
import { View, Image, Text, Linking, AsyncStorage } from 'react-native';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import api from '../../services/api';

export interface Teacher {
    name: string,
    avatar: string,
    bio: string,
    cost: number,
    id: number,
    subject: string,
    whatsapp: string
}

interface TeacherItemProps {
    teacher: Teacher,
    favorited: boolean
}

const TeacherItem:React.FC <TeacherItemProps> = ({teacher, favorited}) => {
    const [isFavorited, setIsFavorited] = useState(favorited);

    function handleLinkToWhastapp() {
        api.post('connections', {
            user_id: teacher.id
        });
        
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}&text=Tenho interesse sobre a coleta de resíduos`);
    }

    async function handleToogleFavorite() {
        let favoritesArray = [];
        const favorites = await AsyncStorage.getItem('favorites');

        if (favorites) {
            favoritesArray = JSON.parse(favorites);
        }

        if (isFavorited) {
            const favoriteIndex = favoritesArray.findIndex((teacherItem:Teacher) => {
                return teacherItem.id === teacher.id
            });
            favoritesArray.splice(favoriteIndex, 1);

            setIsFavorited(false);
        } else {
            favoritesArray.push(teacher);
            setIsFavorited(true);
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{uri: teacher.avatar }} 
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'  '}
                    <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton 
                        onPress={handleToogleFavorite}
                        style={[styles.favoriteButton, isFavorited ? styles.favorited: {}]}
                    >
                        {isFavorited ? <Image source={unfavoriteIcon}/> : <Image source={heartOutlineIcon}/>}
                    </RectButton>

                    <RectButton style={styles.contactButton} onPress={handleLinkToWhastapp}>
                        <Image source={whatsappIcon}/>
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem;
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import logoImg from '../../assets/images/logo.svg';
import logoDarkImg from '../../assets/images/logo-dark.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.ts';
import api from '../../services/api';
import { LandingContent, LogoContainer, ButtonsContainer, Button, TotalConnections } from './styles';

function Landing() {
    const { title } = useContext(ThemeContext);
    const [totalConnections, setTotalConnections] = useState([0]);

    useEffect(() => {
        api.get('connections').then(response => {
            setTotalConnections(response.data.total) 
        });
    }, []);

    return (
        <LandingContent id="page-landing">
            <div className="container" id="grid-container">
                <LogoContainer className="logo-container">
                    { 
                        title === 'light' 
                        ?
                        <img src={logoDarkImg} alt="Proffy"/>
                        :
                        <img src={logoImg} alt="Proffy"/>
                    }
                    <h2>Sua plataforma de estudos online</h2>
                </LogoContainer>
                
                <img src={landingImg} 
                    alt="Plataforma de Estudos" 
                    className="hero-image"
                />

                <ButtonsContainer className="buttons-container">
                    <Button to="/study" className="study button">
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Button>
                    <Button to="give-classes" className="give-classes button">
                        <img src={giveClassesIcon} alt="Dar Aulas"/>
                        Dar Aulas
                    </Button>
                </ButtonsContainer>

                <TotalConnections className="total-connections ">
                    Total de {totalConnections} conexões já realizadas
                    <img src={purpleHeartIcon} alt="Coração Rozo"/>
                </TotalConnections>
            </div>
        </LandingContent>
    )
}

export default Landing;
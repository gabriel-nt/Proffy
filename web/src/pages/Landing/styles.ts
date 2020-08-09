import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LandingContent = styled("div")`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    //background: ${(props) => props.theme.colors.primary};
    //background-color: var(--color-primary);

    .hero-image {
        width: 100%; 
    }

    @media (min-width: 1100px) {
        .container {
            max-width: 1100px;
            display: grid;
            grid-template-rows: 350px 1fr;
            grid-template-columns: 2fr 1fr 1fr;
            grid-template-areas: 
                "logo hero hero"
                "buttons buttons total"
            ;

            .hero-image {
                grid-area: hero;
                justify-self: end;
            }
        }
    }
    
    
`;
export const LogoContainer = styled("div")
`
    text-align: center;
    margin-bottom: 3.2rem;

    img {
        height: 10rem;
    }

    h2 {
        font-weight: 500;
        font-size: 2.4rem;
        line-height: 4.6rem;
        margin-top: 0.8rem;
        color: ${(props) => props.theme.colors.subtext};
    }

    @media (min-width: 1100px) {
        grid-area: logo;
        align-self: center;
        margin: 0;
        width: 60%;
        text-align: left;

        h2 {
            text-align: initial;
            font-size: 3.6rem;
        }
        
        img {
            height: 100%;
        }
    }
`;

export const ButtonsContainer = styled("div")`
    display: flex;
    justify-content: center;
    margin: 3.2rem 0;
    
    .button:first-child {
        margin-right: 1.6rem;
    }

    img {
        width: 4rem;
        margin-right: 2.4rem;
    }

    .study {
        background-color: var(--color-primary-lighter);
        //background: ${(props) => props.theme.colors.button};
    }
    .give-classes {
        background-color: var(--color-secundary);
        //background: ${(props) => props.theme.colors.primary};
    }
    .study:hover {
        background-color: var(--color-primary-light);
    }
    .give-classes:hover {
        background-color: var(--color-secundary-dark);
    }
    
    transition: background-color 0.2s;
`;

export const Button = styled(Link)`
    width: 18rem;
    height: 10.4rem;
    border-radius: 0.8rem;
    font: 700 2rem Archivo;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: ${(props) => props.theme.colors.title};
    padding-right: 2rem;

    span {
        width: 65%;
        margin-left: 1.8rem;
    }

    img {
        width: 4rem;
        margin-right: 2.4rem;
    }

    @media(min-width:1100px) {
        font-size: 2.4rem;
        width: 30rem;
    }
`;

export const TotalConnections = styled("span")`
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.colors.subtext};

    img {
        margin-left: 0.8rem;
    }
    
    @media(min-width: 1100px) {
        grid-area: total;
        justify-self: end;
    }
`;

import React from 'react';

import './styles.css'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

export interface Teacher {
    name: string,
    avatar: string,
    bio: string,
    cost: number,
    id: number,
    subject: string,
    whastapp: string
}

interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem:React.FC<TeacherItemProps> = ({teacher}) => {

    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id
        });
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name}/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>

            <footer>
                <p>
                    Preço/Hora
                    <strong>R${teacher.cost}</strong>
                </p>
                <a 
                    href={`https://wa.me/${teacher.whastapp}`} 
                    type="button"
                    onClick={createNewConnection}
                >
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem;
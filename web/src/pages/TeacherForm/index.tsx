import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import './styles.css';
import trashIcon from '../../assets/images/icons/trash.svg';
import warningIcon from '../../assets/images/icons/warning.svg'
import api from '../../services/api';

interface Props {
	toggleTheme(): void;
}

const TeacherForm:React.FC<Props> = ({ toggleTheme }) => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhastapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        {week_day: 0, to: '', from: ''}
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {week_day: 0, to: '', from: ''}
        ]);
    }

    function handleRemoveScheduleItem(position:Number) {
        if (scheduleItems.length > 1) {
            const updateScheduleItem = scheduleItems.filter((scheduleItem, index) => {
                return index !== position;
            });

            console.log(updateScheduleItem);
        
            setScheduleItems(updateScheduleItem);
        }
    }

    function setScheduleItemValue(position:number, field:string, value:string) {
        const updateScheduleItem = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        console.log(updateScheduleItem);

        setScheduleItems(updateScheduleItem);
    }

    function handleCreateClass(e:FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems        
        }).then(response => {
            history.push('/');
            console.log('Cadastrado com sucesso');
        });
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                toggleTheme={toggleTheme}
                title="Que incrível que você quer dar aulas"
                description="O primeiro passo é preencher esse formulário de descrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input 
                            name="name" 
                            label="Nome Completo" 
                            value={name} 
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar} 
                            onChange={(e) => {
                                setAvatar(e.target.value);
                            }}
                        />
                        <Input 
                            name="whatsapp" 
                            label="Whatsapp"
                            value={whatsapp} 
                            onChange={(e) => {
                                setWhastapp(e.target.value);
                            }}
                        />
                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio} 
                            onChange={(e) => {
                                setBio(e.target.value);
                            }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select 
                            value={subject}
                            name="subject" 
                            label="Matéria"
                            onChange={(e) => {
                                setSubject(e.target.value);
                            }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Programação', label: 'Programação' },
                                { value: 'História', label: 'História' },
                                { value: 'Geográfia', label: 'Geográfia' },
                                { value: 'Educ.Física', label: 'Educ.Física' }
                            ]}
                        />
                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula"
                            value={cost} 
                            onChange={(e) => {
                                setCost(e.target.value);
                            }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários Disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo Horário
                            </button>
                        </legend>
                        
                        {scheduleItems.map((scheduleItem, index) => (
                            <div key={index} className="schedule-item">
                                <Select 
                                    name="week_day" 
                                    value={scheduleItem.week_day}
                                    label="Dia da Semana"
                                    onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value)}
                                    options={[
                                        { value: '0', label: 'Domingo' },
                                        { value: '1', label: 'Segunda-feira' },
                                        { value: '2', label: 'Terça-feira' },
                                        { value: '3', label: 'Quarta-feira' },
                                        { value: '4', label: 'Quinta-feira' },
                                        { value: '5', label: 'Sexta-feira' },
                                        { value: '6', label: 'Sábado' }
                                    ]}
                                />

                                <Input 
                                    name="from" 
                                    label="Das" 
                                    type="time"
                                    value={scheduleItem.from}
                                    onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)}
                                />
                                <Input 
                                    name="to" 
                                    label="Até" 
                                    type="time"
                                    value={scheduleItem.to}
                                    onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)}
                                />

                                <p 
                                    className={scheduleItems.length === 1 ? 'text-disabled' : ''}
                                    onClick={() => handleRemoveScheduleItem(index)}
                                >
                                    Remover Horário
                                </p>
                                <img 
                                    onClick={() => handleRemoveScheduleItem(index)} 
                                    src={trashIcon} alt="Aviso Importante" 
                                    className="trash-icon"
                                />
                            </div>
                        ))}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>

                        <button type="submit">
                            Salvar Cadastro
                        </button>
                    </footer>
                </form>
                
            </main>
        </div>
    )
}

export default TeacherForm;
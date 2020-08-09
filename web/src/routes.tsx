import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import SwitchHeader from './components/SwitchHeader';

interface Props {
    toggleTheme(): void,
}  

const Routes: React.FC<Props>=({toggleTheme})=> {

    return (
        <BrowserRouter>
            <SwitchHeader {...{toggleTheme}}/>
            <Route path="/" component={Landing} exact/>
            <Route path="/study" component={TeacherList}/>
            <Route path="/give-classes" component={TeacherForm}/>
        </BrowserRouter>
    )
}

export default Routes;
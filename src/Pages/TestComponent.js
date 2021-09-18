import React, {useContext} from 'react';
import {UserContext} from '../contexts/UserContext';

export default function TestComponent(){
    const [userContext, setUserContext] = useContext(UserContext);
    const {user} = userContext
    return (
        <div>
            My name is {user?.email ?? "No name"}
        </div>
    );
}
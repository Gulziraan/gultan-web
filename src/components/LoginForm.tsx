import React, {FC, useState} from 'react';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    return (
        <div>
            <input type="text"/>
        </div>
    );
};

export default LoginForm;
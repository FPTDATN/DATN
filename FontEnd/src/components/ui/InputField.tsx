import { Input, InputProps, } from 'antd';
import { PasswordProps } from 'antd/es/input';
import { ChangeEventHandler, FunctionComponent } from 'react';

interface InputFieldProps extends InputProps {
    onChange?: ChangeEventHandler<HTMLInputElement>;
    typeInput?: 'text' | 'password';
}

const InputField: FunctionComponent<InputFieldProps & PasswordProps> = ({ onChange, typeInput, ...props }) => {
    return (
        <>
            {typeInput === 'password' ? (
                <Input.Password onChange={onChange} {...props} />
            ) : (
                <Input onChange={onChange} {...props} />
            )}
        </>
    );
};

export default InputField;

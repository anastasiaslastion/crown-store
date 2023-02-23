import { useState } from 'react';
import {
    createUserDocumentFromAuth, signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';


const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(err) {
            switch (err.code) {
                case 'auth/wrong-password':
                    alert('incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('incorrect email');
                    break;
                default:
                    console.error('Error occurred while signing in user', err);
            }
        }
    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={ handleSubmit }>
                <FormInput
                    label='Email'
                    required
                    type='email'
                    name='email'
                    value={ email }
                    onChange={ handleChange }
                />

                <FormInput
                    label='Password'
                    required
                    type='password'
                    name='password'
                    value={ password }
                    onChange={ handleChange }
                />

                <div className='buttons-container'>
                    <Button type='submit'>
                        Sign In
                    </Button>

                    <Button
                        type='button'
                        buttonType='google'
                        onClick={ signInWithGoogle }>
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;
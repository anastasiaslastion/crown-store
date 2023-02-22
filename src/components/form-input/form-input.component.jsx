import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
    const renderLabel = () => (
        <label className={`${ otherProps.value.length ? 'shrink' : ''} form-input-label`}>
            { label }
        </label>
    );

    return (
        <div className='group'>
            <input className='form-input' {...otherProps} />
            { label && renderLabel() }
        </div>
    )
}

export default FormInput;
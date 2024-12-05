import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';

const useFormValidation = (initialState, validateField) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const debouncedFormData = useDebounce(formData, 500);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouchedFields((prev) => ({ ...prev, [name]: true }));
        const validationErrors = validateField(name, value);
        setErrors((prev) => ({ ...prev, ...validationErrors }));
    };

    useEffect(() => {
        const validationErrors = Object.keys(formData).reduce((acc, key) => {
            const error = validateField(key, formData[key]);
            return { ...acc, ...error };
        }, {});
        setErrors(validationErrors);
    }, [debouncedFormData, validateField]);

    const isFormValid = () => Object.keys(errors).length === 0;

    return {
        formData,
        errors,
        touchedFields,
        isFormValid,
        handleChange,
        handleBlur,
    };
};

export default useFormValidation;
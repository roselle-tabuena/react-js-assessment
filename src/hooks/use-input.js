import { useState } from 'react';

const UseInput = (validation, sanitize = null) => {
  const [value, setValue] = useState('');
  const [isTouched, setTouched] = useState(false);

  const isValid = validation(value);
  const hasError = !isValid && isTouched;

  const onBlurHandler = () => {
    setTouched(true);
  }

  const onChangeHandler = event => {
    let result = event.target.value;
    
    if (sanitize !== null) {
      result = sanitize(event.target.value);
    }
    
    setValue(result);
  }

  const reset = () => {
    setValue('');
    setTouched(false)
  }

  return {
    value, 
    setValue,
    isValid,
    hasError,
    onBlurHandler,
    onChangeHandler,
    reset
  }

}

export default UseInput;
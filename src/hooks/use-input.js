import { useState } from 'react';

const UseInput = (validation) => {
  const [value, setValue] = useState('');
  const [isTouched, setTouched] = useState(false);

  const isValid = validation(value);
  const hasError = !isValid && isTouched;

  const onBlurHandler = () => {
    setTouched(true);
  }

  const onChangeHandler = event => {
    setValue(event.target.value);
  }

  const reset = () => {
    setValue('');
    setTouched(false)
  }

  return {
    value, 
    setValue,
    hasError,
    onBlurHandler,
    onChangeHandler,
    reset
  }

}

export default UseInput;
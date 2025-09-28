import { useState } from "react";

type FormWithInputProps = {
  buttonText : string
  placeHolder: string
  id: string
  onSubmit : (value: string) => void;
};
const FormWithInput = ({
  buttonText,
  placeHolder,
  id,
  onSubmit
}:FormWithInputProps) =>{
  const [value , setValue] = useState('');
  const handleFormSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value);
    setValue('');
  }
  const handlInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }
    return(
        <form onSubmit={handleFormSubmit}>
          <input name = {id} id = {id} type="text" placeholder={placeHolder} value={value} onChange={handlInputChange}/>
          <button type="submit">{buttonText}</button>
        </form>
    );
};

export default FormWithInput;
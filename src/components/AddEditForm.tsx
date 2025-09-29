import { useEffect, useState } from "react";
import type { User } from "../types/User.type";


const formDefaultValues : User = {
    id:0,
    email : '',
    name : '',
    created:'',
}


type AddEditFormProps = {
  onSubmit : (value: User) => void;
  loading : boolean;
  editingUser?: User | null;
  onCancelEdit?: () => void;
};
const AddEditForm = ({
  onSubmit,
  loading,
  editingUser,
  onCancelEdit
}:AddEditFormProps) =>{
  const [formState , setFormState] = useState<User>(formDefaultValues);

  useEffect(() => {
    if (editingUser) {
      setFormState({ id: editingUser.id, name: editingUser.name, email: editingUser.email, created: editingUser.created });
    } else {
      setFormState(formDefaultValues);
    }
  }, [editingUser]);

  const handleFormSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(loading) return;
    onSubmit(formState);
    setFormState(formDefaultValues);
  };
  
    const handlInputChange = (key : keyof User) => {
        return (event : React.ChangeEvent<HTMLInputElement>) => {
            setFormState({
            ...formState,
            [key] : event.target.value,
        })
        }
  };

  //TODO update to non controlled components
    return(
        <form onSubmit={handleFormSubmit}>
          <input 
            id = 'email'
            name = 'email'
            type="email" 
            placeholder= "Inserte su email"
            value={formState.email} 
            onChange={handlInputChange('email')}
            disabled = {loading}
          />
          <input 
            id = 'name'
            name = 'name'
            type="text" 
            placeholder= "Inserte su nombre"
            value={formState.name} 
            onChange={handlInputChange('name')}
            disabled = {loading}
          />
          {editingUser ? (
        <>
          <button type="submit" disabled={loading}>Actualizar</button>
          <button type="button" onClick={onCancelEdit}>Cancelar</button>
        </>
      ) : (
        <button type="submit" disabled={loading}>Agregar</button>
      )}
        </form>
    );
};

export default AddEditForm;
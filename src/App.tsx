import ListContainer from "./components/ListContainer";
import UserItem from "./components/UserItem";
import useGetUsers from "./hooks/useGetUsers";
import AddEditForm from "./components/AddEditForm";
import type { User } from "./types/User.type";
import useCreateEditUser from "./hooks/useCreateEditUser";

//AGREGAR UN BOTON DE EDITAR(POPULAR LOS INPUT CON LA INFORMACION DEL EDITADO) ,
//CUANDO SE SELECCIONE ESE ELEMENTO DEBE APARECER UN BOTON DE ACTUALIZAR Y OTRO DE CANCELAR (EL DE CANCELAR DEBE PONER LOS INPUTS EN VALORES DEFAULT)
//PONER EL BOTON DE X PARA BORRAR REGISTRO

function App() {
  const {users, addUsertoList , isLoading : isFetchingUsers} = useGetUsers();
  const {createUser , isLoading : isSubmitLoading} = useCreateEditUser();
  const handleOnSubmit = async (user : User) => {
    const newUser = await createUser({
      user : {
        ...user,
        created : new Date()
      }
    });
    if(newUser){
      addUsertoList(newUser.user);
    }
  }

  return(
    <div>
      <h1>To do List</h1>
      <AddEditForm onSubmit={handleOnSubmit} loading = {isSubmitLoading} />
      {isFetchingUsers && <p>Loading...</p>}
      {!isFetchingUsers && (
        <ListContainer>
        {users.map((user) => {
          return <UserItem key={user.id} user={user}/>
        })}
      </ListContainer>
      )}
    </div>
  );
}

export default App

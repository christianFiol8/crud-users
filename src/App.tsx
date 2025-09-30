import ListContainer from "./components/ListContainer";
import UserItem from "./components/UserItem";
import useGetUsers from "./hooks/useGetUsers";
import AddEditForm from "./components/AddEditForm";
import type { User } from "./types/User.type";
import useCreateEditUser from "./hooks/useCreateEditUser";
import { useState } from "react";
import "./App.css"

function App() {
  const { users, addUsertoList, deleteUserFromList, isLoading: isFetchingUsers } = useGetUsers();
  const { createUser, editUser, isLoading: isSubmitLoading } = useCreateEditUser(); // <-- agrega editUser
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEditClick = (user: User) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleOnSubmit = async (user: User) => {
    if (editingUser) {
      const updatedUser = await editUser(editingUser.id.toString(), user);
      if (updatedUser) {
        addUsertoList(updatedUser.user, true);
        setEditingUser(null);
      }
    } else {
      const newUser = await createUser({
        user: {
          ...user,
          created: new Date(),
        },
      });
      if (newUser) {
        addUsertoList(newUser.user);
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    await deleteUserFromList(id);
  };

  return (
    <div>
      <h1>CRUD DE USUARIOS</h1>
      <AddEditForm
        onSubmit={handleOnSubmit}
        loading={isSubmitLoading}
        editingUser={editingUser}
        onCancelEdit={handleCancelEdit}
      />
      {isFetchingUsers && <p>Loading...</p>}
      {!isFetchingUsers && (
        <ListContainer>
          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              onEdit={() => handleEditClick(user)}
              onDelete={() => handleDeleteUser(user.id.toString())}
            />
          ))}
        </ListContainer>
      )}
    </div>
  );
}

export default App;

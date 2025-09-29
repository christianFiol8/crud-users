import ListItem from "./ListItem";
import type {User} from "../types/User.type"

type UserItemProps = {
  user : User;
  onEdit: () => void;
  onDelete : () => void;
};
const UserItem = ({user, onEdit , onDelete} : UserItemProps) => {
  return (
  <ListItem>
    <div>
      <span>{user.name} - {user.email}</span>
      <button onClick={onEdit}>Editar</button>
      <button onClick={onDelete}>Eliminar</button>
    </div>
  </ListItem>)
};

export default UserItem;

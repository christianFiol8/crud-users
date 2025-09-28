import ListItem from "./ListItem";
import type {User} from "../types/User.type"

type UserItemProps = {
  user : User;
};
const UserItem = ({user} : UserItemProps) => {
  return (
  <ListItem>
    <>
      <b>{user.id}:</b> {user.name} ({user.email});
    </>
  </ListItem>)
};

export default UserItem;

import { useEffect, useState } from "react";
import type { User, UserResponse } from "../types/User.type";
import HttpClient from "../utils/HttpClient";


const httpClient = new HttpClient();
const useGetUsers = () => {
    const [users , setUsers] = useState <User[]>([]);
    const [isLoading , setIsLoading] = useState(false);
    const getUsers = () => {
      setIsLoading(true);
      httpClient.get('users/all').then((response) => {
      response.json().then((data : UserResponse) => {
        console.log('Usuarios: ' , data)
        setUsers(data.users)
      }).catch((error) => {
        setUsers([]);
        console.error('Error while parsing users/all' , error)
      }).finally(() =>{
        setIsLoading(false);
      })
    }).catch((error) =>{
      setUsers([]);
      setIsLoading(false);
      console.error('Failed fetching users/all' , error);
    })
    };

    const addUsertoList = (user : User, isEdit = false) =>{
      setUsers(prev =>
        isEdit
          ? prev.map(u => String(u.id) === String(user.id) ? user : u)
          : [...prev, user] 
      );
    };

    const deleteUserFromList = async (id: string) => {
      try {
        await httpClient.delete(`users/delete/${id}`);
        setUsers(prev => prev.filter(u => String(u.id) !== String(id)));
      } catch (error) {
        console.error('Error deleting user', error);
      }
    };

    useEffect(() => {
      getUsers();
  } , []);

    return {
      users,
      getUsers,
      addUsertoList,
      deleteUserFromList,
      isLoading
    };
};

export default useGetUsers;
import { useState } from "react";
import type { CreateUserPayload, CreateUserResponse, User} from "../types/User.type";
import HttpClient from "../utils/HttpClient";

const httpClient = new HttpClient();
const useCreateEditUser = () => {

    const [isLoading , setIsLoading] = useState(false)
    const createUser = async(data: CreateUserPayload) => {
      setIsLoading(true);
        try{
          const response = await httpClient.post('users/add', data)
          const userData = await response.json();
          console.log(data);
          setIsLoading(false);
          return userData as CreateUserResponse;
        }catch(error){
          console.error('Error while creating/parsing user', error)
          setIsLoading(false);
          return null;
        }
    };

    const editUser = async (_id: string, user: User) => {
      setIsLoading(true);
      try {
        const response = await httpClient.put('users/update', { user });
        const userData = await response.json();
        setIsLoading(false);
        return userData as CreateUserResponse;
      } catch (error) {
        console.error('Error while editing user', error);
        setIsLoading(false);
        return null;
      }
    }

    return {
        createUser,
        isLoading,
        editUser,
    };
};

export default useCreateEditUser;
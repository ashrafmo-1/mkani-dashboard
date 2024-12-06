import axios from "axios";
import { token } from "../../../helpers/token";
import { useTranslation } from "react-i18next";
import { API } from "../../../constant/APIS";
import { useGetUsersHook } from "./getUsersHook";

export const useUsersHook = () => {
  const { i18n } = useTranslation();
  const {AllUsers} = useGetUsersHook();

  // add new user ------------------------------------------------------------------------------------------
  const addUser = async (userData) => {
    try {
      await axios.post(`${API}/${i18n.language}/admin/users/create`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(
        "Error adding user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // delete admin -----------------------------------------------------------------------------------------
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API}/${i18n.language}/admin/users/delete?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      AllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // edit admin ----------------------------------------------------------------------------------------
  const editUser = async (userId, userData) => {
    try {
      await axios.put(`${API}/${i18n.language}/admin/users/update?userId=${userId}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // AllUsers();
    } catch (error) {
      console.error(
        "Error editing user:",
        error.response ? error.response.data : error.message
      );
    }
  }
  

  return { addUser, deleteUser, editUser };
};
import axios from "axios";
import { token } from "../../../helpers/token";
import { useTranslation } from "react-i18next";
import { useGetUsersHook } from "./getUsersHook";
import axiosInstance from "../../../utils/axiosConfig";

export const useUsersHook = () => {
  const { i18n } = useTranslation();

  // add new user ------------------------------------------------------------------------------------------
  const addUser = async (userData) => {
    try {
      await axiosInstance.post(`/${i18n.language}/admin/users/create`, userData);
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
      await axiosInstance.delete(`/${i18n.language}/admin/users/delete?userId=${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  // edit admin ----------------------------------------------------------------------------------------
  const editUser = async (userId, userData) => {
    try {
      await axiosInstance.put(`/${i18n.language}/admin/users/update?userId=${userId}`, userData);
      // AllUsers();
    } catch (error) {
      console.error(
        "Error editing user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return { addUser, deleteUser, editUser };
};
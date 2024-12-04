import axios from "axios";
import { useEffect, useState } from "react";
import { token } from "../../../helpers/token";
import { useTranslation } from "react-i18next";

export const useUsersHook = () => {
  const { i18n } = useTranslation();
  const [getUsers, setGetUsers] = useState([]);
  useEffect(() => {
    const AllUsers = async () => {
      try {
        const response = await axios.get(
          `https://a888-156-197-202-219.ngrok-free.app/api/v1/${i18n.language}/admin/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        if (response.status === 200 && response.data) {
          setGetUsers(response);
        }
      } catch (error) {
        console.error("Error fetching users:", error.response ? error.response.data : error.message);
      }      
    };
    AllUsers();
  }, [i18n.language]);

  return { getUsers, setGetUsers };
};
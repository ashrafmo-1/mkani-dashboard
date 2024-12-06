import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../constant/APIS";

export const useSelectsHook = (selectType) => {
  const [type, setType] = useState([]);

  const getSelect = async () => {
    try {
      const response = await axios.get(`${API}/admin/selects?allSelects=roles`);
      setType(response.data[0].options);
      // console.log(response.data[0].options);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSelect();
  }, []);

  return {type};
};
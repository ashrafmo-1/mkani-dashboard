import axios from "axios";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {useFormik} from "formik";
import {UserContext} from "../../../context/UserContext";
import {api} from "../../../constant/APIS";
import {MAINPATH} from "../../../constant/MAINPATH";
import {useTranslation} from "react-i18next";

const useAuthHook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const {i18n} = useTranslation();

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const response = await axios.post(api.login, values);
            setUser(response.data);
            const access_token = response.data.token;
            Cookies.set("MPO-TOKEN-DASHBOARD", access_token, {expires: 0.4167});
            setUser({...response.data, token: access_token, isAuthenticated: true});
            window.location.reload();
            navigate(`/${MAINPATH}/${i18n.language}/Dashboard`);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.log("Unprocessable Entity: Invalid input data.");
            } else {
                console.log("An error occurred. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            username: "admin",
            password: "M@Ns123456",
        },
        onSubmit: handleSubmit,
    });

    // Logout Functions
    return {handleSubmit, loading, formik};
};

export default useAuthHook;

import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {MAINPATH} from "./constant/MAINPATH";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {SideBar} from "./common";
import {AppRoutes} from "./Routes/Routes";
import {BarsOutlined} from "@ant-design/icons";

function App() {
    const token = Cookies.get("MPO-TOKEN-DASHBOARD");
    const {i18n} = useTranslation();
    const navigate = useNavigate();
    const [active, setActive] = useState(true);

    useEffect(() => {
        const currentPath = window.location.pathname;
        const [, mainPath, currentLang, ...rest] = currentPath.split("/");
        const newPath = `/${MAINPATH}/${i18n.language}/${rest.join("/")}`;

        currentLang !== i18n.language && navigate(newPath, {replace: true});
        !token && navigate(`/${MAINPATH}/authentication`, {replace: true});
    }, [i18n.language, navigate, token]);


    const toggleSideBar = () => {
        setActive(!active);
    }

    return (
        <main className="MPO_DASHBOARD flex w-full">
            {token && (
                <div className={`sticky top-0 w-[80px] sm:w-[300px] h-[99vh] ${active ? "block" : "hidden"}`}>
                    <SideBar/>
                </div>
            )}

            <div
                className={`${
                    token
                        ? `relative overflow-x-auto w-full ${active ? "sm:w-[calc(100%-300px)]" : ""}  sm:px-8 px-3 pb-2 mt-2 sm:rounded-lg`
                        : "w-full"
                }`}
            >
                {token && (
                    <div className="header bg-[#fafafa] px-4 py-2 rounded-lg mb-4">
                        <BarsOutlined
                            className="cursor-pointer bg-blue-200 p-1 text-2xl rounded-xl"
                            onClick={toggleSideBar}
                        />
                    </div>
                )}
                <AppRoutes/>
            </div>
        </main>
    );
}

export default App;
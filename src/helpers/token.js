import Cookies from "js-cookie";

let token = Cookies.get("mkani-TOKEN-DASHBOARD");

if (!token) {
  token = null;
}

export { token };
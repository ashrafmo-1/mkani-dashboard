import Cookies from "js-cookie";

let token = Cookies.get("MPO-TOKEN-DASHBOARD");

if (!token) {
  token = null;
}

export { token };
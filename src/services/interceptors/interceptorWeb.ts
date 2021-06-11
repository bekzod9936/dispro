import axios from "axios";
import { URL } from "../constants/config";

const interceptorWeb = axios.create({
	baseURL: `${URL}/web`,
});

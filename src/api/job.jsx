import { CONSTANT } from "../utils/Constant";
import { API_REQUEST } from "./api";

export const JOB = {
    ADD(req) {
        const url = `${CONSTANT.URL}job`;
        return API_REQUEST("POST", url, req);
    },
    UPDATE(req, id, token) {
        const url = `${CONSTANT.URL}job/${id}`;
        return API_REQUEST("PUT", url, req, {
            Authorization: `Bearer ${token}`,
        });
    },
    DELETE(req, id, token) {
        const url = `${CONSTANT.URL}job/delete/${id}`;
        return API_REQUEST("PUT", url, req, {
            Authorization: `Bearer ${token}`,
        });
    },
    GET_ALL() {
        const url = `${CONSTANT.URL}job`;
        return API_REQUEST("GET", url);
    },
    GET_BY_ID(id) {
        const url = `${CONSTANT.URL}job/${id}`;
        return API_REQUEST("GET", url);
    },
};

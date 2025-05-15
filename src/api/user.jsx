import { CONSTANT } from "../utils/Constant";
import { API_REQUEST } from "./api";

export const USER = {
  LOGIN(req) {
    const url = `${CONSTANT.URL}user/login`;
    return API_REQUEST("POST", url, req);
  },
  CHECK(req) {
    console.log("req", req);
    const url = `${CONSTANT.URL}user/check`;
    return API_REQUEST("POST", url, req);
  },
  REFRESH(req) {
    const url = `${CONSTANT.URL}user/refresh`;
    return API_REQUEST("POST", url, req);
  },
  GET_TOC(id) {
    const url = `${CONSTANT.URL}token/${id}`;
    return API_REQUEST("GET", url);
  },
  ADD(req, token) {
    const url = `${CONSTANT.URL}user`;
    return API_REQUEST("POST", url, req, {
      Authorization: `Bearer ${token}`,
    });
  },
  UPDATE(req, id, token) {
    const url = `${CONSTANT.URL}user/${id}`;
    return API_REQUEST("PUT", url, req, {
      Authorization: `Bearer ${token}`,
    });
  },
  DELETE(req, id, token) {
    const url = `${CONSTANT.URL}user/delete/${id}`;
    return API_REQUEST("PUT", url, req, {
      Authorization: `Bearer ${token}`,
    });
  },
  GET_ALL() {
    const url = `${CONSTANT.URL}user`;
    return API_REQUEST("GET", url);
  },
  GET_BY_ID(id) {
    const url = `${CONSTANT.URL}user/${id}`;
    return API_REQUEST("GET", url);
  },
  PASS_CHECK(id, req) {
    const url = `${CONSTANT.URL}user/pass-check/${id}`;
    return API_REQUEST("POST", url, req);
  },
};

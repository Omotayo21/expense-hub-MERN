// src/utils/fetchData.js
import axios from "axios";
import Cookies from "js-cookie";
import { setExpenses } from "../redux/ui-slice";
import { setRevenue } from "../redux/revenue-slice";
import BaseUrl from "../config";

export const fetchExpenses = async (dispatch: any) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.get(`${BaseUrl}/api/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userExpenses = res.data.data.expenses;
    dispatch(setExpenses(userExpenses));
  } catch (error) {
    console.log(error);
  }
};

export const fetchRevenues = async (dispatch : any) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.get(`${BaseUrl}/api/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userRevenues = res.data.data.revenues;
    dispatch(setRevenue(userRevenues));
  } catch (error) {
    console.log(error);
  }
};

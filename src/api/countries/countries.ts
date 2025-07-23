import axios from "../axios/axios";

export const fetchCountries = () => axios.get('/all?fields=name,flag').then(res => res.data);

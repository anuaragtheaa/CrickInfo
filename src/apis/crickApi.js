import axios from 'axios';

export default axios.create({
    baseURL: "https://dev132-cricket-live-scores-v1.p.rapidapi.com",
    headers: {
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"dev132-cricket-live-scores-v1.p.rapidapi.com",
        "x-rapidapi-key":"728bd849f7msh1ccc2463e83e237p1d8dabjsnf697cd19c8c3"
    }
})

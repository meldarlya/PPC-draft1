import axios from 'axios';

useEffect(() => {
  axios.get('http://localhost:5000/api/rm')
    .then(res => setData(res.data))
    .catch(err => console.error(err));
}, []);
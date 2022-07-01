import {useEffect, useState} from 'react';
import axios from 'axios';


function useFetchData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



const fetchData = async () => {
  try {
    const response = await axios.get(url);
    setData(response.data);
    setLoading(false);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
};

 useEffect(() => {
  fetchData();
}, []);


  

  // useEffect(() => {
  //   setLoading(true);
  //   setError(null);

  //   axios
  //     .get(url)
  //     .then(response => {
  //       setData(response.data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       setError(error);
  //       setLoading(false);
  //     });

  // }, [url]);



  return {data, loading, error};
}

 
export default useFetchData;
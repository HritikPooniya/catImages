import { useState, useEffect } from 'react';
import LoadMoreButton from './LoadMoreButton';

const CatGallery = () => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "live_bBA7l7ExctwWw20oL1PcUjDSPh1gV3y20C89C1cPGNbaaXTQXnMGipdgcbl1iQ0M"
  });

  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };

  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);  

  const fetchCatData = async () => {
    setLoading(true);  
    try {
      const requests = Array.from({ length: 6 }, () => 
        fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
          .then(response => response.json())
      );

      const results = await Promise.all(requests);
      const newCats = results.flat();
      setCats(prevCats => [...prevCats, ...newCats]);
    } catch (error) {
      console.log('Error fetching cat data:', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchCatData();
  }, []);

  return (
    <div className="text-center">
        

<LoadMoreButton onClick={fetchCatData} />
      <div className="grid grid-cols-3 gap-4">
        {cats.map(cat => (
          <img key={cat.id} src={cat.url} alt="Cat" className="rounded-lg" width={300} />
        ))}
      </div>

      {loading && <h2 className="text-lg font-semibold text-center">Loading...</h2>}
      <LoadMoreButton onClick={fetchCatData} />
    </div>
  );
};

export default CatGallery;

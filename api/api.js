const fetchData = async () => {
    try {
      const placesResponse = await fetch('https://dewalaravel.com/api/places');
      if (!placesResponse.ok) {
        throw new Error('Error fetching places data');
      }
      const placesData = await placesResponse.json();
  
      const categories = Array.from(new Set(placesData.data.map(place => place.category)));
  
      return { places: placesData.data, categories: categories };
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  export { fetchData };
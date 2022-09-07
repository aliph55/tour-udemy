import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
const url = "https://course-api.com/react-tours-project";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const responce = await fetch(url);
      const tour = await responce.json();
      setTours(tour);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  console.log(tours);

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>not tours left</h2>
          <button onClick={() => fetchTours()} className="btn">
            Refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};

export default App;

// import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import ExerciseCard from "./components/ExerciseCard";
import axios from "axios";
function App() {
  // state for data limiting the data and for input change effect
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(20);
  const [text, setText] = useState("");

  /*This code is also fetchind data but we use here normal js to do  */

  // async function fetchingData() {
  //   console.log(limit);
  //   const url = `https://exercisedb.p.rapidapi.com/exercises?limit=${limit}`;
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "1e71e911f5msh4431306193de168p15ab22jsn7f5d2e50273b",
  //       "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  //     },
  //   };

  //   try {
  //     const response = await fetch(url, options);
  //     const result = await response.json();
  //     console.log(result);
  //     setData(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function filterFunction(char) {
    const object = {
      method: "GET",
      url: `https://exercisedb.p.rapidapi.com/exercises?limit=${limit}`,
      headers: {
        "X-RapidAPI-Key": "1e71e911f5msh4431306193de168p15ab22jsn7f5d2e50273b",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    try {
      const rawData = await axios.request(object);

      if (char === "") {
        setData(rawData.data);
      } else {
        const charArray = Array.from(char);
        const fiteredData = rawData.data.filter((ele) =>
          charArray.every(
            (ch) =>
              ele.name.includes(ch) ||
              ele.bodyPart.includes(ch) ||
              ele.target.includes(ch)
          )
        );

        setData(fiteredData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    filterFunction();
  }, []);

  useEffect(() => {
    filterFunction(text);
  }, [text, limit]);

  return (
    <>
      <h1 id="main_Heading">Work Till Pump</h1>

      <header>
        <h1>
          Where Fitness Meets Fun and <br />
          Results Are Achieved
        </h1>
        <p>
          Include an inspiring image or video that showcases your gym's
          energetic atmosphere,
          <br /> trainers, or members working out.
        </p>
      </header>

      <main>
        <div id="container_one">
          <img
            id="one"
            src="https://www.pixelstalk.net/wp-content/uploads/images6/Fitness-Desktop-Wallpaper.jpg"
            alt="gymFreak"
          />
          <img
            id="two"
            src="https://www.pixelstalk.net/wp-content/uploads/images6/Fitness-Desktop-Wallpaper.jpg"
            alt="gymFreak"
          />
          <img
            id="three"
            src="https://i.ytimg.com/vi/gey73xiS8F4/maxresdefault.jpg"
            alt="gymFreak"
          />
        </div>
        <div id="container_two">
          <img
            id="first"
            src="https://wallpaperaccess.com/full/1087621.jpg"
            alt="gymFreak"
          />
          <img
            src="https://wallpapercave.com/wp/wp6331008.jpg"
            alt="gymFreak"
          />
          <img
            src="https://img.freepik.com/premium-photo/woman-training-gym_946657-755.jpg"
            alt="gymFreak"
          />
        </div>
      </main>

      <section id="filter_Section">
        <h1>Exercise List</h1>
        <input
          type="text"
          placeholder="Search by target, body part,  or exercise"
          onChange={(e) => setText(e.target.value)}
        />
      </section>

      <section id="exercise_card_container">
        {data.map((ele) => (
          <ExerciseCard
            key={ele.id}
            url={ele.gifUrl}
            name={ele.name}
            target={ele.target}
            bodyPart={ele.bodyPart}
          />
        ))}
      </section>

      <button
        id="loadMore"
        onClick={() => {
          setLimit((prev) => prev + 20);
        }}
      >
        Load More
      </button>
    </>
  );
}

export default App;

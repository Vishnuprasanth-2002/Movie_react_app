import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import { updateMovie } from "../services/api";
const EditForm = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log("Getting info of ", id);
    // async function getMovieFromAPI() {
    //   setIsLoading(true);
    //   try {
    //     const response = await updateMovie();
    //     setMovies(response.data);
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // getMovieFromAPI()
  }, [id]);
  return (
    <>
      <main className="container">
        <form>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              required
            />
          </label>

          <label htmlFor="year">
            Year
            <input
              type="text"
              id="year"
              name="year"
              placeholder="Year"
              required
            />
          </label>
          <div className="grid">
            <Link to="/">
              <button>add</button>
            </Link>
            <Link to="/">
              <button>Cancel</button>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
};

export default EditForm;

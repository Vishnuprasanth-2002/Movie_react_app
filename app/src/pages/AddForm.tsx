import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import { addMovie } from "../services/api";
import Form from "../components/form";
import { IMovieAdd } from "../components/types";

function AddForm() {
  const navigate = useNavigate();
  const movie = {
    title: "",
    year: 0,
  };

  async function handleAddMovie(movie: IMovieAdd) {
    try {
      const moviePayload = {
        title: movie.title,
        year: movie.year,
      };
      const response = await addMovie(moviePayload);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log("Errored");
      console.log(error);
    }
  }

  return (
    <>
      <Layout title="addForm">
        <h1>AddForm</h1>
        <Form handleAddMovie={handleAddMovie} emptyMovie={movie} />
      </Layout>
    </>
  );
}

export default AddForm;

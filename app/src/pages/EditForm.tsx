import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IMovie, IMovieAdd } from "../components/types";
import Layout from "../components/layout";
import { updateMovie } from "../services/api";
import Form from "../components/form";

interface IEditForm {
  movie: IMovie;
}
const EditForm: React.FC<IEditForm> = ({ movie }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editValue = {
    title: movie.title,
    year: movie.year,
  };

  useEffect(() => {
    console.log("Getting info of ", id);
  }, [id]);

  async function handleEditMovie(editedmovie: IMovieAdd) {
    try {
      const response = await updateMovie(editedmovie, movie.id);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Layout title={`EditMovie${movie.title}`}>
        <Form
          handleAddMovie={handleEditMovie}
          emptyMovie={editValue}
          type="edit"
        />
      </Layout>
    </>
  );
};

export default EditForm;

// Article.tsx
import React from "react";
import { Link } from "react-router-dom";
import { IMovie } from "../components/types";
import LoadingIcon from "./Loading/LoadingIcon";

interface ArticleProps {
  movie: IMovie;
  handleEdit: (movie: IMovie) => void;
  handleDelete: (id: number) => void;
  isLoading: boolean;
}

const Article: React.FC<ArticleProps> = ({
  movie,
  handleEdit,
  handleDelete,
  isLoading,
}) => {
  return (
    <article>
      <h1>{movie.title}</h1>
      <h3>{movie.year}</h3>

      <div className="grid">
        <Link to={`/edit/${movie.id}`}>
          <button onClick={() => handleEdit(movie)}>Edit</button>
        </Link>
        <button onClick={() => handleDelete(movie.id)} disabled={isLoading}>
          {isLoading ? <LoadingIcon /> : "Delete"}
        </button>
      </div>
    </article>
  );
};

export default Article;

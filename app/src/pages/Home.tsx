import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/api";
import Layout from "../components/layout";

import "@picocss/pico";

interface IMovie {
  id: number;
  title: string;
  year: number;
}
interface IShowError {
  action: string;
  msg: string;
}
function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  useEffect(() => {
    console.log("Called once");

    async function getMoviesFromAPI() {
      setIsLoading(true);
      try {
        const response = await getMovies();
        setMovies(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getMoviesFromAPI();
  }, [refresh]);
  async function handleDelete(id: number) {
    toggleModal();
    try {
      await deleteMovie(id);
      setShowModalMsg({
        action: "succes",
        msg: "deleted",
      });
      // setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting movie:", error);
        setShowModalMsg({
          action: "failed",
          msg: error.message,
        });
      } else {
        console.error("An unknown error occurred:", error);
        setShowModalMsg({
          action: "failed",
          msg: "An unknown error occurred.",
        });
      }
    }
  }
  return (
    <>
      <Layout title="Home">
        <h1>Home</h1>
        <div className="container">
          <Link to="/new" role="button" className="secondary">
            +
          </Link>
          <button
            disabled={isLoading}
            onClick={() => setRefresh((prev) => !prev)}
          >
            refresh list
          </button>
          {isLoading ? (
            <p>Loading movies!</p>
          ) : (
            <div className="grid">
              {movies.map((m) => (
                <article key={m.id}>
                  <h1>{m.title}</h1>
                  <h3>{m.year}</h3>

                  <div className="grid">
                    <Link to={`/edit/${m.id}`} className="pico-link">
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(m.id)}>delete</button>
                    {showModal && (
                      <dialog open>
                        <article>
                          <a
                            href="#close"
                            aria-label="Close"
                            className="close"
                            data-target="modal-example"
                            onClick={toggleModal}
                          ></a>
                          <h3>{showModalMsg.action}</h3>
                          <p>{showModalMsg.msg}</p>
                        </article>
                      </dialog>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default Home;

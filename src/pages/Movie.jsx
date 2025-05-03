import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Movie.css";
import "animate.css"; // Import Animate.css

function Movie({ searchQuery }) {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonfakery.com/movies/infinite-scroll")
      .then((response) => response.json())
      .then((json) => {
        setMovie(json.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  const filteredMovies = movie.filter((item) =>
    item.original_title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const SkeletonCard = () => (
    <Col>
      <Card className="h-100 shadow-sm animate__animated animate__slideInUp"> {/* Add slide-in animation */}
        <Skeleton height={300} />
        <CardBody>
          <CardTitle>
            <Skeleton width="80%" />
          </CardTitle>
          <CardSubtitle className="mb-2">
            <Skeleton width="50%" />
          </CardSubtitle>
          <Skeleton count={2} />
        </CardBody>
      </Card>
    </Col>
  );

  return (
    <div>
      <Container className="my-4">
        <h1 className="text-center mb-4">🎬 Movie Page</h1>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {loading ? (
            <>
              {/* Add Skeleton Cards with Slide-in Animation */}
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            filteredMovies.map((item, index) => (
              <Col key={item.id || index}>
                <Card className="h-100 shadow-sm animate__animated animate__fadeInUp">
                  <Card.Img
                    variant="top"
                    src={item.poster_path}
                    alt={item.original_title}
                    style={{ height: "300px", objectFit: "cover" }}
                    onClick={() =>
                      navigate(`/movie/${item.id}`, { state: item })
                    }
                  />
                  <CardBody>
                    <CardTitle>{item.original_title}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted">
                      ⭐ {item.vote_average ?? "N/A"}
                    </CardSubtitle>
                    <Card.Text style={{ fontSize: "14px" }}>
                      {item.overview?.slice(0, 100)}...
                    </Card.Text>
                  </CardBody>
                </Card>
              </Col>
            ))
          )}
        </Row>
     
      </Container>
    </div>
  );
}

export default Movie;




import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Moviedetail.css";
import "animate.css";

function Moviedetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!state) {
    return (
      <Container className="my-5 text-center">
        <h3>Movie not found</h3>
        <Button variant="dark" onClick={() => navigate("/")}>
          ⬅ Go Back Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Button variant="secondary" onClick={() => navigate(-1)}>
        ⬅ back
      </Button>

      <Card
        className="mt-4 p-3 shadow-sm animate__animated animate__slideInUp "
        style={{ animationDuration: "1s", animationDelay: "0.5s" }}
      >
        <Row>
          <Col md={5} sm={12}>
            {loading ? (
              <Skeleton height={500} />
            ) : (
              <Card.Img
                src={state.poster_path}
                alt={state.original_title}
                style={{ height: "500px", objectFit: "cover" }}
              />
            )}
          </Col>

          <Col md={7} sm={12}>
            <CardBody>
              <h2>
                {loading ? <Skeleton width="70%" /> : state.original_title}
              </h2>

              <p>
                <strong>Rating:</strong>{" "}
                {loading ? (
                  <Skeleton width={60} />
                ) : (
                  <>⭐ {state.vote_average}</>
                )}
              </p>

              <p>
                <strong>Genre:</strong>{" "}
                {loading ? <Skeleton width={100} /> : state.genre ?? "Unknown"}
              </p>

              <p>
                <strong>Description:</strong>
              </p>
              <p>{loading ? <Skeleton count={5} /> : state.overview}</p>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default Moviedetail;

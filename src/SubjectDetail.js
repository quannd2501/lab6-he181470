import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState(null);

  useEffect(() => {
    fetchSubject();
  }, [id]);

  const fetchSubject = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/subjects/${id}`);

      setSubject(response.data);
    } catch (error) {
      console.error("Error loading subject:", error);
    }
  };

  if (!subject) {
    return (
      <Container className="mt-4">
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Button
        variant="secondary"
        className="mb-3"
        onClick={() => navigate("/syllabus")}
      >
        ← Back
      </Button>

      <Card>
        <Card.Header>
          <h3 className="mb-0">Subject Infomation</h3>
        </Card.Header>

        <Card.Body>
          <Row className="mb-3">
            <strong>Code</strong>
            {subject.code}
          </Row>

          <Row className="mb-3">
            <strong>Name</strong>
            {subject.name}
          </Row>

          <Row className="mb-3">
            <strong>Curriculum</strong>

            {subject.curriculum}
          </Row>

          <Row className="mb-3">
            <strong>Semester</strong>
            {subject.semester}
          </Row>

          <Row className="mb-3">
            <strong>Credits</strong>
            {subject.credits}
          </Row>

          <Row className="mb-3">
            <strong>Pre-requisites</strong>
            {subject.preRequisites && subject.preRequisites.length > 0
              ? subject.preRequisites.join(", ")
              : "None"}
          </Row>

          <Row>
            <strong>Description</strong>
            {subject.description}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SubjectDetail;

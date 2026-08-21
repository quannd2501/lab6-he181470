import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Button, Form, Table, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function SubjectList() {
  const [subjects, setSubjects] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCode, setSelectedCode] = useState("");

  const [submittedSearch, setSubmittedSearch] = useState("");
  const [submittedCode, setSubmittedCode] = useState("");

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:9000/subjects");
      setSubjects(response.data);
    } catch (error) {
      console.error("Error loading subjects:", error);
    }
  };

  const codes = [...new Set(subjects.map((subject) => subject.code))];

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      subject.code.toLowerCase().includes(submittedSearch.toLowerCase()) ||
      subject.name.toLowerCase().includes(submittedSearch.toLowerCase());

    const matchesCode = submittedCode === "" || subject.code === submittedCode;

    return matchesSearch && matchesCode;
  });

  const handleSearch = () => {
    setSubmittedSearch(search);
    setSubmittedCode(selectedCode);
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Syllabus Management</h2>
      </div>
      <Row className="align-items-center mb-3 g-2">
        <Col xs="auto">
          <span>Search By</span>
        </Col>

        <Col xs="auto">
          <Form.Select
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value)}
            style={{ width: "150px", height: "40px" }}
          >
            <option value="">Code</option>

            {codes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Search by subject code or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "400px", height: "40px" }}
          />
        </Col>

        <Col xs="auto">
          <Button onClick={handleSearch} style={{ height: "40px" }}>
            Search
          </Button>
        </Col>
      </Row>

      <h5>Subject List</h5>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Curriculum</th>
            <th>Semester</th>
            <th>Credits</th>
            <th>Prerequisites</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {filteredSubjects.map((subject) => (
            <tr key={subject.id}>
              <td>
                <Link
                  to={`/subject/${subject.id}`}
                  style={{
                    textDecoration: "none",
                    color:"black"
                  }}
                >
                  {subject.code}
                </Link>
              </td>

              <td>
                  {subject.name}
              </td>

              <td>{subject.curriculum}</td>
              <td>{subject.semester}</td>
              <td>{subject.credits}</td>

              <td>
                {subject.preRequisites.length > 0
                  ? subject.preRequisites.join(", ")
                  : "None"}
              </td>

              <td>{subject.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default SubjectList;

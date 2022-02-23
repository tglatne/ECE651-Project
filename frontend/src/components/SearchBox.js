import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function SearchBox() {

  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword) {
        navigate(`/products?keyword=${keyword}`)
    } else {
        navigate(location.pathname)
    }

  }

  return (
    <Form className="d-flex" onSubmit={submitHandler}>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="me-2"
      ></Form.Control>

      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
}

export default SearchBox;

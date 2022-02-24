import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function SearchBox() {

  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

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

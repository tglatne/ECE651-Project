import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
import ProductService from '../api/product/ProductService';

function ProductScreen() {

    const {id} = useParams()
    const [product, setProduct] = useState([])

    useEffect(() => {
        ProductService.getProduct(id)
        .then(
            response => setProduct(response.data)
        )
    },[]);

    return (
        <div>
            <Link to="/" className='btn btn-light my-3'>Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.title} fluid />
                </Col>

                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.title}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price_Walmart: ${product.price}    
                        </ListGroup.Item>
                            
                        <ListGroup.Item>
                            Price_Sobeys: ${product.price}
                        </ListGroup.Item>
                            
                        <ListGroup.Item>
                            Price_Zehrs: ${product.price}
                        </ListGroup.Item>


                   </ListGroup>
                </Col>
                
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price_Walmart:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Price_Sobeys:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Price_Zehrs:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button className='btn-block' type='button'>Add To Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>

                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ProductScreen;

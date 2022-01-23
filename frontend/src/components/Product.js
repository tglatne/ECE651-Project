import React from 'react';
import {Card} from 'react-bootstrap';
import { Link } from 'react-router-dom'

function Product({ product }) {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/products/${product.id}`}>
                <Card.Img src={product.image}/>
            </a>

            <Card.Body>
                <a href={`/products/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.title}</strong>
                    </Card.Title>
                </a>

                <Card.Text as="h3">
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;

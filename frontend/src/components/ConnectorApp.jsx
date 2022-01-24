import React, { Component } from 'react'

export default class ConnectorApp extends Component {
    constructor(props){
        super(props)
        this.state = {
            activeProduct : {
                product_name : "",
                product_price : 0
            },
            productlist : []
        }

        this.renderItems = this.renderItems.bind(this)
    }

    async componentDidMount() {
        try {
          const res = await fetch('http://localhost:8000/api/product/');
          const productlist = await res.json();
          this.setState({
            productlist
          });
          console.log(this.state.productlist)
        } catch (e) {
        //   console.log(e);
      }
    }

    renderItems = () => {
        console.log(this.state.productlist)
        return this.state.productlist.map(item => (
            <div>
            <h1>Name:{item.product_name}</h1>
            <h4>Price: ${item.product_price}</h4>
            </div>
        ))
        
    }
    render() {
        return (
            <div>
                {this.renderItems()}
            </div>
        )
    }
}

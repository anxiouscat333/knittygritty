import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useEffect, useState} from "react";
import {Card} from "react-bootstrap";

function App() {
    const items = require("./assets/shopdata");
    const [data, setData] = useState(items);
    const [cart, setCart] = useState([])
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        total()
    }, )

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++ ) {
            totalVal += cart[i].price;
        }
        totalVal = Math.ceil(totalVal * 100)/100;
        setCartTotal(totalVal);
    }

    const cartItems = cart.map((item) => (
        <div key={item.id}>
            {`${item.name}: $${item.price}`}
        </div>
    ))

    const addToCart = (item) => {
        setCart([...cart, item]);
    }

    function filterResult(categoryItem) {
        let result = items
        if (categoryItem === "") {
        }
        else {
            result = items.filter((currentItem) =>{
                return currentItem.type === categoryItem
            })
        }
        setData(result)
    }

    function sortResult() {
        const sorter = (a, b) => {
            return +a.price - +b.price
        }
        setData(items.sort(sorter))
    }

    function removeSortResult() {
        const sorter = (a, b) => {
            return +b.price + +a.price
        }
        setData(items.sort(sorter))
    }

    const listItems = data.map((item) => (
        <div className="container-fluid mx-2">
            <div className= "row mt-5 mx-2">
                <div className= "col-md-12">
                    <div className="row">
                        <div className="col-md-10">
                            <Card style={{ width: '35rem' }}>
                                <Card.Img  alt={"fashion item"} variant="top" src={item.image} />
                                <Card.Body>
                                    <Card.Title key={item.name}>{item.name}</Card.Title>
                                    <Card.Text>
                                        <p>{item.description}</p>
                                        <p><strong>${item.price}</strong></p>
                                    </Card.Text>
                                    <input type="submit" value="Add to Cart" onClick={() => addToCart(item)}/>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ))

    return (
        <div className="App">
            <h1 onClick={() => filterResult('')}>Knitty Gritty</h1>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand onClick={() => filterResult('')}>Knitty Gritty</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Item><Nav.Link href="#all" onClick={() => filterResult('')}>All</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="#clothing" onClick={() => filterResult('clothing')}>Clothing</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="#scarves" onClick={() => filterResult('scarf')}>Scarves</Nav.Link></Nav.Item>
                            <NavDropdown title="Sort By" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#pricesort" onClick={() => sortResult()}>Price (lowest to highest)</NavDropdown.Item>
                                <NavDropdown.Item href="#pricesort" onClick={() => removeSortResult()}>Remove Sorting</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="container-fluid mx-2">
                <div className= "row mt-5 mx-2">
                    <div className= "col-md-3">
                        <h2>Cart</h2>
                        <div>{cartItems}</div>
                        <div>Total Price: ${cartTotal}</div>
                    </div>
                    <div className= "col-md-9">
                        <div className="row">
                            <div>
                                <div>{listItems}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

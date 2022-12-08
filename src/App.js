import logo from './logo.svg';
import './App.css';
import { useState} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import shopData from "./assets/shopdata.json";

function App() {
    const [type, setType] = useState("All")
    const [cart, setCart] = useState([])
    const items = shopData;
    
    const selectFilterType = eventKey => {
        setType(eventKey);
    };
    
    const filteredData = () => {
        if (type === "All") {
            return items
        } else if (type === "scarf") {
            return items.filter(item => item.type === "scarf")
        } else if (type === "clothing") {
            return items.filter (item => item.type === "clothing")
        } else {
            return items
        }
    }

    const addToCart = (item) => {
        setCart([...cart, item]);
    }

    const listItems = items.map((item) => (
        <div key={item.name}>
            <p>{item.name}</p>
            <img src={item.image} alt={"fashion item"} width="400" />
            <p>{item.description}</p>
            <p>${item.price}</p>
            <input type="submit" value="Add to Cart" onClick={() => addToCart(item)}/>
        </div>
    ))



    return (
        <div className="App">
            <h1 href="#home">Knitty Gritty</h1>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand eventKey="All">Knitty Gritty</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" onSelect={selectFilterType}>
                            <Nav.Item><Nav.Link href="#all" eventKey="All">All</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="#scarves" eventKey="Scarves">Scarves</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="#clothing" eventKey="Clothing">Clothing</Nav.Link></Nav.Item>
                            <NavDropdown title="Sort By" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#pricesort">Price</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>{listItems}</div>
        </div>
    );
}

export default App;

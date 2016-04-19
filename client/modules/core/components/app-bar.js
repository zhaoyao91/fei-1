import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap'

export default ({
    brand = {}, // {text, href}
    links = [], // [{text, href, active}]
    })=> {
    return <Navbar fixedTop={true}>
        <Navbar.Header>
            <Navbar.Brand>
                <a href={brand.href}>{brand.text}</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                {
                    links.map((link, index)=>
                        <NavItem
                            active={link.active}
                            key={index}
                            eventKey={index}
                            href={link.href}>
                            {link.text}
                        </NavItem>
                    )
                }
            </Nav>
        </Navbar.Collapse>
    </Navbar>
}
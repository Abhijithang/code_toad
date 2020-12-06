import React, {PureComponent} from 'react';
import {Card, CardDeck, Image, Row, Col, Dropdown, DropdownButton, Form, Button, Modal, Carousel} from 'react-bootstrap'
import jsPDF from 'jspdf';

export default class PdfGenerator extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    jsPdfGenerator = () => {
        var doc = new jsPDF('p', 'pt');
        doc.text(20, 20, 'this is the default text');

        doc.setFont('courier');
        doc.text(20, 30, 'This is text with courier font');
        doc.save("generated.pdf");
    }

    render() {
        return (
            <div>
                <Button onClick={this.jsPdfGenerator}>Generate PDF</Button>
            </div>
        )
    }



}
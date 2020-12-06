import React from 'react';
import PdfGenerator from './PdfGenerator';

class Assignments extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange(e) {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        console.log(e.target.files)
    }
    render() {
        return(
            <div>
                <div>
                    Assignments
                </div>
                <div>
                    <input type="file" name="file" onChange={(e) => this.onChange(e)} />
                    <PdfGenerator></PdfGenerator>
                </div>
            </div>
        )
    }
}

export default Assignments;

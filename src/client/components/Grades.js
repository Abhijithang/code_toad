import React from 'react';

class Grades extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      console.log(this.props);
        return(
            <div>
                <div>
                    Grades Page
                </div>
            </div>
        )
    }
}

export default Grades;

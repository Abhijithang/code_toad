import React from 'react';

class StudentList extends React.Component {
    constructor() {
        super();
    }

    render() {
      console.log(this.props);
        return(
            <div>
                <div>
                    Student List Page
                </div>
            </div>
        )
    }
}

export default StudentList;

import React from 'react';

class ItineraryEvent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <tr>
          <td>{this.props.eventInfo['begin']}</td>
          <td>{this.props.eventInfo['end']}</td>
          <td>{this.props.eventInfo['location']}</td>
          <td>{this.props.eventInfo['name']}</td>
          <td>{this.props.eventInfo['description']}</td>
          <td><button type="button" className="btn btn-xs btn-warning" name="edit" onClick={this.props.editEvent.bind(this, this.props.eventInfo['key'])}>Edit</button></td>
          <td><button type="button" className="btn btn-xs btn-danger" name="delete" onClick={this.props.deleteEvent.bind(this, this.props.eventInfo['key'])}>Delete</button></td>
      </tr>
    );
  }
}

class ItineraryComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  createXmlHttpRequestObject() {
    var xmlHttp;

    if(window.XMLHttpRequest) {
      //This works for nearly everything but Internet Explorer
      xmlHttp = new XMLHttpRequest();
    } else {
      //This works for Internet Explorer
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xmlHttp;
  }

  saveItinerary() {
    var xhr = this.createXmlHttpRequestObject();
    xhr.withCredentials = false;
    xhr.open("POST", "http://127.0.0.1:3000/list");
    xhr.send(JSON.stringify(this.props.list));

    // $.ajax({
    //   url: '/list',
    //   dataType: 'json',
    //   type: 'POST',
    //   data: this.props.list,
    //   success: function(data) {
    //     console.log('Itinerary saved!');
    //   },
    //   error: function(xhr, status, err) {
    //     console.error('/list', status, err.toString());
    //   }
    // });
  }

  render() {

    return (
      <div className="mainComponent">
        <h3 className="text-center">Edit Your Plans</h3>

        <table className="table table-striped table-hover">
          <thead className="tableHeader">
            <tr className="tableHeader">
              <th>Begin</th>
              <th>End</th>
              <th>Location</th>
              <th>Name</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.list.map(event => 
              <ItineraryEvent key={event.key} eventInfo={event}
                editEvent={this.props.editEvent}
                deleteEvent={this.props.deleteEvent}/>
            )}
        </tbody>
        </table>
        <div className="center-align">
          <button className="btn btn-success" 
            onClick={this.saveItinerary.bind(this)}
          >Save Itinerary</button>
        </div>
      </div>
    )
  }
};

export default ItineraryComponent;

        // <div className="modal">
        //   <div className="modal-dialog">
        //     <div className="modal-content">
        //       <div className="modal-header">
        //         <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        //         <h4 className="modal-title">Edit or Delete?</h4>
        //       </div>
        //       <div className="modal-body">
        //         <p>Would you like to edit or delete the following event?</p>
        //         <p>{this.eventInfo}</p>
        //       </div>
        //       <div className="modal-footer">
        //         <button type="button" className="btn btn-default" data-dismiss="modal">Edit</button>
        //         <button type="button" className="btn btn-primary">Delete</button>
        //         <button type="button" className="btn btn-primary">Neither</button>
        //       </div>
        //     </div>
        //   </div>
        // </div>
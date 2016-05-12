
const AppsList = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({listOfApps: data.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {listOfApps: []};
  },
  componentDidMount: function(){
    this.loadCommentsFromServer();
  },
  render: function() {
    const createAppListItem = function(app){
      return (<li key={app.id}>{app.name}</li>);
    };
    return (
      <div class="">
        <ul>{this.state.listOfApps.map(createAppListItem)}</ul>
      </div>
    );
  }
})

ReactDOM.render(<AppsList url="/api/data"/>, document.getElementById('sidebar'));

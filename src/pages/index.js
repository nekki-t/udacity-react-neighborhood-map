import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadVenues } from '../actions';

import { withStyles } from 'material-ui/styles';
import withRoot from '../components/withRoot';
/*--- Material UI ---*/
import Typography from 'material-ui/Typography';
import List from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import MenuIcon from 'material-ui-icons/Menu';
import Card, { CardMedia } from 'material-ui/Card';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import FilterIcon from 'material-ui-icons/FilterList';

/*--- libraries ---*/
import { toast, ToastContainer } from 'react-toastify';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

/*--- shared ---*/
import { MAP } from '../shared/constants';

/*--- components ---*/
import Loading from '../components/Loading';

/*--- styling ---*/
import classNames from 'classnames';
import { styles } from '../styles/topPage';
import './index.css';

import Map from '../components/Map';

/**
 * @description
    - Main Page
*/
class Index extends React.Component {

  state = {
    mobileOpen: false,
    focusedVenue: null,
    selectedVenue: null,
    errorOccured: false,
    filterText: '',
    venues: [],
    filteredVenues: [],
  };

  constructor() {
    super();
    this.listItemSelected = this.listItemSelected.bind(this);
    this.filterTextChanged = this.filterTextChanged.bind(this);
  }

  handleDrawerToggle = () => {
    this.setState({mobileOpen: !this.state.mobileOpen});
  };

  handleMarkerSelected = (venue) => {
    this.setState({selectedVenue: venue});
    if (this.refs[venue.id]) {
      this.refs[venue.id].focus();
    }
  };

  /*--- filtering function ---*/
  filterTextChanged = (event) => {
    const filterText = event.target.value.trim();
    const { venues } = this.state;
    let filteredVenues = venues;

    if(filterText.length > 0) {
      filteredVenues = venues.filter((venue) => {
        return (venue.name.toUpperCase().indexOf(filterText.toUpperCase()) >= 0) ||
          (venue.address !== undefined && venue.address.toUpperCase().indexOf(filterText) >= 0)
      });
    }

    filteredVenues = filteredVenues.map((venue) => {
      venue.selected = false;
      venue.animation = null;
      return venue;
    });

    /*--- reset ---*/
    this.setState({
      filterText,
      filteredVenues,
      focusedVenue: null,
      selectedVenue: null,
    })
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.venues !== this.state.venues) {
      this.setState({
        venues: nextProps.venues,
        filteredVenues: nextProps.venues,
      })
    }
  }

  componentDidMount() {
    /*--- Handle global error ---*/
    window.onerror = (message, file, line, columne, errorObject) => {
      alert('Sorry. Google Map is not available right now. \nPlease try again later.');
      return false;
    };

    this.loadVenues();
  }

  listItemSelected = (venue) => {
    this.setState({selectedVenue: venue});
  };

  /*--- get data from Foursquare ---*/
  async loadVenues() {
    try {
      await this.props.actions.loadVenues(MAP.mountainViewLat, MAP.mountainViewLng);
    } catch (error) {
      this.setState({
        errorOccured: true
      });
      toast('Sorry. Foursquare seems to be currently out of service. Please try again later.', {
        type: toast.TYPE.ERROR,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  render() {
    const {classes, loading} = this.props;
    const {selectedVenue, mobileOpen, filteredVenues} = this.state;
    const drawer = (
      <div>
        <div className={classes.drawerHeader} style={{padding: 5}}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="filter">Filter list by the input text</InputLabel>
            <Input
              id="filter"
              value={this.state.filterText}
              onChange={this.filterTextChanged}
              startAdornment={<InputAdornment position="start"><FilterIcon /></InputAdornment>}
              role="search"
            />
          </FormControl>
        </div>
        <Divider/>
        <List className={classes.drawerList} ref='list' role="list">
          {filteredVenues.map((venue) =>
            <Card className={classes.card} key={venue.id} role="listitem">
              <CardMedia
                className={classes.cover}
                image={venue.photoLink}
                title={venue.name}
                role="img"
                aria-label={venue.name}
              />
              <div
                role="button"
                tabIndex={0}
                className={
                  classNames(
                    classes.details,
                    'focused-list-item',
                    {'selected-list-item': selectedVenue && venue.id === selectedVenue.id}
                  )
                }
                onClick={() => this.listItemSelected(venue)}
                onKeyPress={() => this.listItemSelected(venue)}
                ref={venue.id}
              >
                <div style={{textOverflow: 'ellipsis'}}>{venue.name}</div>
                <Rater total={5} rating={venue.rating / 2} interactive={false}/>
              </div>

            </Card>
          )}
          <Card className={classes.card} style={{opacity: 0}}>
            <div style={{height: 70}}>
              spacer
            </div>
          </Card>
        </List>
        <Divider/>
      </div>
    );

    return (
      <div className={classes.root}>
        {(loading) &&
        <Loading withOverLay={true}/>
        }
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon/>
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                Noodle House Searcher
              </Typography>
              <Typography type="body1" color="inherit" noWrap style={{marginLeft: 10}}>
                Powered by Foursquare
              </Typography>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              type="temporary"
              open={mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              type="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
              role="complementary"
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <div role="application" className={classes.mapWrapper}>
              <Map
                venues={filteredVenues}
                selectedVenue={this.state.selectedVenue}
                selectedMarkerChanged={this.handleMarkerSelected}
              />
            </div>

          </main>
        </div>
        <ToastContainer
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          style={{zIndex: 10000}}
        />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    loading: state.fourSquare.loading,
    venues: state.fourSquare.venues,
  }
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({loadVenues}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(Index)));

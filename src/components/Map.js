/*global google*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, withProps } from "recompose"
/*--- Map ---*/
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
/*--- Material UI ---*/
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import AccessAlarmIcon from 'material-ui-icons/AccessAlarm';
/*--- libraries ---*/
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
/*--- Shared ---*/
import { MAP } from '../shared/constants';

/**
 * @description
    - Google Map
*/
const MapBase = compose(
  withProps({
    googleMapURL: MAP.url,
    loadingElement: <div style={{height: `100%`}}/>,
    containerElement: <div style={{height: `100%`}}/>,
    mapElement: <div style={{height: `100%`}}/>,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={MAP.defaultZoomSize}
    center={{lat: props.lat, lng: props.lng}}
  >
    {props.venues.map((venue) => (
      <Marker
        position={{lat: venue.location.lat, lng: venue.location.lng}}
        onClick={() => props.onMarkerClick(venue)}
        animation={venue.animation}
        key={venue.id}
      >
        {venue.selected &&
        <InfoWindow onCloseClick={() => props.onMarkerClick(venue)}>
          {
            <div className="info-window">
              <Card>
                <CardMedia
                  image={venue.photoLink}
                  title={venue.name}
                  style={{width: 300, height: 200}}
                  role="img"
                  aria-label={venue.name}
                />
              </Card>
              <CardContent>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Rater total={5} rating={venue.rating / 2} interactive={false} style={{fontSize: 30}}/>
                </div>
                <Typography type="headline" content="h2">
                  {venue.name}
                </Typography>
                <Typography component="div">
                  <span style={{color: 'blue'}}>{venue.stats.checkinsCount || 0}</span> people have checked in.
                </Typography>
                <Typography component="div">
                  <span style={{color: 'blue'}}>{venue.stats.usersCount || 0}</span> users.
                </Typography>
                <Typography component="div">
                  Repeat Rate: <span style={{color: 'blue'}}>{venue.repeatRate || 0}</span>
                </Typography>
                <Typography component="div">
                  address: <span>{venue.location.address}</span>
                </Typography>
                <Typography component="div">
                  tel: <a href={`tel:${venue.contact ? venue.contact.phone : ''}`}>{venue.contact ? venue.contact.formattedPhone : ''}</a>
                </Typography>
                <Typography component="div">
                  url: <a href={`${venue.url}`} target='_blank'>{venue.url}</a>
                </Typography>
                <Typography component="div" style={{display: 'flex', alignItems: 'center'}}>
                  <AccessAlarmIcon style={{marginRight: 5}}/>{venue.hours ? venue.hours.status : ''}
                </Typography>
                {venue.hours && venue.hours.isOpen &&
                <Typography component="div" style={{display: 'flex', justifyContent: 'center'}}>
                  <AccessAlarmIcon style={{marginRight: 5}}/>{venue.hours ? venue.hours.status : ''}
                </Typography>
                }
              </CardContent>
            </div>
          }
        </InfoWindow>
        }
      </Marker>
    ))}
  </GoogleMap>
));

/**
 * @description
    - Google Map Container
*/
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: MAP.mountainViewLat,
      lng: MAP.mountainViewLng,
      isMarkerShown: false,
      venues: props.venues,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.venues !== nextProps.venues) {
      this.setState({
        venues: nextProps.venues,
      });
    }
    if (nextProps.selectedVenue && this.state.selectedVenue !== nextProps.selectedVenue) {
      this.changeSelectedMarker(nextProps.selectedVenue);
    }
  }

  handleMarkerClick = (venue) => {
    this.props.selectedMarkerChanged(venue);
  };

  /*--- Set animation to the selected marker and null for the others ---*/
  changeSelectedMarker = (venue) => {
    const target = this.state.venues.find((v) => {
      return v.id === venue.id
    });

    if (target.selected) {
      target.selected = false;
      target.animation = null;
    } else {
      target.selected = true;
      target.animation = google.maps.Animation.BOUNCE;
    }

    const venues = this.state.venues.map((item) => {
      if (item.id === target.id) {
        return target;
      } else {
        item.selected = false;
        item.animation = null;
        return item;
      }
    });

    this.setState({
      venues: venues,
      lat: target.location.lat,
      lng: target.location.lng,
    });
  };

  render() {

    return (
      <MapBase
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        venues={this.state.venues}
        selectedVenue={this.state.selectedVenue}
        lat={this.state.lat}
        lng={this.state.lng}
      />
    )
  }
}

Map.propTypes = {
  venues: PropTypes.array.isRequired,
  selectedVenue: PropTypes.object,
  selectedMarkerChanged: PropTypes.func.isRequired,
};


export default Map;
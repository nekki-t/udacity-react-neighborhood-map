import FourSquareApi from '../shared/four_square_api';
import Venue from '../shared/venue';

export const LOAD_VENUES = 'LOAD_VENUES';
export const VENUES_LOADED = 'VENUES_LOADED';
export const VENUES_LOAD_FAILED = 'VENUES_LOAD_FAILED';

export const loadVenues = (lat, lng) => (
  dispatch => {
    dispatch({
      type: LOAD_VENUES,
      loading: true,
    });
    return FourSquareApi.fetchVenues(lat, lng)
      .then(response => {
        dispatch({
          type: VENUES_LOADED,
          loading: false,
          venues: getVenuesFromResponse(response),
        })
      }).catch((error) => {
        dispatch({
          type: VENUES_LOAD_FAILED,
          loading: false,
        });
        throw(error);
      })
  }
);


const getVenuesFromResponse = (response) => {
  const items = response.response.groups[0].items;
  return items.map((item) => {
    return new Venue(item.venue);
  });
};
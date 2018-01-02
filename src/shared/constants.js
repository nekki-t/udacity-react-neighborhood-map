export const MAP = {
  url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCtLosw9Q7iaVocnhjg6xvM_WuLMrDeKlI&libraries=places,drawing,geometry&v=3',
  apiKey: 'AIzaSyCtLosw9Q7iaVocnhjg6xvM_WuLMrDeKlI',
  mountainViewLat: 37.400111,
  mountainViewLng: -122.108410,
  defaultZoomSize: 15,
};

export const FOUR_SQUARE = {
  url: 'https://api.foursquare.com/v2/venues/explore',
  clientID: '2TBBYTDSQ3SITOPT05VM5LFI4F1OQHF5ULSPKJZ0DZHF0VZI',
  clientSecret: 'N1SJWS0LIVS5VFEL30UTOPJ5I3XZ5PK3QSVWDNHXDGUS0F1N',
  categoryID: '4bf58dd8d48988d1d1941735',
  searchLimit: 50,
  searchTimeOut: 5000,
  venuePhotoCount: 1,
  apiVersion: '20170601',
};

export const MESSAGE = {
  AJAX_ERROR: 'Sorry. There was something wrong. Please try this again later.',
};


const K_SIZE = 40;

export const greatPlaceStyle = {
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: '5px solid #f44336',
  borderRadius: K_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer'
};

export const greatPlaceStyleHover = {
  ...greatPlaceStyle,
  border: '5px solid #3f51b5',
  color: '#f44336',
  transform: `translate3D(0,0,0) scale(${1.5}, ${1.5})`
};

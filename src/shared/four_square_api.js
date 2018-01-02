import { FOUR_SQUARE } from './constants';

class FourSquareApi {
  static fetchVenues(lat, lng) {
    const params = {
      client_id: FOUR_SQUARE.clientID,
      client_secret: FOUR_SQUARE.clientSecret,
      ll: lat + ',' + lng,
      categoryId: FOUR_SQUARE.categoryID,
      limit: FOUR_SQUARE.searchLimit,
      venuePhotos: 1,
      timeout: FOUR_SQUARE.searchTimeOut,
      v: FOUR_SQUARE.apiVersion,
    };

    const url = new URL(FOUR_SQUARE.url);

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    return fetch(url.toString())
      .then((res) => res.json())
  }
}

export default FourSquareApi;
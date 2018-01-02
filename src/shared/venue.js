/*global google*/
/**
 * @description
 - Set data from venue of Foursquare's api
 */
class Venue {

  constructor(params) {
    this.id = params.id;
    this.name = params.name;
    this.contact = params.contact;
    this.location = params.location;
    this.categories = params.categories;
    this.verified = params.verified;
    this.stats = params.stats;
    this.url = params.url;
    this.hours = params.hours;
    this.popular = params.popular;
    this.menu = params.menu;
    this.price = params.price;
    this.rating = params.rating;
    this.specials = params.specials;
    this.description = params.description;
    this.like = params.like;
    this.phrases = params.phrases;
    this.photos = params.photos;
    this.photoLink = this.getPhotoLink();
    this.repeatRate = this.getRepeatRate();
    this.selected = false;
    this.animation  = google.maps.Animation.DROP;
  }

  getPhotoLink = () => {
    let link = 'http://design-ec.com/d/e_others_48/l_e_others_481.png';
    if(this.photos.groups[0] && this.photos.groups[0].items) {
      let item = this.photos.groups[0].items[0];
      if (item) {
        link = item.prefix + 300 + 'x' + 300 + item.suffix;
      }
    }
    return link;
  };

  getRepeatRate = () => {
    let result = 0;
    if(this.stats && this.stats.checkinsCount && this.stats.usersCount) {
      const ci = parseFloat(this.stats.checkinsCount);
      const uc = parseFloat(this.stats.usersCount);
      result = ci / uc;
      result = result.toFixed(1);
    }
    return result;
  };
}

export default Venue;


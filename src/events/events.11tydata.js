const getImagePath = require('../../lib/utils/get-image-path.js');
const getMovie = require('../../lib/utils/get-movie.js');

module.exports = {
  tags: ['event'],
  vocab: 'event',
  rsvp: 'yes',
  changefreq: 'monthly',
  priority: 0.4,
  eleventyComputed: {
    image: async data => {
      const {movie, page} = data;
      if (movie) {
        return getImagePath(movie.Poster, data.event.slug, 'events');
      }
    },
    movie: async data => {
      const {url} = data;
      if (url && url.includes('imdb.com')) {
        return getMovie(url);
      }
    },
    place: data => {
      const places = data.collections.place;
      const {placeId} = data.event;
      if (places && placeId) {
        return places
           .map(place => place.data.place)
           .find(place => place.address['plus-code'] === placeId)
      }
    },
    product: async data => {
      const {movie} = data;
      if (movie) {
        return {
          photo: {
            url: data.image,
            alt: `Poster for ‘${data.title}’`
          },
          title: data.title,
          rating: data.rating,
          info: [
            `Director\n: ${movie.Director}`,
            `Writer\n: ${movie.Writer}`,
            `Actors\n: ${movie.Actors}`,
          ].join('\n\n'),
        };
      }
    },
    slug: data => data.event.slug,
    summary: data => data.movie ? data.movie.Plot : data.event.summary,
    url: data => data.event.url,
    end: data => data.event.end,
    start: data => data.event.start,
    category: data => data.event.category || [],
  },
};
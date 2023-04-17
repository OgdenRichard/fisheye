export default class GridSorter {
  constructor(medias) {
    this.medias = medias;
    this.sortBy = 'likes';
  }

  sortByLikes = () => {
    this.medias.sort((a, b) => parseInt(a.likes, 10) - parseInt(b.likes, 10));
  };

  sortByTitles = () => {
    this.medias.sort((a, b) => a.title.localeCompare(b.title));
  };

  sortByDates = () => {
    this.medias.sort((a, b) => new Date(b.date) - new Date(a.date));
  };
}

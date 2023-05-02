export default class Dropdown {
  constructor(gridBuilder) {
    this.gridBuilder = gridBuilder;
    this.trigger = document.getElementById('dropdown-btn');
    this.arrow = document.getElementById('dropdown-arrow');
    this.filters = document.getElementsByClassName('dropdown-option');
    this.expanded = false;
    this.filterBy = 'likes';
  }

  setFilters = () => {
    for (let index = 0; index < this.filters.length; index += 1) {
      const filter = this.filters[index];
      this.setFilterListener(filter);
    }
  };

  setFilterListener = (filter) => {
    filter.addEventListener('click', () => {
      const swaptext = filter.firstChild.textContent;
      const dataFilter = filter.dataset.filter;
      filter.firstChild.textContent = this.trigger.textContent;
      filter.dataset.filter = this.trigger.dataset.filter;
      this.trigger.firstChild.textContent = swaptext;
      this.trigger.dataset.filter = dataFilter;
      filter.blur();
      this.gridBuilder.sortBy = dataFilter;
      this.gridBuilder.refresh();
    });
  };

  toggleVideoPointer = () => {
    this.gridBuilder.gridElements[0].togglePointerEvents(this.expanded);
  };
}

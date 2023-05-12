/**
 * Manage dropdown listbox
 * @class Dropdown
 */
export default class Dropdown {
  constructor(gridBuilder) {
    this.gridBuilder = gridBuilder;
    this.trigger = document.getElementById('dropdown-btn');
    this.arrow = document.getElementById('dropdown-arrow');
    this.filters = document.getElementsByClassName('dropdown-option');
    this.expanded = false;
    this.filterBy = 'likes';
  }

  /**
   * Add eventListeners for each filter
   * @returns {void}
   */
  setFilters = () => {
    for (let index = 0; index < this.filters.length; index += 1) {
      const filter = this.filters[index];
      this.setFilterListeners(filter);
    }
  };

  /**
   * Set eventListeners for filter
   * @returns {void}
   */
  setFilterListeners = (filter) => {
    filter.addEventListener('click', () => {
      this.filterEventHandler(filter);
    });
    filter.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.filterEventHandler(filter);
      }
    });
  };

  /**
   * Handle filter events for arrow navigation
   * Update data elements
   * Run GridBuilder refresh
   * @returns {void}
   */
  filterEventHandler = (filter) => {
    const swaptext = filter.firstChild.textContent;
    const dataFilter = filter.dataset.filter;
    filter.firstChild.textContent = this.trigger.textContent;
    filter.dataset.filter = this.trigger.dataset.filter;
    this.trigger.firstChild.textContent = swaptext;
    this.trigger.dataset.filter = dataFilter;
    filter.blur();
    this.gridBuilder.sortBy = dataFilter;
    this.gridBuilder.refresh();
  };

  /**
   * Toggle cursor if underlying DOM element is a video
   * @returns {void}
   */
  toggleVideoPointer = () => {
    this.gridBuilder.gridElements[0].togglePointerEvents(this.expanded);
  };
}

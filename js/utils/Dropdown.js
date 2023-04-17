export default class Dropdown {
  constructor(gridBuilder) {
    this.gridBuilder = gridBuilder;
    this.trigger = document.getElementById('filter-trigger');
    this.arrow = document.getElementById('dropdown-arrow');
    this.filters = document.getElementsByClassName('filter');
    this.expanded = false;
    this.filterBy = 'likes';
  }

  // TODO : gérer problème avec dropdown / video

  setFilters = () => {
    for (let index = 0; index < this.filters.length; index += 1) {
      const filter = this.filters[index];
      this.setFilterListener(filter);
    }
  };

  setFilterListener = (filter) => {
    let display = 'none';
    filter.addEventListener('click', () => {
      let prevElement = filter.previousElementSibling;
      let nextElement = filter.nextElementSibling;
      this.expanded = !this.expanded;
      this.trigger.ariaExpanded = `${this.expanded}`;
      if (this.expanded) {
        this.arrow.classList.add('arrow-down');
      } else {
        this.arrow.classList.remove('arrow-down');
      }
      display = this.expanded ? 'block' : 'none';
      if (!filter.classList.contains('filter-active')) {
        const text = filter.textContent;
        const dataFilter = filter.dataset.filter;
        filter.style.display = display;
        filter.textContent = this.trigger.textContent;
        filter.dataset.filter = this.trigger.dataset.filter;
        this.trigger.dataset.filter = dataFilter;
        this.trigger.textContent = text;
        this.trigger.appendChild(this.arrow);
        this.gridBuilder.sortBy = dataFilter;
        this.gridBuilder.update();
      }
      if (nextElement) {
        while (nextElement) {
          nextElement.style.display = display;
          nextElement = nextElement.nextElementSibling;
        }
      } else if (prevElement) {
        while (prevElement && prevElement.classList.contains('filter-toggle')) {
          prevElement.style.display = display;
          prevElement = prevElement.previousElementSibling;
        }
      }
    });
  };
}

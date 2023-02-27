import axios from 'axios';
export default class PhotosApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPhotos() {
    // console.log(this);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=33883277-5fb90fc223bed0b97f81b1004&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      );
      this.incrementPage();
      // console.log(response.data.hits);
      return response.data.hits;
    } catch {
      console.log('eror');
    }
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

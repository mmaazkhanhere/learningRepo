/*The function is designed to make HTTP GET requests using the axios library */

import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);
/*The url represents the source url to be fetched. The fetcher function uses
axios to make a GET request to the specified URL. It is chained with .then
to handle the async response and receives the response object and data is
extracted from the response */

export default fetcher;
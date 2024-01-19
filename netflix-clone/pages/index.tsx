import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
// import InfoModal from '@/components/InfoModal';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
// import useInfoModalStore from '@/hooks/useInfoModalStore';

export async function getServerSideProps(context: NextPageContext) {
  /*getServerSideProps is used to fetch data at runtime, specifically 
  on the server side before rendering a page */

  const session = await getSession(context); /*The get function is called with the
  context object which is provided by Nextjs. It contain the information about
  incoming request */

  if (!session) {
    /*If no user session is found, the function returns a redirect configuration.
    If there is no session, the user is redirected to the auth page*/
    return {
      redirect: {
        destination: '/auth', //the URL to which the user is redirected
        permanent: false, //indicates that the redirection is not permanent
      }
    }
  }

  return {
    /*If a user session is found, an empty object is returned as the props, which
    indicates that there is no additional data to pass to the page */
    props: {}
  }
}

const Home = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  // const { isOpen, closeModal } = useInfoModalStore();

  return (
    <>
      {/* <InfoModal visible={isOpen} onClose={closeModal} /> */}
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  )

}

export default Home;
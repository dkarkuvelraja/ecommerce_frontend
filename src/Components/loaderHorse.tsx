import React from 'react'
import LoadingHorse from '../assets/images/horseLoader.gif';
import { PageLoader } from '../assets/style/index';
function LoaderHorse() {
  return (
    <PageLoader><img src = {LoadingHorse}></img></PageLoader>
  )
}

export default LoaderHorse
import React from 'react'
import data from '../../utils/data'
import ProductItem from './components/ProductItem'

export default function Hello() {
  return (
    <div className='container m-auto mt-4 px-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {data.products.map((product) => (
          <ProductItem product={product} key={product.slug}></ProductItem>
        ))}
      </div>
    </div>
  )
}

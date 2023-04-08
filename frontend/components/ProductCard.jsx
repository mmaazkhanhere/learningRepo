import { getDiscountedPricePercentage } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductCard({ data: { attributes: p, id } }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      {/*transform can be used to rotate, scale, or translate elements
        overfollow-hidden sets the element to hide any content that overflow its boundaries, which can be useful when working with element
        that have fixed sizes
        */}
      <Image
        width={500}
        height={500}
        src={p.thumbnail.data.attributes.url}
        alt={p.name}
      />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{p.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">{`$ ${p.price}`}</p>

          {p.original_price && (
            <>
              <p className="text-base font-medium line-through">{`$ ${p.original_price}`}</p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPricePercentage(p.original_price, p.price)} % off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

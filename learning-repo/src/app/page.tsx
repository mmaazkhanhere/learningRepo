'use client'

import React from 'react'

import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';

register();

export default function Home() {

  const swiperElRef = useRef(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener('progress', (e) => {
      const [swiper, progress] = e.detail;
      console.log(progress);
    });

    swiperElRef.current.addEventListener('slidechange', (e) => {
      console.log('slide changed');
    });
  }, []);

  return (
    <div className='container border mx-auto'>

      <swiper-container
        ref={swiperElRef}
        slides-per-view="1"
        navigation="true"
        pagination="true"
      >
        <swiper-slide>
          <section class="flex flex-col items-center border container mx-auto max-w-sm mt-10 p-3 hover:bg-[#2E294E] hover:text-[#F6E7CB] rounded-3xl">
            <div>
              <img src="https://e9g2x6t2.rocketcdn.me/wp-content/uploads/2020/11/Professional-Headshot-Poses-Blog-Post.jpg" alt="" class="w-32 h-32 rounded-full object-cover 
              border-[4px] border-[#12FBE1]" />
            </div>

            <div>
              <p class="text-justify p-8">
                Big shoutout to [educational institute] for providing me with the opportunity to learn web development! The courses were engaging, the instructors were knowledgeable, and the curriculum was top-notch. I feel confident in my new skills and can't wait to apply them in the real world. Thank you for investing in my future!"
              </p>
            </div>

            <div class="flex flex-col">
              <h1 class="font-bold text-lg">M Maaz Khan</h1>
              <h3 class="font-thin">PIAIC Student</h3>
            </div>
          </section>
        </swiper-slide>

        <swiper-slide>
          <section class="flex flex-col items-center border container mx-auto max-w-sm mt-10 p-3 hover:bg-[#2E294E] hover:text-[#F6E7CB] rounded-3xl">
            <div>
              <img src="https://e9g2x6t2.rocketcdn.me/wp-content/uploads/2020/11/Professional-Headshot-Poses-Blog-Post.jpg" alt="" class="w-32 h-32 rounded-full object-cover border-[4px] border-[#12FBE1]" />
            </div>

            <div>
              <p class="text-justify p-8">
                Big shoutout to [educational institute] for providing me with the opportunity to learn web development! The courses were engaging, the instructors were knowledgeable, and the curriculum was top-notch. I feel confident in my new skills and can't wait to apply them in the real world. Thank you for investing in my future!"
              </p>
            </div>

            <div class="flex flex-col">
              <h1 class="font-bold text-lg">M Maaz Khan</h1>
              <h3 class="font-thin">PIAIC Student</h3>
            </div>
          </section>
        </swiper-slide>

        <swiper-slide>
          <section class="flex flex-col items-center border container mx-auto max-w-sm mt-10 p-3 hover:bg-[#2E294E] hover:text-[#F6E7CB] rounded-3xl">
            <div>
              <img src="https://e9g2x6t2.rocketcdn.me/wp-content/uploads/2020/11/Professional-Headshot-Poses-Blog-Post.jpg" alt="" class="w-32 h-32 rounded-full object-cover border-[4px] border-[#12FBE1]" />
            </div>

            <div>
              <p class="text-justify p-8">
                Big shoutout to [educational institute] for providing me with the opportunity to learn web development! The courses were engaging, the instructors were knowledgeable, and the curriculum was top-notch. I feel confident in my new skills and can't wait to apply them in the real world. Thank you for investing in my future!"
              </p>
            </div>

            <div class="flex flex-col">
              <h1 class="font-bold text-lg">M Maaz Khan</h1>
              <h3 class="font-thin">PIAIC Student</h3>
            </div>
          </section>
        </swiper-slide>

        <swiper-slide>
          <section class="flex flex-col items-center border container mx-auto max-w-sm mt-10 p-3 hover:bg-[#2E294E] hover:text-[#F6E7CB] rounded-3xl">
            <div>
              <img src="https://e9g2x6t2.rocketcdn.me/wp-content/uploads/2020/11/Professional-Headshot-Poses-Blog-Post.jpg" alt="" class="w-32 h-32 rounded-full object-cover border-[4px] border-[#12FBE1]" />
            </div>

            <div>
              <p class="text-justify p-8">
                Big shoutout to [educational institute] for providing me with the opportunity to learn web development! The courses were engaging, the instructors were knowledgeable, and the curriculum was top-notch. I feel confident in my new skills and can't wait to apply them in the real world. Thank you for investing in my future!"
              </p>
            </div>

            <div class="flex flex-col">
              <h1 class="font-bold text-lg">M Maaz Khan</h1>
              <h3 class="font-thin">PIAIC Student</h3>
            </div>
          </section>
        </swiper-slide>
        ...
      </swiper-container>
    </div>
  );
};
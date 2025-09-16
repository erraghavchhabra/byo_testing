import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



const CounterCards = ({data}) => {
  
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      const counter = card.querySelector('.counter');
      let count = { val: 0 };
      gsap.to(count, {
        val: data?.stats?.[index].number,
        duration: 2,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        onUpdate: () => {
          counter.textContent = Math.floor(count.val);
        }
      });
    });
  }, []);

  return (
    <div className="container my-5">
      <div className="row">
        {data?.stats.map((card, i) => (
          <div
            className="col-md-3 d-flex" 
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <div className="counter-card">
              <div className="counter">0</div>
              <h4 className="title mt-3">{card.title}</h4>
              <p className="description">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounterCards;


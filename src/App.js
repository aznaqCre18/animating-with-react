import React, { useRef, useEffect, useState } from "react";
import gsap, { TweenLite, Power3 } from "gsap";

import { Steve, Mark, Bill, Right, Left } from "./assets";
import "./style.scss";

const arr = [
  {
    id: 1,
    name: "Steve Jobs",
    image: Steve,
    quote:
      "You can’t connect the dots looking forward, you can only connect them looking backward. So you have to trust that ",
  },
  {
    id: 2,
    name: "Mark Zuckerberg",
    image: Mark,
    quote:
      "I think a simple rule of business is, if you do the things that are easier first, then you can actually make a lot 	of progress.",
  },
  {
    id: 3,
    name: "Bill Gates",
    image: Bill,
    quote:
      "When a country has the skill and self-confidence to take action against its biggest problems, it makes outsiders 	eager to be a part of it.",
  },
];

function App() {
  const [active, setActive] = useState({
    isActive1: true,
    isActive2: false,
    isActive3: false,
  });
  const [isWaiting, setIsWaiting] = useState(false);

  let ImageList = useRef(null);
  let ContentList = useRef(null);

  const imageWidth = 340;
  const contentWidth = 500;

  const nextImage = async (index, duration, multiple = 1) => {
    TweenLite.to(ImageList.children[index], duration, {
      x: -imageWidth * multiple,
      ease: Power3.easeInOut,
    });
  };

  const prevImage = (index, multipleFrom, multipleTo) => {
    TweenLite.fromTo(
      ImageList.children[index],
      1,
      {
        x: imageWidth * multipleFrom,
      },
      {
        x: imageWidth * multipleTo,
        ease: Power3.easeOut,
      }
    );
  };

  const fadeInContent = (index) => {
    TweenLite.to(ContentList.children[index], 1, {
      x: -contentWidth,
      opacity: 0,
      ease: Power3.easeOut,
    });
  };

  const fadeOutContent = (index) => {
    TweenLite.to(ContentList.children[index], 1, {
      opacity: 1,
      x: 0,
      ease: Power3.easeOut,
      delay: 0.8,
    });
  };

  const scale = (index) => {
    TweenLite.from(ImageList.children[index], 1, {
      scale: 1.5,
      ease: Power3.easeIn,
    });
  };

  const handleNext = () => {
    if (ImageList.children[0].classList.contains("active")) {
      setActive({ isActive1: false, isActive2: true });

      nextImage(0, 1);
      nextImage(1, 1);
      nextImage(2, 0);

      fadeInContent(0);
      fadeOutContent(1);

      scale(1);
    } else if (ImageList.children[1].classList.contains("active")) {
      setActive({ isActive2: false, isActive3: true });

      nextImage(0, 0, -1);
      nextImage(1, 1, 2);
      nextImage(2, 1, 2);

      fadeInContent(1);
      fadeOutContent(2);

      scale(2);
    } else if (ImageList.children[2].classList.contains("active")) {
      setActive({ isActive3: false, isActive1: true });

      nextImage(2, 1, 3);
      nextImage(0, 1, 0);
      nextImage(1, 0, 0);

      fadeInContent(2);
      fadeOutContent(0);

      scale(0);
    }
  };

  const handlePrev = () => {
    if (ImageList.children[0].classList.contains("active")) {
      setActive({ isActive1: false, isActive3: true });

      prevImage(0, 0, 1);
      prevImage(2, -3, -2);

      fadeInContent(0);
      fadeOutContent(2);

      scale(2);
    } else if (ImageList.children[1].classList.contains("active")) {
      setActive({ isActive2: false, isActive1: true });

      prevImage(1, -1, 0);
      prevImage(0, -1, 0);

      fadeInContent(1);
      fadeOutContent(0);

      scale(0);
    } else if (ImageList.children[2].classList.contains("active")) {
      setActive({ isActive3: false, isActive2: true });

      prevImage(1, -2, -1);
      prevImage(2, -2, -1);

      fadeInContent(2);
      fadeOutContent(1);

      scale(1);
    }
  };

  useEffect(() => {
    TweenLite.to(ContentList.children[0], 2, {
      opacity: 1,
      x: 0,
      ease: Power3.easeInOut,
      delay: 1,
    });

    TweenLite.to(ImageList.children[0], 2, {
      opacity: 1,
      x: 0,
      ease: Power3.easeInOut,
      delay: 1,
    });

    const tl = gsap.timeline();
    tl.to(
      ".bg-square",
      {
        x: 0,
        opacity: 1,
      },
      1
    )
      .to(
        ".bg-circle",
        {
          x: 0,
          y: 0,
          opacity: 1,
        },
        1
      )
      .to(
        ".right",
        {
          y: 0,
          opacity: 1,
          delay: 1.2,
        },
        0.8
      )
      .to(
        ".left",
        {
          y: 0,
          opacity: 1,
          delay: 1.2,
        },
        0.8
      );
  }, []);

  return (
    <div id="container">
      <div className="bg-square"></div>
      <div className="t-container">
        <div className="bg-circle"></div>
        <div className="arrows left" onClick={handlePrev}>
          <span>
            <img src={Left} />
          </span>
        </div>
        <div className="inner">
          <div className="t-image">
            <ul className="image-warp" ref={(el) => (ImageList = el)}>
              <li className={active.isActive1 ? "active" : ""}>
                <img alt={arr[0].name} src={arr[0].image} />
              </li>
              <li className={active.isActive2 ? "active" : ""}>
                <img alt={arr[1].name} src={arr[1].image} />
              </li>
              <li className={active.isActive3 ? "active" : ""}>
                <img alt={arr[2].name} src={arr[2].image} />
              </li>
            </ul>
          </div>
          <div className="t-content">
            <ul ref={(el) => (ContentList = el)}>
              <li className={active.isActive1 ? "active" : ""}>
                <div className="content-inner">
                  <p className="quote">{arr[0].quote}</p>
                  <h3 className="name">{arr[0].name}</h3>
                </div>
              </li>
              <li className={active.isActive2 ? "active" : ""}>
                <div className="content-inner">
                  <p className="quote">{arr[1].quote}</p>
                  <h3 className="name">{arr[1].name}</h3>
                </div>
              </li>
              <li className={active.isActive3 ? "active" : ""}>
                <div className="content-inner">
                  <p className="quote">{arr[2].quote}</p>
                  <h3 className="name">{arr[2].name}</h3>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="arrows right" onClick={handleNext}>
          <span>
            <img src={Right} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;

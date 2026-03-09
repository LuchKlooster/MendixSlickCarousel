import { ReactElement } from "react";

import { SlickCarouselContainerProps } from "../typings/SlickCarouselProps";
import { SlickCarouselComponent } from "./components/SlickCarouselComponent";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ui/SlickCarousel.css";

export function SlickCarousel(props: SlickCarouselContainerProps): ReactElement {
    return <SlickCarouselComponent {...props} />;
}

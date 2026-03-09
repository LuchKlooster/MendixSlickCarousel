import { hidePropertiesIn, hidePropertyIn, Problem, Properties } from "@mendix/pluggable-widgets-tools";
import { SlickCarouselPreviewProps } from "../typings/SlickCarouselProps";

export function getProperties(
    values: SlickCarouselPreviewProps,
    defaultProperties: Properties
): Properties {
    // Show only static or dynamic content properties
    if (values.carouselType === "static") {
        hidePropertiesIn(defaultProperties, values, [
            "datasource",
            "contentTemplate",
            "imageUrl",
            "imageAlt",
            "onSlideClick"
        ]);
    } else {
        hidePropertyIn(defaultProperties, values, "slideList");
    }

    // Hide arrow style options when arrows are off; hide drop zones unless style is "custom"
    if (!values.arrows) {
        hidePropertiesIn(defaultProperties, values, ["arrowStyle", "prevArrowContent", "nextArrowContent"]);
    } else if (values.arrowStyle !== "custom") {
        hidePropertiesIn(defaultProperties, values, ["prevArrowContent", "nextArrowContent"]);
    }

    // Hide centerPadding when centerMode is off
    if (!values.centerMode) {
        hidePropertyIn(defaultProperties, values, "centerPadding");
    }

    // Hide autoplaySpeed/pauseOnHover/pauseOnDotsHover when autoplay is off
    if (!values.autoplay) {
        hidePropertiesIn(defaultProperties, values, ["autoplaySpeed", "pauseOnHover", "pauseOnDotsHover"]);
    }

    return defaultProperties;
}

export function check(values: SlickCarouselPreviewProps): Problem[] {
    const errors: Problem[] = [];

    if (values.carouselType === "dynamic" && !values.datasource) {
        errors.push({
            property: "datasource",
            message: "A data source is required for Dynamic type.",
            severity: "error"
        });
    }

    if (values.slidesToShow !== null && values.slidesToShow < 1) {
        errors.push({
            property: "slidesToShow",
            message: "Slides to show must be at least 1.",
            severity: "error"
        });
    }

    if (values.slidesToScroll !== null && values.slidesToScroll < 1) {
        errors.push({
            property: "slidesToScroll",
            message: "Slides to scroll must be at least 1.",
            severity: "error"
        });
    }

    if (values.fade && values.slidesToShow !== null && values.slidesToShow > 1) {
        errors.push({
            property: "fade",
            message: "Fade transition only works when 'Slides to show' is 1.",
            severity: "warning"
        });
    }

    return errors;
}

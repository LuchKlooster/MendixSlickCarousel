import { createElement, Fragment, ReactElement, ReactNode, MouseEventHandler, KeyboardEvent, useRef, useState, useEffect, CSSProperties } from "react";
import Slider from "react-slick";
import { ObjectItem } from "mendix";

import { SlickCarouselContainerProps, LazyLoadEnum, SlickCarouselContainerProps as Props } from "../../typings/SlickCarouselProps";

type DynamicContentProps = Pick<Props, "contentTemplate" | "imageUrl" | "imageAlt"> & { item: ObjectItem };

function DynamicSlideContent({ item, contentTemplate, imageUrl, imageAlt }: DynamicContentProps): ReactElement {
    if (contentTemplate) {
        return createElement(Fragment, null, contentTemplate.get(item));
    }
    if (imageUrl) {
        return (
            <img
                src={imageUrl.get(item).value ?? ""}
                alt={imageAlt ? (imageAlt.get(item).value ?? "") : ""}
                className="slick-carousel-image"
            />
        );
    }
    return createElement(Fragment, null);
}

type SlickLazyLoad = "ondemand" | "progressive" | undefined;

function mapLazyLoad(value: LazyLoadEnum): SlickLazyLoad {
    return value === "none" ? undefined : value;
}

interface CustomArrowProps {
    onClick?: MouseEventHandler<HTMLDivElement>;
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
}

function CustomArrow({ onClick, className, style, children }: CustomArrowProps): ReactElement {
    return (
        <div className={`slick-carousel-custom-arrow${className ? ` ${className}` : ""}`} style={style} onClick={onClick}>
            {children}
        </div>
    );
}

export function SlickCarouselComponent(props: SlickCarouselContainerProps): ReactElement {
    const {
        carouselType,
        slideList,
        datasource,
        contentTemplate,
        imageUrl,
        imageAlt,
        onSlideClick,
        currentSlide,
        beforeChange,
        afterChange,
        autoplay,
        autoplaySpeed,
        speed,
        infinite,
        fade,
        vertical,
        pauseOnHover,
        pauseOnDotsHover,
        draggable,
        lazyLoad,
        initialSlide,
        slidesToShow,
        slidesToShowTablet,
        slidesToShowPhone,
        slidesToScroll,
        slidesToScrollTablet,
        slidesToScrollPhone,
        dots,
        arrows,
        arrowStyle,
        prevArrowContent,
        nextArrowContent,
        centerMode,
        centerPadding,
        adaptiveHeight,
        variableWidth,
        class: className,
        style
    } = props;

    // When --slick-vertical-ratio is set, compute height from the container's rendered width
    // so the carousel maintains its aspect ratio on window resize.
    // Supports both decimal (0.75) and fraction (4/3, 16/9) formats.
    // Caption height is measured from the DOM and added automatically.
    const containerRef = useRef<HTMLDivElement>(null);
    const [ratioHeight, setRatioHeight] = useState<number | null>(null);

    useEffect(() => {
        if (!vertical || !containerRef.current) {
            setRatioHeight(null);
            return;
        }
        const el = containerRef.current;
        const measure = () => {
            // Skip when the element is hidden (e.g. inside a closed accordion).
            // offsetWidth is 0 whenever any ancestor has display:none, which means
            // all layout metrics are zero and the measurement would be wrong.
            // The ResizeObserver will fire again when the element becomes visible.
            if (!el.offsetWidth) return;

            const raw = getComputedStyle(el).getPropertyValue("--slick-vertical-ratio").trim();
            // Format matches CSS aspect-ratio: width/height (e.g. 16/9, 4/3, 100/33).
            // height = width × (height_parts / width_parts)
            const parts = raw.split("/");
            const ratio = parts.length === 2
                ? parseFloat(parts[1].trim()) / parseFloat(parts[0].trim())
                : parseFloat(raw);
            if (!isNaN(ratio) && ratio > 0) {
                const contentHeight = el.offsetWidth * ratio;
                // Add the height of the tallest caption (including its margins) so it
                // does not overlap slide content. Margins are not included in offsetHeight.
                let captionHeight = 0;
                el.querySelectorAll<HTMLElement>(".slick-carousel-caption").forEach(cap => {
                    const s = getComputedStyle(cap);
                    const full = cap.offsetHeight
                        + (parseFloat(s.marginTop) || 0)
                        + (parseFloat(s.marginBottom) || 0);
                    captionHeight = Math.max(captionHeight, full);
                });
                setRatioHeight(Math.ceil(contentHeight + captionHeight));
            } else {
                setRatioHeight(null);
            }
        };
        const observer = new ResizeObserver(measure);
        observer.observe(el);
        measure();
        return () => observer.disconnect();
    }, [vertical]);

    // Inject the computed pixel height as --slick-vertical-height so all CSS rules pick it up.
    // Also apply overflow: hidden directly when vertical so dots never escape the widget boundary
    // regardless of whether the CSS :has() rule matches in the current Mendix layout context.
    const computedStyle: CSSProperties | undefined = vertical
        ? ({
            ...style,
            overflow: "hidden",
            ...(ratioHeight != null ? { "--slick-vertical-height": `${Math.round(ratioHeight)}px` } : {})
            } as CSSProperties)
        : style;

    const arrowStyleClass = arrowStyle !== "default" ? ` slick-carousel-arrows--${arrowStyle}` : "";

    const sliderSettings = {
        autoplay,
        autoplaySpeed,
        initialSlide,
        speed,
        infinite,
        fade: fade && slidesToShow === 1,
        vertical,
        pauseOnHover,
        pauseOnDotsHover,
        draggable,
        swipe: draggable,
        lazyLoad: mapLazyLoad(lazyLoad),
        slidesToShow,
        slidesToScroll,
        dots,
        arrows,
        prevArrow: arrowStyle === "custom" && prevArrowContent
            ? <CustomArrow>{prevArrowContent}</CustomArrow>
            : undefined,
        nextArrow: arrowStyle === "custom" && nextArrowContent
            ? <CustomArrow>{nextArrowContent}</CustomArrow>
            : undefined,
        centerMode,
        centerPadding: centerMode ? centerPadding : "0px",
        adaptiveHeight,
        variableWidth,
        accessibility: true,
        responsive: [
            ...(slidesToShowTablet > 0 || slidesToScrollTablet > 0 ? [{
                breakpoint: 992,
                settings: {
                    slidesToShow: slidesToShowTablet > 0 ? slidesToShowTablet : slidesToShow,
                    slidesToScroll: slidesToScrollTablet > 0 ? slidesToScrollTablet : slidesToScroll
                }
            }] : []),
            ...(slidesToShowPhone > 0 || slidesToScrollPhone > 0 ? [{
                breakpoint: 768,
                settings: {
                    slidesToShow: slidesToShowPhone > 0 ? slidesToShowPhone : slidesToShow,
                    slidesToScroll: slidesToScrollPhone > 0 ? slidesToScrollPhone : slidesToScroll
                }
            }] : [])
        ],
        beforeChange: (_current: number, next: number) => {
            if (currentSlide?.status === "available") {
                currentSlide.setValue(new (window as any).Big(next));
            }
            if (beforeChange?.canExecute) {
                beforeChange.execute();
            }
        },
        afterChange: (_current: number) => {
            if (afterChange?.canExecute) {
                afterChange.execute();
            }
        }
    };

    if (carouselType === "static") {
        if (slideList.length === 0) {
            return (
                <div className={`slick-carousel-widget slick-carousel-empty ${className}`} style={style}>
                    <span className="slick-carousel-empty-message">No slides configured. Add slides in the widget properties.</span>
                </div>
            );
        }

        return (
            <div ref={containerRef} className={`slick-carousel-widget${arrowStyleClass} ${className}`} style={computedStyle}>
                <Slider {...sliderSettings}>
                    {slideList.map((slide, index) => (
                        <div key={index} className="slick-carousel-slide">
                            {slide.content}
                            {slide.caption?.value && (
                                <div className="slick-carousel-caption">{slide.caption.value}</div>
                            )}
                        </div>
                    ))}
                </Slider>
            </div>
        );
    }

    // Dynamic mode
    const items: ObjectItem[] = datasource?.items ?? [];

    if (items.length === 0) {
        if (datasource?.status === "loading") {
            return (
                <div className={`slick-carousel-widget slick-carousel-loading ${className}`} style={style}>
                    <div className="slick-carousel-loader" aria-label="Loading slides" />
                </div>
            );
        }
        return (
            <div className={`slick-carousel-widget slick-carousel-empty ${className}`} style={style}>
                <span className="slick-carousel-empty-message">No slides to display.</span>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={`slick-carousel-widget${arrowStyleClass} ${className}`} style={computedStyle}>
            <Slider {...sliderSettings}>
                {items.map(item => {
                    const clickAction = onSlideClick ? onSlideClick.get(item) : undefined;
                    const isClickable = clickAction?.canExecute;
                    const handleClick = isClickable ? () => clickAction!.execute() : undefined;
                    const handleKeyDown = isClickable
                        ? (e: KeyboardEvent<HTMLDivElement>) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                clickAction!.execute();
                            }
                        }
                        : undefined;

                    return (
                        <div
                            key={item.id}
                            className={`slick-carousel-slide${isClickable ? " slick-carousel-slide--clickable" : ""}`}
                            onClick={handleClick}
                            onKeyDown={handleKeyDown}
                            role={isClickable ? "button" : undefined}
                            tabIndex={isClickable ? 0 : undefined}
                            aria-label={isClickable ? "Slide" : undefined}
                        >
                            <DynamicSlideContent item={item} contentTemplate={contentTemplate} imageUrl={imageUrl} imageAlt={imageAlt} />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}

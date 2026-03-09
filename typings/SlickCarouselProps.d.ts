/**
 * This file was generated from SlickCarousel.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListActionValue, ListAttributeValue, ListWidgetValue } from "mendix";
import { Big } from "big.js";

export type CarouselTypeEnum = "static" | "dynamic";

export interface SlideListType {
    caption?: DynamicValue<string>;
    content: ReactNode;
}

export type LazyLoadEnum = "none" | "ondemand" | "progressive";

export type ArrowStyleEnum = "default" | "chevron" | "round" | "square" | "minimal" | "custom";

export interface SlideListPreviewType {
    caption: string;
    content: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
}

export interface SlickCarouselContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    carouselType: CarouselTypeEnum;
    slideList: SlideListType[];
    datasource?: ListValue;
    contentTemplate?: ListWidgetValue;
    imageUrl?: ListAttributeValue<string>;
    imageAlt?: ListAttributeValue<string>;
    onSlideClick?: ListActionValue;
    currentSlide?: EditableValue<Big>;
    beforeChange?: ActionValue;
    afterChange?: ActionValue;
    autoplay: boolean;
    autoplaySpeed: number;
    speed: number;
    infinite: boolean;
    fade: boolean;
    vertical: boolean;
    pauseOnHover: boolean;
    pauseOnDotsHover: boolean;
    draggable: boolean;
    lazyLoad: LazyLoadEnum;
    initialSlide: number;
    slidesToShow: number;
    slidesToShowTablet: number;
    slidesToShowPhone: number;
    slidesToScroll: number;
    slidesToScrollTablet: number;
    slidesToScrollPhone: number;
    dots: boolean;
    arrows: boolean;
    arrowStyle: ArrowStyleEnum;
    prevArrowContent?: ReactNode;
    nextArrowContent?: ReactNode;
    centerMode: boolean;
    centerPadding: string;
    adaptiveHeight: boolean;
    variableWidth: boolean;
}

export interface SlickCarouselPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    carouselType: CarouselTypeEnum;
    slideList: SlideListPreviewType[];
    datasource: {} | { caption: string } | { type: string } | null;
    contentTemplate: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    imageUrl: string;
    imageAlt: string;
    onSlideClick: {} | null;
    currentSlide: string;
    beforeChange: {} | null;
    afterChange: {} | null;
    autoplay: boolean;
    autoplaySpeed: number | null;
    speed: number | null;
    infinite: boolean;
    fade: boolean;
    vertical: boolean;
    pauseOnHover: boolean;
    pauseOnDotsHover: boolean;
    draggable: boolean;
    lazyLoad: LazyLoadEnum;
    initialSlide: number | null;
    slidesToShow: number | null;
    slidesToShowTablet: number | null;
    slidesToShowPhone: number | null;
    slidesToScroll: number | null;
    slidesToScrollTablet: number | null;
    slidesToScrollPhone: number | null;
    dots: boolean;
    arrows: boolean;
    arrowStyle: ArrowStyleEnum;
    prevArrowContent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    nextArrowContent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    centerMode: boolean;
    centerPadding: string;
    adaptiveHeight: boolean;
    variableWidth: boolean;
}

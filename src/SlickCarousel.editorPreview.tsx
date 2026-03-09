import { ReactElement } from "react";
import { SlickCarouselPreviewProps } from "../typings/SlickCarouselProps";

export function preview(props: SlickCarouselPreviewProps): ReactElement {
    const { carouselType, slideList, contentTemplate } = props;

    const renderSlides = () => {
        if (carouselType === "static") {
            if (!slideList || slideList.length === 0) {
                return (
                    <div className="slick-carousel-preview-placeholder">
                        <span>Slick Carousel — add slides in the widget properties</span>
                    </div>
                );
            }
            return (
                <div className="slick-carousel-preview-slides">
                    {slideList.map((slide, index) => {
                        const Content = slide.content?.renderer;
                        return (
                            <div key={index} className="slick-carousel-preview-slide">
                                {Content ? (
                                    <Content caption={`Slide ${index + 1}`}>
                                        <div />
                                    </Content>
                                ) : (
                                    <div className="slick-carousel-preview-placeholder">
                                        <span>Slide {index + 1}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            );
        }

        // Dynamic mode
        const Content = contentTemplate?.renderer;
        return Content ? (
            <div className="slick-carousel-slide">
                <Content caption="Slide content">
                    <div />
                </Content>
            </div>
        ) : (
            <div className="slick-carousel-preview-placeholder">
                <span>Slick Carousel — configure a data source and content template</span>
            </div>
        );
    };

    return (
        <div className={`slick-carousel-widget ${props.class}`}>
            <div className="slick-carousel-preview">
                <div className="slick-carousel-slide" style={{ position: "relative", minHeight: 120 }}>
                    {renderSlides()}
                </div>
                <div className="slick-carousel-preview-badge">Slick Carousel</div>
            </div>
        </div>
    );
}

export function getPreviewCss(): string {
    return `
        .slick-carousel-preview {
            position: relative;
            border: 1px solid #264ae5;
            border-radius: 4px;
            overflow: hidden;
        }

        .slick-carousel-preview-placeholder {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 120px;
            background-color: #f0f4ff;
            color: #264ae5;
            font-size: 13px;
            text-align: center;
            padding: 16px;
        }

        .slick-carousel-preview-slides {
            display: flex;
            gap: 4px;
            padding: 8px;
            background-color: #f0f4ff;
            min-height: 120px;
            overflow: hidden;
        }

        .slick-carousel-preview-slide {
            flex: 1;
            min-width: 0;
            border: 1px dashed #264ae5;
            border-radius: 2px;
        }

        .slick-carousel-preview-badge {
            position: absolute;
            top: 8px;
            right: 8px;
            background: #264ae5;
            color: #fff;
            font-size: 11px;
            padding: 2px 8px;
            border-radius: 10px;
        }
    `;
}

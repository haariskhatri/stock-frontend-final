import { useEffect, useState } from "react";

const defaultHeight = 55;

const ToggleButton = ({ isExpanded, onClick }) => {
    return (
        <span className="btn-toggle" onClick={onClick}>
            {isExpanded ? "Show Less" : "Show More"}
        </span>
    );
};

const ReadMore = ({ text }) => {

    const [heightCurrent, setHeightCurrent] = useState(defaultHeight);
    const [heightMax, setHeightMax] = useState(defaultHeight);
    const [heightMin, setHeightMin] = useState(defaultHeight);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflow, setIsOverflow] = useState(false);

    useEffect(() => {
        const element = document.querySelector(".text-display")
        const heightClient = element?.clientHeight || defaultHeight;
        const scrollClient = element?.scrollHeight || defaultHeight;
        if (heightClient !== scrollClient) {
            setIsOverflow(true);
            setHeightMax(scrollClient);
            setHeightMin(heightClient);
            setHeightCurrent(heightClient);
        }
    }, [text]);

    const handleClickBtn = () => {
        setHeightCurrent(isExpanded ? heightMin : heightMax);
        setIsExpanded((prev) => !prev);
    };
    return (
        <div className="read-more">
            <div
                className={`${isExpanded ? "expanded" : "collapsed"} text-display`}
                style={{ height: `${heightCurrent}px` }}
            >
                {text}
            </div>
            {isOverflow && <ToggleButton isExpanded={isExpanded} onClick={handleClickBtn} />}
        </div>
    );
};

export default ReadMore;
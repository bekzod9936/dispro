
import React from 'react';
import { StarRatingGreyIcon } from '../../../assets/icons/FeedBackIcons.tsx/FeedbackIcons';

interface IRating {
    pickedRating: number,
    setPick: any,
}


const RatingFilter: React.FC<IRating> = ({ pickedRating, setPick }) => {

    const ratings = [1, 2, 3, 4, 5]
    const handleStarClick = (item: number) => {
        setPick(item);
        console.log('clikced');

    }
    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            {ratings.map((item: number) => {
                return (<div onClick={() => handleStarClick(item)}>
                    <StarRatingGreyIcon key={item} color={item <= pickedRating ? "#FFC107" : "#C7C7C7"} />
                </div>)
            })}

        </div>
    );
}

export default RatingFilter;

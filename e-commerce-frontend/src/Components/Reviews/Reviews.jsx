import React, { useState, useEffect, useRef } from "react";
import "./Reviews.css";

const LeftArrowIcon = () => (
	<svg
		width="28"
		height="28"
		fill="none"
		stroke="#d84316"
		strokeWidth="2"
		viewBox="0 0 24 24"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M15 19l-7-7 7-7" />
	</svg>
);
const RightArrowIcon = () => (
	<svg
		width="28"
		height="28"
		fill="none"
		stroke="#d84316"
		strokeWidth="2"
		viewBox="0 0 24 24"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M9 5l7 7-7 7" />
	</svg>
);

const reviewsData = [
	{
		name: "Anna K.",
		text: "The cake was absolutely stunning and delicious! Everyone at the party loved it. Will definitely order again!",
		rating: 5,
	},
	{
		name: "Michael S.",
		text: "Ordered a custom piñata and sugar prints for my son's birthday. The quality and service were top-notch!",
		rating: 5,
	},
	{
		name: "Emily R.",
		text: "Beautiful, fresh, and delivered on time. The team was so helpful with my special requests. Highly recommend!",
		rating: 5,
	},
	{
		name: "David P.",
		text: "The best bakery in town! The cake was moist and the design was exactly as I wanted.",
		rating: 5,
	},
	{
		name: "Sara L.",
		text: "Amazing customer service and the sugar prints were a huge hit at our event!",
		rating: 5,
	},
];

const Reviews = () => {
	const [startIdx, setStartIdx] = useState(0);
	const intervalRef = useRef(null);
	const visibleReviews = reviewsData.slice(startIdx, startIdx + 3);

	const handlePrev = () => {
		setStartIdx((prev) => (prev === 0 ? reviewsData.length - 3 : prev - 1));
	};
	const handleNext = () => {
		setStartIdx((prev) => (prev + 3 >= reviewsData.length ? 0 : prev + 1));
	};

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			handleNext();
		}, 3500);
		return () => clearInterval(intervalRef.current);
	}, [startIdx]);

	return (
		<section className="reviews_section">
			<h2 className="reviews_title">What Our Customers Say</h2>
			<div className="reviews_carousel">
				<button
					className="reviews_arrow"
					onClick={handlePrev}
					aria-label="Previous reviews"
				>
					<LeftArrowIcon />
				</button>
				<div className="reviews_list">
					{visibleReviews.map((review, idx) => (
						<div className="review_card" key={idx}>
							<div className="review_rating">
								{Array.from({ length: review.rating }).map((_, i) => (
									<span key={i}>⭐</span>
								))}
							</div>
							<p className="review_text">“{review.text}”</p>
							<div className="review_name">- {review.name}</div>
						</div>
					))}
				</div>
				<button
					className="reviews_arrow"
					onClick={handleNext}
					aria-label="Next reviews"
				>
					<RightArrowIcon />
				</button>
			</div>
		</section>
	);
};

export default Reviews;

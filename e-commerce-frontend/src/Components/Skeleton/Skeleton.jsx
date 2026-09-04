import React from 'react'
import './Skeleton.css'

// Renders `count` placeholder cards shaped like a product Item card, for use
// while the real data is still loading.
export const ProductCardSkeleton = ({ count = 4 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div className="skeleton-card" key={i}>
        <div className="skeleton shimmer skeleton-image" />
        <div className="skeleton shimmer skeleton-line skeleton-line-wide" />
        <div className="skeleton shimmer skeleton-line skeleton-line-narrow" />
      </div>
    ))}
  </>
)

export default ProductCardSkeleton

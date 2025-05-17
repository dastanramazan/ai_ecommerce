import React, { useState } from "react";
import "./Pinata.css";

const pinatas = [
  {
    name: "Classic Star Piñata",
    desc: "Traditional star-shaped piñata, perfect for any celebration.",
    img: "https://placehold.co/300x200?text=Star+Pinata",
    price: "$25",
    details: {
      weight: "600g",
      rating: "4.7",
      title: "Classic Star Piñata",
      description: "Handcrafted star piñata, sturdy and colorful, ready to fill with your favorite treats.",
      ingredients: "Paper, cardboard, non-toxic paint, string.",
      storage: "Store in a dry place, away from direct sunlight.",
      shelfLife: "Best used within 1 year of purchase.",
      nutrition: "Not edible. For party fun only!",
      note: "Custom colors available. Size: 40cm diameter."
    }
  },
  {
    name: "Unicorn Piñata",
    desc: "Magical unicorn piñata for kids' parties and special events.",
    img: "https://placehold.co/300x200?text=Unicorn+Pinata",
    price: "$32",
    details: {
      weight: "700g",
      rating: "4.9",
      title: "Unicorn Piñata",
      description: "Whimsical unicorn design, crafted with care and ready to delight.",
      ingredients: "Paper, cardboard, non-toxic paint, string, glitter.",
      storage: "Store in a dry place, away from direct sunlight.",
      shelfLife: "Best used within 1 year of purchase.",
      nutrition: "Not edible. For party fun only!",
      note: "Custom size and color available. Size: 45cm length."
    }
  },
  {
    name: "Soccer Ball Piñata",
    desc: "Perfect for sports-themed parties and celebrations.",
    img: "https://placehold.co/300x200?text=Soccer+Ball+Pinata",
    price: "$28",
    details: {
      weight: "650g",
      rating: "4.8",
      title: "Soccer Ball Piñata",
      description: "Round piñata styled as a soccer ball, great for active kids.",
      ingredients: "Paper, cardboard, non-toxic paint, string.",
      storage: "Store in a dry place, away from direct sunlight.",
      shelfLife: "Best used within 1 year of purchase.",
      nutrition: "Not edible. For party fun only!",
      note: "Custom team colors available. Size: 38cm diameter."
    }
  },
  {
    name: "Rainbow Donut Piñata",
    desc: "Fun donut-shaped piñata with rainbow sprinkles.",
    img: "https://placehold.co/300x200?text=Donut+Pinata",
    price: "$30",
    details: {
      weight: "680g",
      rating: "4.6",
      title: "Rainbow Donut Piñata",
      description: "Colorful donut piñata, perfect for sweet-themed parties.",
      ingredients: "Paper, cardboard, non-toxic paint, string.",
      storage: "Store in a dry place, away from direct sunlight.",
      shelfLife: "Best used within 1 year of purchase.",
      nutrition: "Not edible. For party fun only!",
      note: "Custom colors and sprinkles available. Size: 42cm diameter."
    }
  }
];

const Pinata = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="pinata_section">
      <h2 className="pinata_title">Our Piñatas</h2>
      <div className="pinata_grid">
        {pinatas.map((item, idx) => (
          <div className="pinata_card" key={idx} onClick={() => setSelected(item)}>
            <img src={item.img} alt={item.name} className="pinata_img" />
            <div className="pinata_info">
              <h3 className="pinata_name">{item.name}</h3>
              <p className="pinata_desc">{item.desc}</p>
              <div className="pinata_price">{item.price}</div>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div className="pinata_modal_overlay" onClick={() => setSelected(null)}>
          <div className="pinata_modal" onClick={e => e.stopPropagation()}>
            <button className="pinata_modal_close" onClick={() => setSelected(null)}>&times;</button>
            <img src={selected.img} alt={selected.name} className="pinata_modal_img" />
            <div className="pinata_modal_content">
              <h3 className="pinata_modal_title">{selected.details.title}</h3>
              <div className="pinata_modal_rating">Rating: {selected.details.rating} / 5</div>
              <div className="pinata_modal_weight">Weight: {selected.details.weight}</div>
              <p className="pinata_modal_desc">{selected.details.description}</p>
              <div className="pinata_modal_ingredients"><b>Materials:</b> {selected.details.ingredients}</div>
              <div className="pinata_modal_storage"><b>Storage:</b> {selected.details.storage}</div>
              <div className="pinata_modal_shelf"><b>Shelf Life:</b> {selected.details.shelfLife}</div>
              <div className="pinata_modal_nutrition"><b>Note:</b> {selected.details.nutrition}</div>
              <div className="pinata_modal_note">{selected.details.note}</div>
              <div className="pinata_modal_price">Price: {selected.price}</div>
              <button className="pinata_modal_order_btn">Add to Order</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pinata;

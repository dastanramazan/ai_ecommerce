import React, { useState } from "react";
import "./Cakes.css";

const cakes = [
  {
    name: "Classic Chocolate Cake",
    desc: "Rich, moist chocolate layers with creamy chocolate frosting.",
    img: "https://placehold.co/300x200?text=Chocolate+Cake",
    price: "$35",
    details: {
      weight: "1300g",
      rating: "4.6",
      title: "Chocolate Cake Standard",
      description: "Aromatic chocolate sponge cake soaked in classic cream with a touch of condensed milk. Topped with chocolate shavings.",
      ingredients: "Sugar, condensed milk, butter, wheat flour, baking powder, sour cream, cocoa.",
      storage: "Store at temperatures not exceeding +6ºC.",
      shelfLife: "No more than 5 days from production date.",
      nutrition: "Proteins – 8g. Fats – 27g. Carbohydrates – 45g. Energy: 1950 kJ/465 kcal per 100g.",
      note: "Production date and time are indicated on the package. Net weight 1300g."
    }
  },
  {
    name: "Red Velvet Dream",
    desc: "Velvety red layers with tangy cream cheese icing.",
    img: "https://placehold.co/300x200?text=Red+Velvet+Cake",
    price: "$38",
    details: {
      weight: "1200g",
      rating: "4.8",
      title: "Red Velvet Dream",
      description: "Soft red velvet sponge with a delicate cream cheese frosting. Perfect for celebrations.",
      ingredients: "Sugar, cream cheese, butter, wheat flour, eggs, cocoa, food coloring.",
      storage: "Store at temperatures not exceeding +6ºC.",
      shelfLife: "No more than 4 days from production date.",
      nutrition: "Proteins – 7g. Fats – 25g. Carbohydrates – 47g. Energy: 1880 kJ/450 kcal per 100g.",
      note: "Production date and time are indicated on the package. Net weight 1200g."
    }
  },
  {
    name: "Rainbow Celebration Cake",
    desc: "Colorful layers and vanilla buttercream, perfect for parties!",
    img: "https://placehold.co/300x200?text=Rainbow+Cake",
    price: "$42",
    details: {
      weight: "1400g",
      rating: "4.7",
      title: "Rainbow Celebration Cake",
      description: "Bright rainbow sponge layers with classic vanilla buttercream. A festive favorite!",
      ingredients: "Sugar, butter, wheat flour, eggs, food coloring, vanilla extract.",
      storage: "Store at temperatures not exceeding +6ºC.",
      shelfLife: "No more than 3 days from production date.",
      nutrition: "Proteins – 6g. Fats – 22g. Carbohydrates – 52g. Energy: 1800 kJ/430 kcal per 100g.",
      note: "Production date and time are indicated on the package. Net weight 1400g."
    }
  },
  {
    name: "Berry Bliss Cake",
    desc: "Vanilla sponge, fresh berries, and whipped cream.",
    img: "https://placehold.co/300x200?text=Berry+Bliss+Cake",
    price: "$40",
    details: {
      weight: "1250g",
      rating: "4.9",
      title: "Berry Bliss Cake",
      description: "Light vanilla sponge, fresh seasonal berries, and airy whipped cream.",
      ingredients: "Sugar, cream, wheat flour, eggs, berries, vanilla extract.",
      storage: "Store at temperatures not exceeding +6ºC.",
      shelfLife: "No more than 2 days from production date.",
      nutrition: "Proteins – 5g. Fats – 20g. Carbohydrates – 50g. Energy: 1700 kJ/410 kcal per 100g.",
      note: "Production date and time are indicated on the package. Net weight 1250g."
    }
  }
];

const Cakes = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="cakes_section">
      <h2 className="cakes_title">Our Signature Cakes</h2>
      <div className="cakes_grid">
        {cakes.map((cake, idx) => (
          <div className="cake_card" key={idx} onClick={() => setSelected(cake)}>
            <img src={cake.img} alt={cake.name} className="cake_img" />
            <div className="cake_info">
              <h3 className="cake_name">{cake.name}</h3>
              <p className="cake_desc">{cake.desc}</p>
              <div className="cake_price">{cake.price}</div>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div className="cake_modal_overlay" onClick={() => setSelected(null)}>
          <div className="cake_modal" onClick={e => e.stopPropagation()}>
            <button className="cake_modal_close" onClick={() => setSelected(null)}>&times;</button>
            <img src={selected.img} alt={selected.name} className="cake_modal_img" />
            <div className="cake_modal_content">
              <h3 className="cake_modal_title">{selected.details.title}</h3>
              <div className="cake_modal_rating">Rating: {selected.details.rating} / 5</div>
              <div className="cake_modal_weight">Weight: {selected.details.weight}</div>
              <p className="cake_modal_desc">{selected.details.description}</p>
              <div className="cake_modal_ingredients"><b>Ingredients:</b> {selected.details.ingredients}</div>
              <div className="cake_modal_storage"><b>Storage:</b> {selected.details.storage}</div>
              <div className="cake_modal_shelf"><b>Shelf Life:</b> {selected.details.shelfLife}</div>
              <div className="cake_modal_nutrition"><b>Nutrition (per 100g):</b> {selected.details.nutrition}</div>
              <div className="cake_modal_note">{selected.details.note}</div>
              <div className="cake_modal_price">Price: {selected.price}</div>
              <button className="cake_modal_order_btn">Add to Order</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cakes;

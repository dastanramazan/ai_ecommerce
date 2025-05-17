import React, { useState } from "react";
import "./SugarSheets.css";

const sugarSheets = [
  {
    name: "Classic Sugar Sheet",
    desc: "Smooth, edible sugar sheet for cake decorating.",
    img: "https://placehold.co/300x200?text=Sugar+Sheet",
    price: "$8",
    details: {
      weight: "100g",
      rating: "4.7",
      title: "Classic Sugar Sheet",
      description: "Flexible, easy-to-cut sugar sheet for custom cake toppers and edible prints.",
      ingredients: "Sugar, cornstarch, glucose syrup, vegetable oil, stabilizers.",
      storage: "Store in a cool, dry place.",
      shelfLife: "Best before 6 months from production date.",
      nutrition: "Proteins – 0g. Fats – 0g. Carbohydrates – 98g. Energy: 1650 kJ/390 kcal per 100g.",
      note: "Custom prints available. Sheet size: A4."
    }
  },
  {
    name: "Photo Print Sugar Sheet",
    desc: "Edible photo print for cakes and cupcakes.",
    img: "https://placehold.co/300x200?text=Photo+Print+Sheet",
    price: "$12",
    details: {
      weight: "110g",
      rating: "4.9",
      title: "Photo Print Sugar Sheet",
      description: "High-resolution edible ink print on sugar sheet. Perfect for birthdays and events.",
      ingredients: "Sugar, cornstarch, glucose syrup, vegetable oil, edible ink.",
      storage: "Store in a cool, dry place.",
      shelfLife: "Best before 6 months from production date.",
      nutrition: "Proteins – 0g. Fats – 0g. Carbohydrates – 98g. Energy: 1650 kJ/390 kcal per 100g.",
      note: "Upload your own image for custom orders. Sheet size: A4."
    }
  },
  {
    name: "Glitter Sugar Sheet",
    desc: "Sparkling edible sugar sheet for a festive touch.",
    img: "https://placehold.co/300x200?text=Glitter+Sugar+Sheet",
    price: "$10",
    details: {
      weight: "105g",
      rating: "4.8",
      title: "Glitter Sugar Sheet",
      description: "Edible glitter finish, adds shimmer to cakes and cookies.",
      ingredients: "Sugar, cornstarch, glucose syrup, vegetable oil, edible glitter.",
      storage: "Store in a cool, dry place.",
      shelfLife: "Best before 6 months from production date.",
      nutrition: "Proteins – 0g. Fats – 0g. Carbohydrates – 98g. Energy: 1650 kJ/390 kcal per 100g.",
      note: "Sheet size: A4. Custom colors available."
    }
  },
  {
    name: "Custom Shape Sugar Sheet",
    desc: "Pre-cut shapes for themed cakes and cupcakes.",
    img: "https://placehold.co/300x200?text=Custom+Shape+Sheet",
    price: "$14",
    details: {
      weight: "115g",
      rating: "4.6",
      title: "Custom Shape Sugar Sheet",
      description: "Choose from stars, hearts, letters, and more. Ready to use!",
      ingredients: "Sugar, cornstarch, glucose syrup, vegetable oil, food coloring.",
      storage: "Store in a cool, dry place.",
      shelfLife: "Best before 6 months from production date.",
      nutrition: "Proteins – 0g. Fats – 0g. Carbohydrates – 98g. Energy: 1650 kJ/390 kcal per 100g.",
      note: "Contact us for custom shapes and bulk orders."
    }
  }
];

const SugarSheets = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState(null);

  const openModal = (sheet) => {
    setSelectedSheet(sheet);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSheet(null);
  };

  return (
    <section className="sugar_section" id="sugar-sheets">
      <h2 className="sugar_title">Sugar Sheets & Edible Prints</h2>
      <div className="sugar_grid">
        {sugarSheets.map((sheet, idx) => (
          <div
            className="sugar_card"
            key={idx}
            onClick={() => openModal(sheet)}
          >
            <img src={sheet.img} alt={sheet.name} className="sugar_img" />
            <div className="sugar_info">
              <h3 className="sugar_name">{sheet.name}</h3>
              <p className="sugar_desc">{sheet.desc}</p>
              <span className="sugar_price">{sheet.price}</span>
            </div>
          </div>
        ))}
      </div>
      {modalOpen && selectedSheet && (
        <div className="sugar_modal_overlay" onClick={closeModal}>
          <div
            className="sugar_modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="sugar_modal_close" onClick={closeModal}>
              &times;
            </button>
            <img
              src={selectedSheet.img}
              alt={selectedSheet.name}
              className="sugar_modal_img"
            />
            <div className="sugar_modal_content">
              <h3>{selectedSheet.details.title}</h3>
              <p>{selectedSheet.details.description}</p>
              <ul className="sugar_modal_list">
                <li>
                  <strong>Ingredients:</strong> {selectedSheet.details.ingredients}
                </li>
                <li>
                  <strong>Storage:</strong> {selectedSheet.details.storage}
                </li>
                <li>
                  <strong>Shelf Life:</strong> {selectedSheet.details.shelfLife}
                </li>
                <li>
                  <strong>Nutrition:</strong> {selectedSheet.details.nutrition}
                </li>
                <li>
                  <strong>Note:</strong> {selectedSheet.details.note}
                </li>
              </ul>
              <button className="sugar_modal_order">Add to Order</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SugarSheets;

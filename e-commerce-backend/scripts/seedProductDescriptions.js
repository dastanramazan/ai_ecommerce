// One-off content patch: fills in real per-product descriptions for the
// existing catalog (which had none) and fixes a "Break Pad" -> "Brake Pad"
// typo left over from the original seed data.
// Usage: npm run seed-descriptions
require("dotenv").config();
const mongoose = require("mongoose");

const DESCRIPTIONS = {
  9: "Duralast's entry-level ceramic compound - quiet, low-dust braking for daily driving without the premium price tag.",
  10: "Duralast Gold steps up the ceramic formula for stronger stopping power and longer pad life, while keeping noise and brake dust to a minimum.",
  11: "A semi-metallic compound built for stronger bite under hard braking - a good match for drivers who tow or carry heavier loads.",
  12: "Reliable semi-metallic stopping power at a value price, a direct-fit replacement for worn factory pads.",
  13: "Duralast's semi-metallic pad for consistent braking performance across everyday driving conditions.",
  14: "Direct OE-fit semi-metallic pads that restore factory-level braking feel and stopping distance.",
  17: "Brembo's ceramic pad brings track-proven engineering to the street - sharper pedal feel and less dust than standard OE pads.",
  19: "Built for severe duty - trucks, trailers, and heavy stop-and-go use where standard pads wear out fast.",
  32: "A dependable replacement brake pad for everyday driving - straightforward fitment, straightforward stopping power.",
  20: "Mobil 1's flagship full synthetic - engineered to protect at high temperatures and extend intervals between oil changes.",
  21: "Pennzoil's PurePlus full synthetic, made from natural gas for cleaner-burning protection right from cold start.",
  22: "Castrol EDGE's Fluid Titanium technology stiffens under pressure to reduce metal-on-metal wear in high-load conditions.",
  24: "A full synthetic built specifically for diesel engines, formulated to handle the higher heat and soot loads diesels produce.",
  25: "A conventional heavy-duty diesel oil for fleets and older diesel engines that don't need a full synthetic.",
  26: "Formulated specifically for motorcycles, with the extra film strength that wet clutches and close-tolerance engines need.",
  27: "Motorcraft's factory-spec synthetic blend - the same oil Ford dealerships use for scheduled maintenance.",
  28: "A complete timing belt and water pump kit for select Lexus and Toyota models - everything you need in one box instead of ordering parts separately.",
  29: "A direct-fit replacement starter for Ford, New Holland, and Case diesel equipment - built to get heavy machinery running again.",
  30: "A direct replacement turbocharger for Perkins and Massey Ferguson diesel engines, restoring lost power and towing capacity.",
  31: "Bosch's fine-wire iridium plugs deliver a stronger, more consistent spark for smoother idling and better fuel efficiency.",
};

const NAME_FIXES = {
  32: "Brake Pad",
};

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error("Missing MONGODB_URI in environment.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  const Product = mongoose.model("Product", new mongoose.Schema({}, { strict: false }));

  let updated = 0;
  for (const [id, description] of Object.entries(DESCRIPTIONS)) {
    const update = { description };
    if (NAME_FIXES[id]) update.name = NAME_FIXES[id];
    const result = await Product.updateOne({ id: Number(id) }, { $set: update });
    if (result.matchedCount > 0) updated += 1;
  }

  console.log(`Updated ${updated} of ${Object.keys(DESCRIPTIONS).length} products.`);
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

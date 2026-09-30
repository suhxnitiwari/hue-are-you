// Quiz questions and season data.
//
// Every answer nudges three axes:
//   t = temperature  (negative = cool,  positive = warm)
//   v = value        (negative = deep,  positive = light)
//   c = chroma       (negative = soft,  positive = bright)

const QUESTIONS = [
  {
    title: "Look at the veins on your inner wrist in daylight. What color are they?",
    hint: "Don't overthink it. Go with your first impression.",
    options: [
      { label: "Blue or purple", t: -2 },
      { label: "Green or olive", t: 2 },
      { label: "A mix / hard to tell", t: 0 },
    ],
  },
  {
    title: "Which jewelry makes your skin look better?",
    hint: "Hold each one near your face if you can.",
    options: [
      { label: "Silver, platinum, white gold", t: -2 },
      { label: "Yellow gold, brass, copper", t: 2 },
      { label: "Both look good", t: 0 },
    ],
  },
  {
    title: "Which looks better next to your face?",
    options: [
      { label: "Crisp, pure white", t: -1, c: 1 },
      { label: "Soft cream or ivory", t: 1, c: -0.5 },
      { label: "Both are fine", t: 0 },
    ],
  },
  {
    title: "Which shades do you look best in?",
    options: [
      { label: "Coral, peach, orange-red", t: 2 },
      { label: "Fuchsia, berry, blue-red", t: -2 },
      { label: "Not sure", t: 0 },
    ],
  },
  {
    title: "How deep is your skin?",
    hint: "This helps a little, but hair, eyes and contrast matter more. Every season includes every skin depth.",
    options: [
      { label: "Very fair", v: 1 },
      { label: "Light", v: 0.5 },
      { label: "Medium", v: 0 },
      { label: "Tan or olive", v: 0 },
      { label: "Deep", v: -0.5 },
      { label: "Very deep", v: -1 },
    ],
  },
  {
    title: "What's your natural hair color (or what was it before any gray)?",
    options: [
      { label: "Platinum or light blonde", v: 2, t: -0.5 },
      { label: "Golden or strawberry blonde", v: 1.5, t: 1 },
      { label: "Ash blonde or ash light brown", v: 0.5, t: -1, c: -1 },
      { label: "Medium to dark brown", v: -0.5 },
      { label: "Red, copper or auburn", t: 2 },
      { label: "Dark brown with warm or red tints", v: -1.5, t: 1 },
      { label: "Black or blue-black", v: -2, t: -0.5, c: 0.5 },
    ],
  },
  {
    title: "What are your eyes like?",
    options: [
      { label: "Clear and vivid: bright blue, turquoise or green", c: 2 },
      { label: "Icy: pale blue or clear gray", t: -1, v: 0.5, c: 0.5 },
      { label: "Soft and blended: gray-green, gray-blue, muted hazel", c: -2 },
      { label: "Warm: golden brown, amber, golden hazel", t: 1.5 },
      { label: "Very dark brown or black-brown", v: -1.5, c: 0.5 },
    ],
  },
  {
    title: "Picture a black-and-white photo of yourself. How much contrast is there between your hair and your skin?",
    options: [
      { label: "High: they're very different", c: 2, v: -0.5 },
      { label: "Medium", c: 0 },
      { label: "Low: they almost blend together", c: -2, v: 0.5 },
    ],
  },
  {
    title: "When you wear head-to-toe black, you look...",
    options: [
      { label: "Sharp and striking", c: 1, v: -1 },
      { label: "Tired, washed out or harsh", c: -1, v: 1 },
      { label: "Fine, nothing special", c: 0 },
    ],
  },
  {
    title: "Which colors get you the most compliments?",
    options: [
      { label: "Vivid and saturated", c: 2 },
      { label: "Soft, dusty, muted", c: -2 },
      { label: "Earthy: olive, rust, mustard", t: 1.5, c: -0.5, v: -0.5 },
      { label: "Cool jewel tones: sapphire, emerald, plum", t: -1.5, c: 1, v: -0.5 },
      { label: "Light pastels", v: 1.5, c: -0.5 },
    ],
  },
  {
    title: "What does the sun usually do to your skin?",
    options: [
      { label: "Burns easily, rarely tans", t: -0.5, v: 0.5 },
      { label: "Burns first, then tans", t: 0 },
      { label: "Tans easily, turns golden", t: 1 },
      { label: "Deepens a little, rarely burns", t: 0 },
    ],
  },
];

// target = [t, v, c], each from -1 to 1. The quiz picks the closest season.
const SEASONS = {
  "light-spring": {
    name: "Light Spring", family: "spring", target: [0.5, 1, 0.3],
    tagline: "Warm, light and fresh",
    description:
      "You look best in light, warm, clear colors, like peach, buttercup and aqua. Heavy, dark colors can overpower you. Light Springs can have any skin depth: what matters is the overall lightness and warmth of your coloring.",
    palette: ["FFF4DC","F3E3C3","E6CFA7","FFE5B4","FFCBA4","FFB7A5","FF9F80","F28C8C","F6C1C7","F7E7A1","F9D162","C6E2A0","B4E3C4","8FD3C9","7FCDBB","A7D8F0","9BC4E2","C9B3E0","E8A87C","C8A27A"],
    avoid: ["000000","4B0082","5C4033","800020","36454F"],
    neutrals: "Ivory, camel, light warm gray, soft navy",
    metals: "Light gold, rose gold",
    lips: "Peach, coral pink, warm rosy nude",
  },
  "true-spring": {
    name: "True Spring", family: "spring", target: [1, 0.3, 0.6],
    tagline: "Warm, sunny and lively",
    description:
      "Your coloring is clearly golden. You glow in warm, clear colors, like coral, golden yellow, apple green and turquoise. Cool grays and dusty colors make you look dull.",
    palette: ["FFFDD0","F5DEB3","D2A56D","C68E3F","8B5A2B","FFD700","FFB347","FF7F50","FF6347","FA8072","F08080","E9967A","8DB600","9ACD32","3CB371","40E0D0","00A5A8","4F97D0","9370DB","F4C430"],
    avoid: ["000000","808080","800020","B0C4DE","4B0082"],
    neutrals: "Cream, camel, golden brown, warm navy",
    metals: "Yellow gold, brass",
    lips: "Coral, warm red, peachy nude",
  },
  "bright-spring": {
    name: "Bright Spring", family: "spring", target: [0.5, 0.1, 1],
    tagline: "Clear, vivid and warm-leaning",
    description:
      "Your features have a lot of contrast and sparkle. Saturated colors match your energy: hot coral, kelly green, bright turquoise. Muted or dusty colors fade you out.",
    palette: ["FFFFF0","1B2A6B","FF4F5E","FF6F61","FF3E6C","E0115F","FFD300","F4E04D","FFA62B","FFB6A1","00B140","32CD32","00C2A8","00B7EB","1E90FF","0077C8","7F4FC9","6B4226","C19A6B","3C3C3C"],
    avoid: ["C4A4A4","A89F91","8B7D6B","D8C3B7","6E6E6E"],
    neutrals: "Bright navy, warm charcoal, chocolate, ivory",
    metals: "Shiny gold, polished rose gold",
    lips: "Bright coral, poppy red, warm fuchsia",
  },
  "light-summer": {
    name: "Light Summer", family: "summer", target: [-0.5, 1, -0.2],
    tagline: "Cool, light and airy",
    description:
      "You look best in cool, light, gentle colors, like powder blue, lavender and soft rose. Very dark or very warm colors look heavy on you.",
    palette: ["F8F8FF","E6E6FA","D8BFD8","C3B1E1","D6A8D6","B0C4DE","B0E0E6","AFCBE8","87AFC7","AEE3D6","98D7C2","F4C2C2","F7A8B8","E8A0BF","F5F3B8","C7CCD6","8C9DB5","6B7FA3","5D7092","CFD8E3"],
    avoid: ["FF8C00","8B4513","000000","D4A017","556B2F"],
    neutrals: "Soft white, light blue-gray, dove gray, soft navy",
    metals: "Silver, white gold, soft rose gold",
    lips: "Soft pink, rose, sheer berry",
  },
  "true-summer": {
    name: "True Summer", family: "summer", target: [-1, 0.2, -0.4],
    tagline: "Cool, calm and elegant",
    description:
      "Your coloring is cool and softly blended. Rose, raspberry, slate blue and spruce look great on you. Orange, gold and bright warm colors clash with you.",
    palette: ["F5F5F5","C0C8D0","778899","5D6D7E","2F4F6F","4682B4","6A8EAE","87A9C9","5F9EA0","88B8A8","2E6F6A","D8A7B1","E3B7D0","C27BA0","B5657E","9C4F75","A18CD1","8E7CC3","7B6FA8","3B3F5C"],
    avoid: ["FF7F00","FFD700","8B4513","808000","FF6347"],
    neutrals: "Slate gray, soft navy, cool taupe, off-white",
    metals: "Silver, pewter, platinum",
    lips: "Rose, raspberry, cool mauve",
  },
  "soft-summer": {
    name: "Soft Summer", family: "summer", target: [-0.4, 0, -1],
    tagline: "Muted, smoky and cool-leaning",
    description:
      "Your features blend together gently, so dusty and smoky colors suit you best: sage, mauve, gray-blue, soft plum. Neon and pure black are too harsh for you.",
    palette: ["EDE6E3","D6CFC7","A89F91","8A8D91","5E6770","3E4A57","4A5A6A","6F8FAF","8FA9B8","9CAF9A","7A9A8A","5F7F7A","B4A6C8","9A8AAE","7D6B8D","D8B8C0","C9A0A8","B07D8A","9E6B7A","E6D8C9"],
    avoid: ["FF0000","FFFF00","FF8C00","000000","00FF7F"],
    neutrals: "Mushroom, taupe, charcoal blue, soft gray",
    metals: "Brushed silver, pewter, matte rose gold",
    lips: "Dusty rose, mauve, soft berry",
  },
  "soft-autumn": {
    name: "Soft Autumn", family: "autumn", target: [0.4, 0, -1],
    tagline: "Muted, warm and earthy",
    description:
      "Your coloring is soft and gently warm. Muted peach, olive, soft teal and camel look natural on you. Bright, icy or neon colors are too much.",
    palette: ["F3E5D0","E2C2A2","E3CBA8","C8A97E","A58B6F","8B7355","6B5B4B","D8A48F","C98C73","BA7B5E","D4A373","C5B358","A9A45E","8A9A5B","7C8C6B","5E7B6E","6B8E8A","7A8FA0","B38A8A","9C6B6B"],
    avoid: ["000000","FF00FF","00BFFF","FFFFFF","4169E1"],
    neutrals: "Oatmeal, camel, soft brown, warm gray",
    metals: "Brushed gold, antique brass, bronze",
    lips: "Muted peach, terracotta rose, warm nude",
  },
  "true-autumn": {
    name: "True Autumn", family: "autumn", target: [1, -0.3, -0.4],
    tagline: "Warm, rich and golden",
    description:
      "Your coloring is fully warm. Rust, mustard, olive, forest green and teal make you glow. Icy pastels and cool pinks look cold and out of place on you.",
    palette: ["FFF0D5","D2B48C","C19A6B","A0522D","8B4513","5C4033","CC5500","E2725B","D2691E","B7410E","9E3B1B","8A3324","DAA520","E1AD01","808000","6B8E23","556B2F","2E5E4E","008080","2F6F73"],
    avoid: ["FF69B4","E0FFFF","C0C0C0","000000","FF00FF"],
    neutrals: "Camel, chocolate, olive, cream",
    metals: "Yellow gold, copper, bronze",
    lips: "Brick red, terracotta, warm caramel",
  },
  "deep-autumn": {
    name: "Deep Autumn", family: "autumn", target: [0.5, -1, -0.1],
    tagline: "Deep, warm and rich",
    description:
      "Your coloring is deep with warm undertones. Rich, dark, warm colors suit you: maroon, hunter green, deep teal, ochre. Pale pastels look washed out on you.",
    palette: ["F5E6C8","C9A66B","8B5A2B","5C3A21","3B2F2F","3A3530","800000","8B0000","7E3C3C","A0522D","B5541B","CC7722","E08D3C","C9A227","5B5B1F","355E3B","1F4D3A","0F5257","114B5F","4A2040"],
    avoid: ["FFB6C1","E6E6FA","B0E0E6","C0C0C0","FFFACD"],
    neutrals: "Espresso, warm charcoal, olive, cream",
    metals: "Antique gold, bronze, copper",
    lips: "Deep brick, chocolate berry, burnt orange",
  },
  "deep-winter": {
    name: "Deep Winter", family: "winter", target: [-0.5, -1, 0.3],
    tagline: "Deep, dramatic and cool-leaning",
    description:
      "Your features are deep and striking. Black, pure white and deep jewel tones like sapphire, emerald and blackberry look powerful on you. Beige and soft warm colors make you look dull.",
    palette: ["FFFFFF","000000","2C2C2C","36454F","1C2841","002147","191970","0F52BA","00563F","006B5B","008B8B","4B0082","5B2C6F","6C3082","8B008B","800020","9B111E","C8102E","DC143C","E0115F"],
    avoid: ["F5DEB3","FFDAB9","D2B48C","FFA07A","C3B091"],
    neutrals: "Black, charcoal, deep navy, pure white",
    metals: "Silver, platinum, gunmetal",
    lips: "Deep berry, wine, true red",
  },
  "true-winter": {
    name: "True Winter", family: "winter", target: [-1, -0.3, 0.6],
    tagline: "Cool, crisp and high-contrast",
    description:
      "Your coloring is clearly cool with strong contrast. Cobalt, true red, emerald and icy tints look great on you. Orange, gold and earthy browns fight with your coloring.",
    palette: ["FFFFFF","000000","4A4A4A","000080","0047AB","4169E1","B0E0FF","E0F7FF","F0F8FF","E6E6FA","008080","00A86B","50C878","CE1126","D1005B","C71585","FF1493","7851A9","9966CC","1B1B3A"],
    avoid: ["FF8C00","D2691E","DAA520","808000","F5DEB3"],
    neutrals: "Black, pure white, charcoal, navy",
    metals: "Silver, platinum, white gold",
    lips: "Blue-red, fuchsia, cool berry",
  },
  "bright-winter": {
    name: "Bright Winter", family: "winter", target: [-0.5, -0.1, 1],
    tagline: "Electric, clear and cool-leaning",
    description:
      "You have a lot of contrast and clarity. The brightest colors suit you: electric blue, hot pink, emerald, lemon. Muted or dusty colors look dull on you.",
    palette: ["FFFFFF","F0F0F0","C0C0C0","000000","1C1C3C","2F2F4F","0033A0","0066FF","00B7EB","00CED1","00A36C","1FAF5A","FFEF00","FF0040","FF007F","E4007C","FF69B4","9400D3","7B2CBF","6A0DAD"],
    avoid: ["A89F91","C8A97E","8B7355","D8B8C0","9CAF9A"],
    neutrals: "Black, bright white, charcoal, true navy",
    metals: "Polished silver, platinum",
    lips: "Hot pink, cherry red, bright fuchsia",
  },
};

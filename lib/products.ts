export const products = [
  {
    name: "CapInsta",
    slug: "capinsta",
    url: "https://capinsta.huygenstudios.com/",
    image: "/creatives/assets/Capinsta.png",
    shortDescription:
      "A browser-based AI video editor for generating accurate, animated captions and exporting captioned video, SRT, or VTT files.",
    audience:
      "Creators, social teams, educators, and small production teams working with short-form or spoken-video content.",
    features: [
      "Automatic captions with word-level timing",
      "Active-word highlighting and reusable motion presets",
      "English, Hinglish, Telgish, and mixed-language workflows",
      "Real-time caption, wording, and timing adjustments",
      "Captioned video, SRT, and VTT exports",
      "Temporary media storage that clears after inactivity",
    ],
  },
] as const;

export const capInsta = products[0];


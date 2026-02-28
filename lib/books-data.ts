export interface Book {
  title: string;
  author: string;
  year: number;
  tags: string[];
  description: string;
}

export const suggestions = [
  "The Great Gatsby",
  "Dune",
  "Project Hail Mary",
  "The Midnight Library",
  "Piranesi",
  "Klara and the Sun",
];

export const featuredBooks: Book[] = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    year: 2020,
    tags: ["Fiction", "Fantasy", "Philosophy"],
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    year: 2021,
    tags: ["Sci-Fi", "Adventure", "Humor"],
    description:
      "A lone astronaut must save the earth from disaster. His crewmates dead, his memories fading, he must figure out an impossible scientific puzzle with an unexpected ally.",
  },
  {
    title: "Piranesi",
    author: "Susanna Clarke",
    year: 2020,
    tags: ["Fantasy", "Mystery", "Literary"],
    description:
      "Piranesi lives in the House. Perhaps he always has. The beauty of the House is immeasurable; its Kindness infinite. A haunting and deeply strange novel.",
  },
  {
    title: "Pachinko",
    author: "Min Jin Lee",
    year: 2017,
    tags: ["Historical", "Family Saga", "Literary"],
    description:
      "A sweeping saga following four generations of a Korean family through the tumult of the 20th century, from Korea to Japan and beyond.",
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    year: 1979,
    tags: ["Sci-Fi", "Comedy", "Classic"],
    description:
      "Seconds before Earth is demolished to make way for a galactic freeway, Arthur Dent is plucked off the planet by his friend Ford Prefect.",
  },
  {
    title: "Circe",
    author: "Madeline Miller",
    year: 2018,
    tags: ["Fantasy", "Mythology", "Literary"],
    description:
      "In the house of Helios, god of the sun, a daughter is born. But Circe is a strange child, and turns to the world of mortals for companionship.",
  },
];

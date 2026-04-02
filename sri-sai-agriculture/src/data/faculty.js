export const departments = [
  { id: "agri", label: "Agriculture" },
  { id: "bio",  label: "Biology" },
  { id: "chem", label: "Chemistry" },
  { id: "zoo",  label: "Zoology" },
];

export const faculty = {
  agri: [
    { initials: "DV", name: "Divi Vamsi Krishna",   dept: "Agriculture",           exp: "Agriculture Faculty · Senior Lead" },
    { initials: "SR", name: "Sudhineedi Ramesh",     dept: "Agriculture · Science", exp: "Agriculture & Science Faculty" },
    { initials: "PT", name: "Patchala Thomas",       dept: "Agriculture",           exp: "Agriculture Faculty" },
  ],
  bio: [
    { initials: "SR", name: "Sudhineedi Ramesh",     dept: "Biology",   exp: "Biology & Science Faculty" },
    { initials: "PT", name: "Patchala Thomas",       dept: "Biology",   exp: "Life Sciences Faculty" },
  ],
  chem: [
    { initials: "DV", name: "Divi Vamsi Krishna",   dept: "Chemistry", exp: "Chemistry Faculty" },
    { initials: "SR", name: "Sudhineedi Ramesh",     dept: "Chemistry", exp: "Chemistry Faculty" },
  ],
  zoo: [
    { initials: "PT", name: "Patchala Thomas",       dept: "Zoology",   exp: "Zoology Faculty" },
    { initials: "DV", name: "Divi Vamsi Krishna",   dept: "Zoology",   exp: "Zoology & Agriculture Faculty" },
  ],
};

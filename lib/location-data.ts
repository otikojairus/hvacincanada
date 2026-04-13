export type RawLocationRow = {
  countryName: "Canada";
  stateName: string;
  cities: string[];
};

// Ontario-first launch list. Additional provinces can be appended once indexing settles.
export const RAW_LOCATION_ROWS: RawLocationRow[] = [
  {
    countryName: "Canada",
    stateName: "Ontario",
    cities: [
      "Toronto",
      "Ottawa",
      "Mississauga",
      "Brampton",
      "Hamilton",
      "London",
      "Markham",
      "Vaughan",
      "Kitchener",
      "Windsor",
      "Richmond Hill",
      "Oakville",
      "Burlington",
      "Oshawa",
      "Barrie",
      "St. Catharines",
      "Guelph",
      "Cambridge",
      "Kingston",
      "Waterloo",
      "Whitby",
      "Ajax",
      "Milton",
      "Pickering",
      "Newmarket",
      "Niagara Falls",
      "Brampton East",
      "Brantford",
      "Peterborough",
      "Thunder Bay",
      "Sault Ste. Marie",
      "Sudbury",
      "North Bay",
      "Orillia",
      "Belleville",
      "Cornwall",
      "Welland",
      "Aurora",
      "Orangeville",
      "Chatham",
    ],
  },
];

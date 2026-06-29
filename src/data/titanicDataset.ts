export interface Passenger {
  id: number;
  survived: boolean;
  pclass: number; // 1, 2, 3
  name: string;
  sex: 'male' | 'female';
  age?: number;
  ticket: string;
  fare: number;
  cabin?: string;
}

export const TITANIC_CSV = `Survived,Pclass,Name,Sex,Age,Ticket,Fare,Cabin
0,3,"Braund, Mr. Owen Harris",male,22,A/5 21171,7.25,
1,1,"Cumings, Mrs. John Bradley (Florence Briggs Thayer)",female,38,PC 17599,71.2833,C85
1,3,"Heikkinen, Miss. Laina",female,26,STON/O2. 3101282,7.925,
1,1,"Futrelle, Mrs. Jacques Heath (Lily May Peel)",female,35,113803,53.1,C123
0,3,"Allen, Mr. William Henry",male,35,373450,8.05,
0,3,"Moran, Mr. James",male,,330877,8.4583,
0,1,"McCarthy, Mr. Timothy J",male,54,17463,51.8625,E46
0,3,"Palsson, Master. Gosta Leonard",male,2,349909,21.075,
1,3,"Johnson, Mrs. Oscar W (Elisabeth Vilhelmina Berg)",female,27,347742,11.1333,
1,2,"Nasser, Mrs. Nicholas (Adele Achem)",female,14,237736,30.0708,
1,3,"Sandstrom, Miss. Marguerite Rut",female,4,PP 9549,16.7,G6
1,1,"Bonnell, Miss. Elizabeth",female,58,113783,26.55,C103
0,3,"Saundercock, Mr. William Henry",male,20,A/5. 2151,8.05,
0,3,"Andersson, Mr. Anders Johan",male,39,347082,31.275,
0,3,"Vestrom, Miss. Hulda Amanda Adolfina",female,14,350406,7.8542,
1,2,"Hewlett, Mrs. (Mary D Kingcome) ",female,55,248706,16,
0,3,"Rice, Master. Eugene",male,2,382652,29.125,
1,2,"Williams, Mr. Charles Eugene",male,,244373,13,
0,3,"Vander Planke, Mrs. Julius (Emelia Maria Vandemoortele)",female,31,345763,18,
1,3,"Masselmani, Mrs. Fatima",female,,2649,7.225,
0,2,"Fynney, Mr. Joseph J",male,35,239865,26,
1,2,"Beesley, Mr. Lawrence",male,34,248698,13,D56
1,3,"McGowan, Miss. Anna ""Annie""",female,15,330923,8.0292,
1,1,"Sloper, Mr. William Thompson",male,28,113788,35.5,A6
0,3,"Palsson, Miss. Torborg Danira",female,8,349909,21.075,
1,3,"Asplund, Mrs. Carl Oscar (Selma Augusta Emilia Johansson)",female,38,347077,31.3875,
0,3,"Emir, Mr. Farred Chehab",male,,2631,7.225,
0,1,"Fortune, Mr. Charles Alexander",male,19,19950,263,C23 C25 C27
1,3,"O'Dwyer, Miss. Ellen ""Nellie""",female,,330959,7.8792,
0,3,"Todoroff, Mr. Lalio",male,,349216,7.8958,
0,1,"Uruchurtu, Don. Manuel E",male,40,PC 17601,27.7208,
1,1,"Spencer, Mrs. William Augustus (Marie Eugenie)",female,,PC 17569,146.5208,B78
1,3,"Glynn, Miss. Mary Agatha",female,,335677,7.75,
0,2,"Wheadon, Mr. Edward H",male,66,C.A. 24579,10.5,
0,1,"Meyer, Mr. Edgar Joseph",male,28,PC 17604,82.1708,
0,1,"Holverson, Mr. Alexander Oskar",male,42,113789,52,
1,3,"Mamee, Mr. Hanna",male,,2677,7.2292,
0,3,"Cann, Mr. Ernest Charles",male,21,A./5. 2152,8.05,
0,3,"Vander Planke, Miss. Augusta Maria",female,18,345764,18,
1,3,"Nicola-Yarred, Miss. Jamila",female,14,2651,11.2417,
0,3,"Ahlin, Mrs. Johan (Johanna Persdotter Larsson)",female,40,7546,9.475,
0,2,"Turpin, Mrs. William John Robert (Dorothy Ann Wonnacott)",female,27,11668,21,
0,3,"Kraeff, Mr. Theodor",male,,349253,7.8958,
1,2,"Laroche, Miss. Simonne Marie Anne Andree",female,3,SC/Paris 2123,41.5792,
1,3,"Devaney, Miss. Margaret Delia",female,19,330958,7.8792,
0,3,"Rogers, Mr. William John",male,,S.C./A.4. 23567,8.05,
0,3,"Lennon, Mr. Denis",male,,370371,15.5,
1,3,"O'Driscoll, Miss. Bridget",female,,14311,7.75,
0,3,"Samaan, Mr. Youssef",male,,2662,21.6792,
0,3,"Arnold-Franchi, Mrs. Josef (Josefine Franchi)",female,18,349237,17.8,
0,3,"Panula, Master. Juha Niilo",male,7,3101295,39.6875,
0,3,"Nosworthy, Mr. Richard Cater",male,21,A/4. 39886,7.8,
1,1,"Harper, Mrs. Henry Sleeper (Myna Haxtun)",female,49,PC 17572,76.7292,D33
1,2,"Faunthorpe, Mrs. Lizzie (Elizabeth Anne Wilkinson)",female,29,2926,26,
0,1,"Ostby, Mr. Engelhart Cornelius",male,65,113509,61.9792,B30
1,1,"Woolner, Mr. Hugh",male,,19947,35.5,C52
1,2,"Rugg, Miss. Emily",female,21,C.A. 31026,10.5,
0,3,"Novel, Mr. Mansouer",male,28.5,2697,7.2292,
1,2,"West, Miss. Constance Mirium",female,5,C.A. 34651,27.75,
0,3,"Goodwin, Master. William Frederick",male,11,CA 2144,46.9,
0,3,"Sirayanian, Mr. Orsen",male,22,2669,7.2292,
1,1,"Icard, Miss. Amelie",female,38,113572,80,B28
0,1,"Harris, Mr. Henry Birkhardt",male,45,36973,83.475,C83
0,3,"Skoog, Master. Harald",male,4,347088,27.9,
0,1,"Stewart, Mr. Albert A",male,,PC 17605,27.7208,
1,3,"Moubarek, Master. Gerios",male,,2661,15.2458,
1,2,"Nye, Mrs. (Elizabeth Ramell)",female,29,C.A. 29395,10.5,F33
0,3,"Crease, Mr. Ernest James",male,19,S.P. 3464,8.1583,
1,3,"Andersson, Miss. Erna Alexandra",female,17,3101281,7.925,
0,3,"Kink, Mr. Vincenz",male,26,315151,8.6625,
0,2,"Jenkin, Mr. Stephen Curnow",male,32,C.A. 33111,10.5,
0,3,"Goodwin, Miss. Lillian Amy",female,16,CA 2144,46.9,
0,2,"Hood, Mr. Ambrose Jr",male,21,S.O.C. 14879,73.5,
0,3,"Chronopoulos, Mr. Apostolos",male,26,2680,14.4542,
1,3,"Bing, Mr. Lee",male,32,1601,56.4958,
0,3,"Moen, Mr. Sigurd Hansen",male,25,348123,7.65,F G73
0,3,"Staneff, Mr. Ivan",male,,349208,7.8958,
0,3,"Moutal, Mr. Rahamin Haim",male,,374746,8.05,
1,2,"Caldwell, Master. Alden Gates",male,0.83,248738,29,
1,3,"Dowdell, Miss. Elizabeth",female,30,364516,12.475,
0,3,"Waelens, Mr. Achille",male,22,345767,9,
1,3,"Sheerlinck, Mr. Jan Baptist",male,29,345779,9.5,
1,3,"McDermott, Miss. Brigdet Delia",female,,330932,7.7875,
0,1,"Carrau, Mr. Francisco M",male,28,113059,47.1,
1,2,"Ilett, Miss. Bertha",female,17,SO/C 14885,10.5,
1,3,"Backstrom, Mrs. Karl Alfred (Maria Mathilda Gustafsson)",female,33,3101278,15.85,
0,3,"Ford, Mr. William Neal",male,16,W./C. 6608,34.375,
0,3,"Slocovski, Mr. Selman Francis",male,,SOTON/OQ 392086,8.05,
1,1,"Fortune, Miss. Mabel Helen",female,23,19950,263,C23 C25 C27
0,3,"Celotti, Mr. Francesco",male,24,343275,8.05,
0,3,"Christmann, Mr. Emil",male,29,343276,8.05,
0,3,"Andreasson, Mr. Paul Edvin",male,20,347466,7.8542,
0,1,"Chaffee, Mr. Herbert Fuller",male,46,W.E.P. 5734,61.175,E31
0,3,"Dean, Mr. Bertram Frank",male,26,C.A. 2315,20.575,
0,3,"Coxon, Mr. Daniel",male,59,364500,7.25,
0,3,"Shorney, Mr. Charles Joseph",male,,374910,8.05,
0,1,"Goldschmidt, Mr. George B",male,71,PC 17754,34.6542,A5
1,1,"Greenfield, Mr. William Bertram",male,23,PC 17759,63.3583,D10 D12
1,2,"Doling, Mrs. John T (Ada Julia Bone)",female,34,231919,23,
0,2,"Kantor, Mr. Sinai",male,34,244367,26,
0,3,"Petranec, Miss. Matilda",female,28,349245,7.8958,
0,3,"Petroff, Mr. Pastcho (""Pentcho"")",male,,349215,7.8958,
0,1,"White, Mr. Richard Frasar",male,21,35281,77.2875,D26
0,3,"Johansson, Mr. Gustaf Joel",male,33,7540,8.6542,
0,3,"Gustafsson, Mr. Anders Vilhelm",male,37,3101276,7.925,
0,3,"Mionoff, Mr. Stoytcho",male,28,349207,7.8958,
1,3,"Salkjelsvik, Miss. Anna Kristine",female,21,343120,7.65,
1,3,"Moss, Mr. Albert Johan",male,,312991,7.775,
0,3,"Rekic, Mr. Tido",male,38,349249,7.8958,
1,3,"Moran, Miss. Bertha",female,,371110,24.15,
0,1,"Porter, Mr. Walter Chamberlain",male,47,110465,52,C110
0,3,"Zabour, Miss. Hileni",female,14.5,2665,14.4542,
0,3,"Barton, Mr. David John",male,22,324669,8.05,
0,3,"Jussila, Miss. Katriina",female,20,4136,9.825,
0,3,"Attalah, Miss. Malake",female,17,2627,14.4583,
0,3,"Pekoniemi, Mr. Edvard",male,21,STON/O 2. 3101294,7.925,
0,3,"Connors, Mr. Patrick",male,70.5,370369,7.75,
0,2,"Turpin, Mr. William John Robert",male,29,11668,21,
0,1,"Baxter, Mr. Quigg Edmond",male,24,PC 17558,247.5208,B58 B60
0,3,"Andersson, Miss. Ellis Anna Maria",female,2,347082,31.275,
0,2,"Hickman, Mr. Stanley George",male,21,S.O.C. 14879,73.5,
0,3,"Moore, Mr. Leonard Charles",male,,A4. 54510,8.05,
0,2,"Nasser, Mr. Nicholas",male,32.5,237736,30.0708,
1,2,"Webber, Miss. Susan",female,32.5,27267,13,E101
0,1,"White, Mr. Percival Wayland",male,54,35281,77.2875,D26
1,3,"Nicola-Yarred, Master. Elias",male,12,2651,11.2417,
0,3,"McMahon, Mr. Martin",male,,370372,7.75,
1,3,"Madsen, Mr. Fridtjof Arne",male,24,C 17369,7.1417,
1,3,"Peter, Miss. Anna",female,,2668,22.3583,F E69
0,3,"Ekstrom, Mr. Johan",male,45,347061,6.975,
0,3,"Drazenoic, Mr. Jozef",male,33,349241,7.8958,
0,3,"Coelho, Mr. Domingos Fernandeo",male,20,SOTON/O.Q. 3101307,7.05,
0,3,"Robins, Mrs. Alexander A (Grace Charity Laury)",female,47,A/5. 3337,14.5,
1,2,"Weisz, Mrs. Leopold (Mathilde Francoise Pede)",female,29,228414,26,
0,2,"Sobey, Mr. Samuel James Hayden",male,25,C.A. 29178,13,
0,2,"Richard, Mr. Emile",male,23,SC/PARIS 2133,15.0458,
1,1,"Newsom, Miss. Helen Monypeny",female,19,11752,26.2833,D47
0,1,"Futrelle, Mr. Jacques Heath",male,37,113803,53.1,C123
0,3,"Osen, Mr. Olaf Elon",male,16,7534,9.2167,
0,1,"Giglio, Mr. Victor",male,24,PC 17593,79.2,B86
0,3,"Boulos, Mrs. Joseph (Sultana)",female,,2678,15.2458,
1,3,"Nysten, Miss. Anna Sofia",female,22,347081,7.75,
1,3,"Hakkarainen, Mrs. Pekka Pietari (Elin Matilda Dolck)",female,24,STON/O2. 3101279,15.85,
0,3,"Burke, Mr. Jeremiah",male,19,365222,6.75,
0,2,"Andrew, Mr. Edgardo Samuel",male,18,231945,11.5,
0,2,"Nicholls, Mr. Joseph Charles",male,19,C.A. 33112,36.75,
1,3,"Andersson, Mr. August Edvard (""Wennerstrom"")",male,27,350043,7.7958,
0,3,"Ford, Miss. Robina Maggie ""Ruby""",female,9,W./C. 6608,34.375,
0,2,"Navratil, Mr. Michel (""Louis M Hoffman"")",male,36.5,230080,26,F2
0,2,"Byles, Rev. Thomas Roussel Davids",male,42,244310,13,
0,2,"Bateman, Rev. Robert James",male,51,S.O.P. 1166,12.525,
1,1,"Pears, Mrs. Thomas (Edith Wearne)",female,22,113776,66.6,C2
0,3,"Meo, Mr. Alfonzo",male,55.5,A.5. 11206,8.05,
0,3,"van Billiard, Mr. Austin Blyler",male,40.5,A/5. 851,14.5,
0,3,"Olsen, Mr. Ole Martin",male,,Fa 265302,7.3125,
0,1,"Williams, Mr. Charles Duane",male,51,PC 17597,61.3792,
1,3,"Gilnagh, Miss. Katherine ""Katie""",female,16,35851,7.7333,
0,3,"Corn, Mr. Harry",male,30,SOTON/OQ 392090,8.05,
0,3,"Smiljanic, Mr. Mile",male,,315037,8.6625,
0,3,"Sage, Master. Thomas Henry",male,,CA. 2343,69.55,
0,3,"Cribb, Mr. John Hatfield",male,44,371362,16.1,
1,2,"Watt, Mrs. James (Elizabeth ""Bessie"" Inglis Milne)",female,40,C.A. 33595,15.75,
0,3,"Bengtsson, Mr. John Viktor",male,26,347068,7.775,
0,3,"Calic, Mr. Jovo",male,17,315093,8.6625,
0,3,"Panula, Master. Eino Viljami",male,1,3101295,39.6875,
1,3,"Goldsmith, Master. Frank John William ""Frankie""",male,9,363291,20.525,
1,1,"Chibnall, Mrs. (Edith Martha Bowerman)",female,,113505,55,E33
0,3,"Skoog, Mrs. William (Anna Bernhardina Karlsson)",female,45,347088,27.9,
0,1,"Baumann, Mr. John D",male,,PC 17318,25.925,
0,3,"Ling, Mr. Lee",male,28,1601,56.4958,
0,1,"Van der hoef, Mr. Wyckoff",male,61,111240,33.5,B19
0,3,"Rice, Master. Arthur",male,4,382652,29.125,
1,3,"Johnson, Miss. Eleanor Ileen",female,1,347742,11.1333,
0,3,"Sivola, Mr. Antti Wilhelm",male,21,STON/O 2. 3101280,7.925,
0,1,"Smith, Mr. James Clinch",male,56,17764,30.6958,A7
0,3,"Klasen, Mr. Klas Albin",male,18,350404,7.8542,
0,3,"Lefebre, Master. Henry Forbes",male,,4133,25.4667,
0,1,"Isham, Miss. Ann Elizabeth",female,50,PC 17595,28.7125,C49
0,2,"Hale, Mr. Reginald",male,30,250653,13,
0,3,"Leonard, Mr. Lionel",male,36,LINE,0,
0,3,"Sage, Miss. Constance Gladys",female,,CA. 2343,69.55,
0,2,"Pernot, Mr. Rene",male,,SC/PARIS 2131,15.05,
0,3,"Asplund, Master. Clarence Gustaf Hugo",male,9,347077,31.3875,
1,2,"Becker, Master. Richard F",male,1,230136,39,F4
1,3,"Kink-Heilmann, Miss. Luise Gretchen",female,4,315153,22.025,
0,1,"Rood, Mr. Hugh Roscoe",male,,113767,50,A32
1,3,"O'Brien, Mrs. Thomas (Johanna ""Hannah"" Godfrey)",female,,370365,15.5,
1,1,"Romaine, Mr. Charles Hallace (""Mr C Rolmane"")",male,45,111428,26.55,
0,3,"Bourke, Mr. John",male,40,364849,15.5,
0,3,"Turcin, Mr. Stjepan",male,36,349247,7.8958,
1,2,"Pinsky, Mrs. (Rosa)",female,32,234604,13,
0,2,"Carbines, Mr. William",male,19,28424,13,
1,3,"Andersen-Jensen, Miss. Carla Christine Nielsine",female,19,350046,7.8542,
1,2,"Navratil, Master. Michel M",male,3,230080,26,F2
1,1,"Brown, Mrs. James Joseph (Margaret Tobin)",female,44,PC 17610,27.7208,B4
1,1,"Lurette, Miss. Elise",female,58,PC 17569,146.5208,B80
0,3,"Mernagh, Mr. Robert",male,,368703,7.75,
0,3,"Olsen, Mr. Karl Siegwart Andreas",male,42,4579,8.4042,
1,3,"Madigan, Miss. Margaret ""Maggie""",female,,370370,7.75,
0,2,"Yrois, Miss. Henriette (""Mrs Harbeck"")",female,24,248747,13,
0,3,"Vande Walle, Mr. Nestor Cyriel",male,28,345770,9.5,
0,3,"Sage, Mr. Frederick",male,,CA. 2343,69.55,
0,3,"Johanson, Mr. Jakob Alfred",male,34,3101264,6.4958,
0,3,"Youseff, Mr. Gerious",male,45.5,2628,7.225,
1,3,"Cohen, Mr. Gurshon ""Gus""",male,18,A/5 3540,8.05,
0,3,"Strom, Miss. Telma Matilda",female,2,347054,10.4625,G6
0,3,"Backstrom, Mr. Karl Alfred",male,32,3101278,15.85,
1,3,"Albimona, Mr. Nassef Cassem",male,26,2699,18.7875,
1,3,"Carr, Miss. Helen ""Ellen""",female,16,367231,7.75,
1,1,"Blank, Mr. Henry",male,40,112277,31,A31
0,3,"Ali, Mr. Ahmed",male,24,SOTON/O.Q. 3101311,7.05,
1,2,"Cameron, Miss. Clear Annie",female,35,F.C.C. 13528,21,
0,3,"Perkin, Mr. John Henry",male,22,A/5 21174,7.25,
0,2,"Givard, Mr. Hans Kristensen",male,30,250646,13,
0,3,"Kiernan, Mr. Philip",male,,367229,7.75,
1,1,"Newell, Miss. Madeleine",female,31,35273,113.275,D36
1,3,"Honkanen, Miss. Eliina",female,27,STON/O2. 3101283,7.925,
0,2,"Jacobsohn, Mr. Sidney Samuel",male,42,243847,27,
1,1,"Bazzani, Miss. Albina",female,32,11813,76.2917,D15
0,2,"Harris, Mr. Walter",male,30,W/C 14208,10.5,
1,3,"Sunderland, Mr. Victor Francis",male,16,SOTON/OQ 392089,8.05,
0,2,"Bracken, Mr. James H",male,27,220367,13,
0,3,"Green, Mr. George Henry",male,51,21440,8.05,
0,3,"Nenkoff, Mr. Christo",male,,349234,7.8958,
1,1,"Hoyt, Mr. Frederick Maxfield",male,38,19943,90,C93
0,3,"Berglund, Mr. Karl Ivar Sven",male,22,PP 4348,9.35,
1,2,"Mellors, Mr. William John",male,19,SW/PP 751,10.5,
0,3,"Lovell, Mr. John Hall (""Henry"")",male,20.5,A/5 21173,7.25,
0,2,"Fahlstrom, Mr. Arne Jonas",male,18,236171,13,
0,3,"Lefebre, Miss. Mathilde",female,,4133,25.4667,
1,1,"Harris, Mrs. Henry Birkhardt (Irene Wallach)",female,35,36973,83.475,C83
0,3,"Larsson, Mr. Bengt Edvin",male,29,347067,7.775,
0,2,"Sjostedt, Mr. Ernst Adolf",male,59,237442,13.5,
1,3,"Asplund, Miss. Lillian Gertrud",female,5,347077,31.3875,
0,2,"Leyson, Mr. Robert William Norman",male,24,C.A. 29566,10.5,
0,3,"Harknett, Miss. Alice Phoebe",female,,W./C. 6609,7.55,
0,2,"Hold, Mr. Stephen",male,44,26707,26,
1,2,"Collyer, Miss. Marjorie ""Lottie""",female,8,C.A. 31921,26.25,
0,2,"Pengelly, Mr. Frederick William",male,19,28665,10.5,
0,2,"Hunt, Mr. George Henry",male,33,SCO/W 1585,12.275,
0,3,"Zabour, Miss. Thamine",female,,2665,14.4542,
1,3,"Murphy, Miss. Katherine ""Kate""",female,,367230,15.5,
0,2,"Coleridge, Mr. Reginald Charles",male,29,W./C. 14263,10.5,
0,3,"Maenpaa, Mr. Matti Alexanteri",male,22,STON/O 2. 3101275,7.125,
0,3,"Attalah, Mr. Sleiman",male,30,2694,7.225,
0,1,"Minahan, Dr. William Edward",male,44,19928,90,C78
0,3,"Lindahl, Miss. Agda Thorilda Viktoria",female,25,347071,7.775,
1,2,"Hamalainen, Mrs. William (Anna)",female,24,250649,14.5,
1,1,"Beckwith, Mr. Richard Leonard",male,37,11751,52.5542,D35
0,2,"Carter, Rev. Ernest Courtenay",male,54,244252,26,
0,3,"Reed, Mr. James George",male,,362316,7.25,
0,3,"Strom, Mrs. Wilhelm (Elna Matilda Persson)",female,29,347054,10.4625,G6
0,1,"Stead, Mr. William Thomas",male,62,113514,26.55,C87
0,3,"Lobb, Mr. William Arthur",male,30,A/5. 3336,16.1,
0,3,"Rosblom, Mrs. Viktor (Helena Wilhelmina)",female,41,370129,20.2125,
1,3,"Touma, Mrs. Darwis (Hanne Youssef Razi)",female,29,2650,15.2458,
1,1,"Thorne, Mrs. Gertrude Maybelle",female,,PC 17585,79.2,
1,1,"Cherry, Miss. Gladys",female,30,110152,86.5,B77
1,1,"Ward, Miss. Anna",female,35,PC 17755,512.3292,
1,2,"Parrish, Mrs. (Lutie Davis)",female,50,230433,26,
0,3,"Smith, Mr. Thomas",male,,384461,7.75,
1,3,"Asplund, Master. Edvin Rojj Felix",male,3,347077,31.3875,
0,1,"Taussig, Mr. Emil",male,52,110413,79.65,E67
0,1,"Harrison, Mr. William",male,40,112059,0,B94
0,3,"Henry, Miss. Delia",female,,382649,7.75,
0,2,"Reeves, Mr. David",male,36,C.A. 17248,10.5,
0,3,"Panula, Mr. Ernesti Arvid",male,16,3101295,39.6875,
1,3,"Persson, Mr. Ernst Ulrik",male,25,347083,7.775,
1,1,"Graham, Mrs. William Thompson (Edith Junkins)",female,58,PC 17582,153.4625,C125
1,1,"Bissette, Miss. Amelia",female,35,PC 17760,135.6333,C99
0,1,"Cairns, Mr. Alexander",male,,113798,31,
1,3,"Tornquist, Mr. William Henry",male,25,LINE,0,
1,2,"Mellinger, Mrs. (Elizabeth Anne Maidment)",female,41,250644,19.5,
0,1,"Natsch, Mr. Charles H",male,37,PC 17596,29.7,C118
1,3,"Healy, Miss. Hanora ""Nora""",female,,370375,7.75,
1,1,"Andrews, Miss. Kornelia Theodosia",female,63,13502,77.9583,D7
0,3,"Lindblom, Miss. Augusta Charlotta",female,45,347073,7.75,
0,2,"Parkes, Mr. Francis ""Frank""",male,,239853,0,
0,3,"Rice, Master. Eric",male,7,382652,29.125,
1,3,"Abbott, Mrs. Stanton (Rosa Hunt)",female,35,C.A. 2673,20.25,
0,3,"Duane, Mr. Frank",male,65,336439,7.75,
0,3,"Olsson, Mr. Nils Johan Goransson",male,28,347464,7.8542,
0,3,"de Pelsmaeker, Mr. Alfons",male,16,345778,9.5,
1,3,"Dorking, Mr. Edward Arthur",male,19,A/5. 10482,8.05,
0,1,"Smith, Mr. Richard William",male,,113056,26,A19
0,3,"Stankovic, Mr. Ivan",male,33,349239,8.6625,
1,3,"de Mulder, Mr. Theodore",male,30,345774,9.5,
0,3,"Naidenoff, Mr. Penko",male,22,349206,7.8958,
1,2,"Hosono, Mr. Masabumi",male,42,237798,13,
1,3,"Connolly, Miss. Kate",female,22,370373,7.75,
1,1,"Barber, Miss. Ellen ""Nellie""",female,26,19877,78.85,
1,1,"Bishop, Mrs. Dickinson H (Helen Walton)",female,19,11967,91.0792,B49
0,2,"Levy, Mr. Rene Jacques",male,36,SC/Paris 2163,12.875,D
0,3,"Haas, Miss. Aloisia",female,24,349236,8.85,
0,3,"Mineff, Mr. Ivan",male,24,349233,7.8958,
0,1,"Lewy, Mr. Ervin G",male,,PC 17612,27.7208,
0,3,"Hanna, Mr. Mansour",male,23.5,2693,7.2292,
0,1,"Allison, Miss. Helen Loraine",female,2,113781,151.55,C22 C26
1,1,"Saalfeld, Mr. Adolphe",male,,19988,30.5,C106
1,1,"Baxter, Mrs. James (Helene DeLaudeniere Chaput)",female,50,PC 17558,247.5208,B58 B60
1,3,"Kelly, Miss. Anna Katherine ""Annie Kate""",female,,9234,7.75,
1,3,"McCoy, Mr. Bernard",male,,367226,23.25,
0,3,"Johnson, Mr. William Cahoone Jr",male,19,LINE,0,
1,2,"Keane, Miss. Nora A",female,,226593,12.35,E101
0,3,"Williams, Mr. Howard Hugh ""Harry""",male,,A/5 2466,8.05,
1,1,"Allison, Master. Hudson Trevor",male,0.92,113781,151.55,C22 C26
1,1,"Fleming, Miss. Margaret",female,,17421,110.8833,
1,1,"Penasco y Castellana, Mrs. Victor de Satode (Maria Josefa Perez de Soto y Vallejo)",female,17,PC 17758,108.9,C65
0,2,"Abelson, Mr. Samuel",male,30,P/PP 3381,24,
1,1,"Francatelli, Miss. Laura Mabel",female,30,PC 17485,56.9292,E36
1,1,"Hays, Miss. Margaret Bechstein",female,24,11767,83.1583,C54
1,1,"Ryerson, Miss. Emily Borie",female,18,PC 17608,262.375,B57 B59 B63 B66
0,2,"Lahtinen, Mrs. William (Anna Sylfven)",female,26,250651,26,
0,3,"Hendekovic, Mr. Ignjac",male,28,349243,7.8958,
0,2,"Hart, Mr. Benjamin",male,43,F.C.C. 13529,26.25,
1,3,"Nilsson, Miss. Helmina Josefina",female,26,347470,7.8542,
1,2,"Kantor, Mrs. Sinai (Miriam Sternin)",female,24,244367,26,
0,2,"Moraweck, Dr. Ernest",male,54,29011,14,
1,1,"Wick, Miss. Mary Natalie",female,31,36928,164.8667,C7
1,1,"Spedden, Mrs. Frederic Oakley (Margaretta Corning Stone)",female,40,16966,134.5,E34
0,3,"Dennis, Mr. Samuel",male,22,A/5 21172,7.25,
0,3,"Danoff, Mr. Yoto",male,27,349219,7.8958,
1,2,"Slayter, Miss. Hilda Mary",female,30,234818,12.35,
1,2,"Caldwell, Mrs. Albert Francis (Sylvia Mae Harbaugh)",female,22,248738,29,
0,3,"Sage, Mr. George John Jr",male,,CA. 2343,69.55,
1,1,"Young, Miss. Marie Grice",female,36,PC 17760,135.6333,C32
0,3,"Nysveen, Mr. Johan Hansen",male,61,345364,6.2375,
1,2,"Ball, Mrs. (Ada E Hall)",female,36,28551,13,D
1,3,"Goldsmith, Mrs. Frank John (Emily Alice Brown)",female,31,363291,20.525,
1,1,"Hippach, Miss. Jean Gertrude",female,16,111361,57.9792,B18
1,3,"McCoy, Miss. Agnes",female,,367226,23.25,
0,1,"Partner, Mr. Austen",male,45.5,113043,28.5,C124
0,1,"Graham, Mr. George Edward",male,38,PC 17582,153.4625,C91
0,3,"Vander Planke, Mr. Leo Edmondus",male,16,345764,18,
1,1,"Frauenthal, Mrs. Henry William (Clara Heinsheimer)",female,,PC 17611,133.65,
0,3,"Denkoff, Mr. Mitto",male,,349225,7.8958,
0,1,"Pears, Mr. Thomas Clinton",male,29,113776,66.6,C2
1,1,"Burns, Miss. Elizabeth Margaret",female,41,16966,134.5,E40
1,3,"Dahl, Mr. Karl Edwart",male,45,7598,8.05,
0,1,"Blackwell, Mr. Stephen Weart",male,45,113784,35.5,T
1,2,"Navratil, Master. Edmond Roger",male,2,230080,26,F2
1,1,"Fortune, Miss. Alice Elizabeth",female,24,19950,263,C23 C25 C27
0,2,"Collander, Mr. Erik Gustaf",male,28,248740,13,
0,2,"Sedgwick, Mr. Charles Frederick Waddington",male,25,244361,13,
0,2,"Fox, Mr. Stanley Hubert",male,36,229236,13,
1,2,"Brown, Miss. Amelia ""Mildred""",female,24,248733,13,F33
1,2,"Smith, Miss. Marion Elsie",female,40,31418,13,
1,3,"Davison, Mrs. Thomas Henry (Mary E Finck)",female,,386525,16.1,
1,3,"Coutts, Master. William Loch ""William""",male,3,C.A. 37671,15.9,
0,3,"Dimic, Mr. Jovan",male,42,315088,8.6625,
0,3,"Odahl, Mr. Nils Martin",male,23,7267,9.225,
0,1,"Williams-Lambert, Mr. Fletcher Fellows",male,,113510,35,C128
0,3,"Elias, Mr. Tannous",male,15,2695,7.2292,
0,3,"Arnold-Franchi, Mr. Josef",male,25,349237,17.8,
0,3,"Yousif, Mr. Wazli",male,,2647,7.225,
0,3,"Vanden Steen, Mr. Leo Peter",male,28,345783,9.5,
1,1,"Bowerman, Miss. Elsie Edith",female,22,113505,55,E33
0,2,"Funk, Miss. Annie Clemmer",female,38,237671,13,
1,3,"McGovern, Miss. Mary",female,,330931,7.8792,
1,3,"Mockler, Miss. Helen Mary ""Ellie""",female,,330980,7.8792,
0,3,"Skoog, Mr. Wilhelm",male,40,347088,27.9,
0,2,"del Carlo, Mr. Sebastiano",male,29,SC/PARIS 2167,27.7208,
0,3,"Barbara, Mrs. (Catherine David)",female,45,2691,14.4542,
0,3,"Asim, Mr. Adola",male,35,SOTON/O.Q. 3101310,7.05,
0,3,"O'Brien, Mr. Thomas",male,,370365,15.5,
0,3,"Adahl, Mr. Mauritz Nils Martin",male,30,C 7076,7.25,
1,1,"Warren, Mrs. Frank Manley (Anna Sophia Atkinson)",female,60,110813,75.25,D37
1,3,"Moussa, Mrs. (Mantoura Boulos)",female,,2626,7.2292,
1,3,"Jermyn, Miss. Annie",female,,14313,7.75,
1,1,"Aubart, Mme. Leontine Pauline",female,24,PC 17477,69.3,B35
1,1,"Harder, Mr. George Achilles",male,25,11765,55.4417,E50
0,3,"Wiklund, Mr. Jakob Alfred",male,18,3101267,6.4958,
0,3,"Beavan, Mr. William Thomas",male,19,323951,8.05,
0,1,"Ringhini, Mr. Sante",male,22,PC 17760,135.6333,
0,3,"Palsson, Miss. Stina Viola",female,3,349909,21.075,
1,1,"Meyer, Mrs. Edgar Joseph (Leila Saks)",female,,PC 17604,82.1708,
1,3,"Landergren, Miss. Aurora Adelia",female,22,C 7077,7.25,
0,1,"Widener, Mr. Harry Elkins",male,27,113503,211.5,C82
0,3,"Betros, Mr. Tannous",male,20,2648,4.0125,
0,3,"Gustafsson, Mr. Karl Gideon",male,19,347069,7.775,
1,1,"Bidois, Miss. Rosalie",female,42,PC 17757,227.525,
1,3,"Nakid, Miss. Maria (""Mary"")",female,1,2653,15.7417,
0,3,"Tikkanen, Mr. Juho",male,32,STON/O 2. 3101293,7.925,
1,1,"Holverson, Mrs. Alexander Oskar (Mary Aline Towner)",female,35,113789,52,
0,3,"Plotcharsky, Mr. Vasil",male,,349227,7.8958,
0,2,"Davies, Mr. Charles Henry",male,18,S.O.C. 14879,73.5,
0,3,"Goodwin, Master. Sidney Leonard",male,1,CA 2144,46.9,
1,2,"Buss, Miss. Kate",female,36,27849,13,
0,3,"Sadlier, Mr. Matthew",male,,367655,7.7292,
1,2,"Lehmann, Miss. Bertha",female,17,SC 1748,12,
1,1,"Carter, Mr. William Ernest",male,36,113760,120,B96 B98
1,3,"Jansson, Mr. Carl Olof",male,21,350034,7.7958,
0,3,"Gustafsson, Mr. Johan Birger",male,28,3101277,7.925,
1,1,"Newell, Miss. Marjorie",female,23,35273,113.275,D36
1,3,"Sandstrom, Mrs. Hjalmar (Agnes Charlotta Bengtsson)",female,24,PP 9549,16.7,G6
0,3,"Johansson, Mr. Erik",male,22,350052,7.7958,
0,3,"Olsson, Miss. Elina",female,31,350407,7.8542,
0,2,"McKane, Mr. Peter David",male,46,28403,26,
0,2,"Pain, Dr. Alfred",male,23,244278,10.5,
1,2,"Trout, Mrs. William H (Jessie L)",female,28,240929,12.65,
1,3,"Niskanen, Mr. Juha",male,39,STON/O 2. 3101289,7.925,
0,3,"Adams, Mr. John",male,26,341826,8.05,
0,3,"Jussila, Miss. Mari Aina",female,21,4137,9.825,
0,3,"Hakkarainen, Mr. Pekka Pietari",male,28,STON/O2. 3101279,15.85,
0,3,"Oreskovic, Miss. Marija",female,20,315096,8.6625,
0,2,"Gale, Mr. Shadrach",male,34,28664,21,
0,3,"Widegren, Mr. Carl/Charles Peter",male,51,347064,7.75,
1,2,"Richards, Master. William Rowe",male,3,29106,18.75,
0,3,"Birkeland, Mr. Hans Martin Monsen",male,21,312992,7.775,
0,3,"Lefebre, Miss. Ida",female,,4133,25.4667,
0,3,"Sdycoff, Mr. Todor",male,,349222,7.8958,
0,3,"Hart, Mr. Henry",male,,394140,6.8583,
1,1,"Minahan, Miss. Daisy E",female,33,19928,90,C78
0,2,"Cunningham, Mr. Alfred Fleming",male,,239853,0,
1,3,"Sundman, Mr. Johan Julian",male,44,STON/O 2. 3101269,7.925,
0,3,"Meek, Mrs. Thomas (Annie Louise Rowley)",female,,343095,8.05,
1,2,"Drew, Mrs. James Vivian (Lulu Thorne Christian)",female,34,28220,32.5,
1,2,"Silven, Miss. Lyyli Karoliina",female,18,250652,13,
0,2,"Matthews, Mr. William John",male,30,28228,13,
0,3,"Van Impe, Miss. Catharina",female,10,345773,24.15,
0,3,"Gheorgheff, Mr. Stanio",male,,349254,7.8958,
0,3,"Charters, Mr. David",male,21,A/5. 13032,7.7333,
0,3,"Zimmerman, Mr. Leo",male,29,315082,7.875,
0,3,"Danbom, Mrs. Ernst Gilbert (Anna Sigrid Maria Brogren)",female,28,347080,14.4,
0,3,"Rosblom, Mr. Viktor Richard",male,18,370129,20.2125,
0,3,"Wiseman, Mr. Phillippe",male,,A/4. 34244,7.25,
1,2,"Clarke, Mrs. Charles V (Ada Maria Winfield)",female,28,2003,26,
1,2,"Phillips, Miss. Kate Florence (""Mrs Kate Louise Phillips Marshall"")",female,19,250655,26,
0,3,"Flynn, Mr. James",male,,364851,7.75,
1,3,"Pickard, Mr. Berk (Berk Trembisky)",male,32,SOTON/O.Q. 392078,8.05,E10
1,1,"Bjornstrom-Steffansson, Mr. Mauritz Hakan",male,28,110564,26.55,C52
1,3,"Thorneycroft, Mrs. Percival (Florence Kate White)",female,,376564,16.1,
1,2,"Louch, Mrs. Charles Alexander (Alice Adelaide Slow)",female,42,SC/AH 3085,26,
0,3,"Kallio, Mr. Nikolai Erland",male,17,STON/O 2. 3101274,7.125,
0,1,"Silvey, Mr. William Baird",male,50,13507,55.9,E44
1,1,"Carter, Miss. Lucile Polk",female,14,113760,120,B96 B98
0,3,"Ford, Miss. Doolina Margaret ""Daisy""",female,21,W./C. 6608,34.375,
1,2,"Richards, Mrs. Sidney (Emily Hocking)",female,24,29106,18.75,
0,1,"Fortune, Mr. Mark",male,64,19950,263,C23 C25 C27
0,2,"Kvillner, Mr. Johan Henrik Johannesson",male,31,C.A. 18723,10.5,
1,2,"Hart, Mrs. Benjamin (Esther Ada Bloomfield)",female,45,F.C.C. 13529,26.25,
0,3,"Hampe, Mr. Leon",male,20,345769,9.5,
0,3,"Petterson, Mr. Johan Emil",male,25,347076,7.775,
1,2,"Reynaldo, Ms. Encarnacion",female,28,230434,13,
1,3,"Johannesen-Bratthammer, Mr. Bernt",male,,65306,8.1125,
1,1,"Dodge, Master. Washington",male,4,33638,81.8583,A34
1,2,"Mellinger, Miss. Madeleine Violet",female,13,250644,19.5,
1,1,"Seward, Mr. Frederic Kimber",male,34,113794,26.55,
1,3,"Baclini, Miss. Marie Catherine",female,5,2666,19.2583,
1,1,"Peuchen, Major. Arthur Godfrey",male,52,113786,30.5,C104
0,2,"West, Mr. Edwy Arthur",male,36,C.A. 34651,27.75,
0,3,"Hagland, Mr. Ingvald Olai Olsen",male,,65303,19.9667,
0,1,"Foreman, Mr. Benjamin Laventall",male,30,113051,27.75,C111
1,1,"Goldenberg, Mr. Samuel L",male,49,17453,89.1042,C92
0,3,"Peduzzi, Mr. Joseph",male,,A/5 2817,8.05,
1,3,"Jalsevac, Mr. Ivan",male,29,349240,7.8958,
0,1,"Millet, Mr. Francis Davis",male,65,13509,26.55,E38
1,1,"Kenyon, Mrs. Frederick R (Marion)",female,,17464,51.8625,D21
1,2,"Toomey, Miss. Ellen",female,50,F.C.C. 13531,10.5,
0,3,"O'Connor, Mr. Maurice",male,,371060,7.75,
1,1,"Anderson, Mr. Harry",male,48,19952,26.55,E12
0,3,"Morley, Mr. William",male,34,364506,8.05,
0,1,"Gee, Mr. Arthur H",male,47,111320,38.5,E63
0,2,"Milling, Mr. Jacob Christian",male,48,234360,13,
0,3,"Maisner, Mr. Simon",male,,A/S 2816,8.05,
0,3,"Goncalves, Mr. Manuel Estanslas",male,38,SOTON/O.Q. 3101306,7.05,
0,2,"Campbell, Mr. William",male,,239853,0,
0,1,"Smart, Mr. John Montgomery",male,56,113792,26.55,
0,3,"Scanlan, Mr. James",male,,36209,7.725,
1,3,"Baclini, Miss. Helene Barbara",female,0.75,2666,19.2583,
0,3,"Keefe, Mr. Arthur",male,,323592,7.25,
0,3,"Cacic, Mr. Luka",male,38,315089,8.6625,
1,2,"West, Mrs. Edwy Arthur (Ada Mary Worth)",female,33,C.A. 34651,27.75,
1,2,"Jerwan, Mrs. Amin S (Marie Marthe Thuillard)",female,23,SC/AH Basle 541,13.7917,D
0,3,"Strandberg, Miss. Ida Sofia",female,22,7553,9.8375,
0,1,"Clifford, Mr. George Quincy",male,,110465,52,A14
0,2,"Renouf, Mr. Peter Henry",male,34,31027,21,
0,3,"Braund, Mr. Lewis Richard",male,29,3460,7.0458,
0,3,"Karlsson, Mr. Nils August",male,22,350060,7.5208,
1,3,"Hirvonen, Miss. Hildur E",female,2,3101298,12.2875,
0,3,"Goodwin, Master. Harold Victor",male,9,CA 2144,46.9,
0,2,"Frost, Mr. Anthony Wood ""Archie""",male,,239854,0,
0,3,"Rouse, Mr. Richard Henry",male,50,A/5 3594,8.05,
1,3,"Turkula, Mrs. (Hedwig)",female,63,4134,9.5875,
1,1,"Bishop, Mr. Dickinson H",male,25,11967,91.0792,B49
0,3,"Lefebre, Miss. Jeannie",female,,4133,25.4667,
1,1,"Hoyt, Mrs. Frederick Maxfield (Jane Anne Forby)",female,35,19943,90,C93
0,1,"Kent, Mr. Edward Austin",male,58,11771,29.7,B37
0,3,"Somerton, Mr. Francis William",male,30,A.5. 18509,8.05,
1,3,"Coutts, Master. Eden Leslie ""Neville""",male,9,C.A. 37671,15.9,
0,3,"Hagland, Mr. Konrad Mathias Reiersen",male,,65304,19.9667,
0,3,"Windelov, Mr. Einar",male,21,SOTON/OQ 3101317,7.25,
0,1,"Molson, Mr. Harry Markland",male,55,113787,30.5,C30
0,1,"Artagaveytia, Mr. Ramon",male,71,PC 17609,49.5042,
0,3,"Stanley, Mr. Edward Roland",male,21,A/4 45380,8.05,
0,3,"Yousseff, Mr. Gerious",male,,2627,14.4583,
1,1,"Eustis, Miss. Elizabeth Mussey",female,54,36947,78.2667,D20
0,3,"Shellard, Mr. Frederick William",male,,C.A. 6212,15.1,
0,1,"Allison, Mrs. Hudson J C (Bessie Waldo Daniels)",female,25,113781,151.55,C22 C26
0,3,"Svensson, Mr. Olof",male,24,350035,7.7958,
0,3,"Calic, Mr. Petar",male,17,315086,8.6625,
0,3,"Canavan, Miss. Mary",female,21,364846,7.75,
0,3,"O'Sullivan, Miss. Bridget Mary",female,,330909,7.6292,
0,3,"Laitinen, Miss. Kristina Sofia",female,37,4135,9.5875,
1,1,"Maioni, Miss. Roberta",female,16,110152,86.5,B79
0,1,"Penasco y Castellana, Mr. Victor de Satode",male,18,PC 17758,108.9,C65
1,2,"Quick, Mrs. Frederick Charles (Jane Richards)",female,33,26360,26,
1,1,"Bradley, Mr. George (""George Arthur Brayton"")",male,,111427,26.55,
0,3,"Olsen, Mr. Henry Margido",male,28,C 4001,22.525,
1,3,"Lang, Mr. Fang",male,26,1601,56.4958,
1,3,"Daly, Mr. Eugene Patrick",male,29,382651,7.75,
0,3,"Webber, Mr. James",male,,SOTON/OQ 3101316,8.05,
1,1,"McGough, Mr. James Robert",male,36,PC 17473,26.2875,E25
1,1,"Rothschild, Mrs. Martin (Elizabeth L. Barrett)",female,54,PC 17603,59.4,
0,3,"Coleff, Mr. Satio",male,24,349209,7.4958,
0,1,"Walker, Mr. William Anderson",male,47,36967,34.0208,D46
1,2,"Lemore, Mrs. (Amelia Milley)",female,34,C.A. 34260,10.5,F33
0,3,"Ryan, Mr. Patrick",male,,371110,24.15,
1,2,"Angle, Mrs. William A (Florence ""Mary"" Agnes Hughes)",female,36,226875,26,
0,3,"Pavlovic, Mr. Stefo",male,32,349242,7.8958,
1,1,"Perreault, Miss. Anne",female,30,12749,93.5,B73
0,3,"Vovk, Mr. Janko",male,22,349252,7.8958,
0,3,"Lahoud, Mr. Sarkis",male,,2624,7.225,
1,1,"Hippach, Mrs. Louis Albert (Ida Sophia Fischer)",female,44,111361,57.9792,B18
0,3,"Kassem, Mr. Fared",male,,2700,7.2292,
0,3,"Farrell, Mr. James",male,40.5,367232,7.75,
1,2,"Ridsdale, Miss. Lucy",female,50,W./C. 14258,10.5,
0,1,"Farthing, Mr. John",male,,PC 17483,221.7792,C95
0,3,"Salonen, Mr. Johan Werner",male,39,3101296,7.925,
0,2,"Hocking, Mr. Richard George",male,23,29104,11.5,
1,2,"Quick, Miss. Phyllis May",female,2,26360,26,
0,3,"Toufik, Mr. Nakli",male,,2641,7.2292,
0,3,"Elias, Mr. Joseph Jr",male,17,2690,7.2292,
1,3,"Peter, Mrs. Catherine (Catherine Rizk)",female,,2668,22.3583,
0,3,"Cacic, Miss. Marija",female,30,315084,8.6625,
1,2,"Hart, Miss. Eva Miriam",female,7,F.C.C. 13529,26.25,
0,1,"Butt, Major. Archibald Willingham",male,45,113050,26.55,B38
1,1,"LeRoy, Miss. Bertha",female,30,PC 17761,106.425,
0,3,"Risien, Mr. Samuel Beard",male,,364498,14.5,
1,1,"Frolicher, Miss. Hedwig Margaritha",female,22,13568,49.5,B39
1,1,"Crosby, Miss. Harriet R",female,36,WE/P 5735,71,B22
0,3,"Andersson, Miss. Ingeborg Constanzia",female,9,347082,31.275,
0,3,"Andersson, Miss. Sigrid Elisabeth",female,11,347082,31.275,
1,2,"Beane, Mr. Edward",male,32,2908,26,
0,1,"Douglas, Mr. Walter Donald",male,50,PC 17761,106.425,C86
0,1,"Nicholson, Mr. Arthur Ernest",male,64,693,26,
1,2,"Beane, Mrs. Edward (Ethel Clarke)",female,19,2908,26,
1,2,"Padro y Manent, Mr. Julian",male,,SC/PARIS 2146,13.8625,
0,3,"Goldsmith, Mr. Frank John",male,33,363291,20.525,
1,2,"Davies, Master. John Morgan Jr",male,8,C.A. 33112,36.75,
1,1,"Thayer, Mr. John Borland Jr",male,17,17421,110.8833,C70
0,2,"Sharp, Mr. Percival James R",male,27,244358,26,
0,3,"O'Brien, Mr. Timothy",male,,330979,7.8292,
1,3,"Leeni, Mr. Fahim (""Philip Zenni"")",male,22,2620,7.225,
1,3,"Ohman, Miss. Velin",female,22,347085,7.775,
0,1,"Wright, Mr. George",male,62,113807,26.55,
1,1,"Duff Gordon, Lady. (Lucille Christiana Sutherland) (""Mrs Morgan"")",female,48,11755,39.6,A16
0,1,"Robbins, Mr. Victor",male,,PC 17757,227.525,
1,1,"Taussig, Mrs. Emil (Tillie Mandelbaum)",female,39,110413,79.65,E67
1,3,"de Messemaeker, Mrs. Guillaume Joseph (Emma)",female,36,345572,17.4,
0,3,"Morrow, Mr. Thomas Rowan",male,,372622,7.75,
0,3,"Sivic, Mr. Husein",male,40,349251,7.8958,
0,2,"Norman, Mr. Robert Douglas",male,28,218629,13.5,
0,3,"Simmons, Mr. John",male,,SOTON/OQ 392082,8.05,
0,3,"Meanwell, Miss. (Marion Ogden)",female,,SOTON/O.Q. 392087,8.05,
0,3,"Davies, Mr. Alfred J",male,24,A/4 48871,24.15,
0,3,"Stoytcheff, Mr. Ilia",male,19,349205,7.8958,
0,3,"Palsson, Mrs. Nils (Alma Cornelia Berglund)",female,29,349909,21.075,
0,3,"Doharr, Mr. Tannous",male,,2686,7.2292,
1,3,"Jonsson, Mr. Carl",male,32,350417,7.8542,
1,2,"Harris, Mr. George",male,62,S.W./PP 752,10.5,
1,1,"Appleton, Mrs. Edward Dale (Charlotte Lamson)",female,53,11769,51.4792,C101
1,1,"Flynn, Mr. John Irwin (""Irving"")",male,36,PC 17474,26.3875,E25
1,3,"Kelly, Miss. Mary",female,,14312,7.75,
0,3,"Rush, Mr. Alfred George John",male,16,A/4. 20589,8.05,
0,3,"Patchett, Mr. George",male,19,358585,14.5,
1,2,"Garside, Miss. Ethel",female,34,243880,13,
1,1,"Silvey, Mrs. William Baird (Alice Munger)",female,39,13507,55.9,E44
0,3,"Caram, Mrs. Joseph (Maria Elias)",female,,2689,14.4583,
1,3,"Jussila, Mr. Eiriik",male,32,STON/O 2. 3101286,7.925,
1,2,"Christy, Miss. Julie Rachel",female,25,237789,30,
1,1,"Thayer, Mrs. John Borland (Marian Longstreth Morris)",female,39,17421,110.8833,C68
0,2,"Downton, Mr. William James",male,54,28403,26,
0,1,"Ross, Mr. John Hugo",male,36,13049,40.125,A10
0,3,"Paulner, Mr. Uscher",male,,3411,8.7125,
1,1,"Taussig, Miss. Ruth",female,18,110413,79.65,E68
0,2,"Jarvis, Mr. John Denzil",male,47,237565,15,
1,1,"Frolicher-Stehli, Mr. Maxmillian",male,60,13567,79.2,B41
0,3,"Gilinski, Mr. Eliezer",male,22,14973,8.05,
0,3,"Murdlin, Mr. Joseph",male,,A./5. 3235,8.05,
0,3,"Rintamaki, Mr. Matti",male,35,STON/O 2. 3101273,7.125,
1,1,"Stephenson, Mrs. Walter Bertram (Martha Eustis)",female,52,36947,78.2667,D20
0,3,"Elsbury, Mr. William James",male,47,A/5 3902,7.25,
0,3,"Bourke, Miss. Mary",female,,364848,7.75,
0,2,"Chapman, Mr. John Henry",male,37,SC/AH 29037,26,
0,3,"Van Impe, Mr. Jean Baptiste",male,36,345773,24.15,
1,2,"Leitch, Miss. Jessie Wills",female,,248727,33,
0,3,"Johnson, Mr. Alfred",male,49,LINE,0,
0,3,"Boulos, Mr. Hanna",male,,2664,7.225,
1,1,"Duff Gordon, Sir. Cosmo Edmund (""Mr Morgan"")",male,49,PC 17485,56.9292,A20
1,2,"Jacobsohn, Mrs. Sidney Samuel (Amy Frances Christy)",female,24,243847,27,
0,3,"Slabenoff, Mr. Petco",male,,349214,7.8958,
0,1,"Harrington, Mr. Charles H",male,,113796,42.4,
0,3,"Torber, Mr. Ernst William",male,44,364511,8.05,
1,1,"Homer, Mr. Harry (""Mr E Haven"")",male,35,111426,26.55,
0,3,"Lindell, Mr. Edvard Bengtsson",male,36,349910,15.55,
0,3,"Karaic, Mr. Milan",male,30,349246,7.8958,
1,1,"Daniel, Mr. Robert Williams",male,27,113804,30.5,
1,2,"Laroche, Mrs. Joseph (Juliette Marie Louise Lafargue)",female,22,SC/Paris 2123,41.5792,
1,1,"Shutes, Miss. Elizabeth W",female,40,PC 17582,153.4625,C125
0,3,"Andersson, Mrs. Anders Johan (Alfrida Konstantia Brogren)",female,39,347082,31.275,
0,3,"Jardin, Mr. Jose Neto",male,,SOTON/O.Q. 3101305,7.05,
1,3,"Murphy, Miss. Margaret Jane",female,,367230,15.5,
0,3,"Horgan, Mr. John",male,,370377,7.75,
0,3,"Brocklebank, Mr. William Alfred",male,35,364512,8.05,
1,2,"Herman, Miss. Alice",female,24,220845,65,
0,3,"Danbom, Mr. Ernst Gilbert",male,34,347080,14.4,
0,3,"Lobb, Mrs. William Arthur (Cordelia K Stanlick)",female,26,A/5. 3336,16.1,
1,2,"Becker, Miss. Marion Louise",female,4,230136,39,F4
0,2,"Gavey, Mr. Lawrence",male,26,31028,10.5,
0,3,"Yasbeck, Mr. Antoni",male,27,2659,14.4542,
1,1,"Kimball, Mr. Edwin Nelson Jr",male,42,11753,52.5542,D19
1,3,"Nakid, Mr. Sahid",male,20,2653,15.7417,
0,3,"Hansen, Mr. Henry Damsgaard",male,21,350029,7.8542,
0,3,"Bowen, Mr. David John ""Dai""",male,21,54636,16.1,
0,1,"Sutton, Mr. Frederick",male,61,36963,32.3208,D50
0,2,"Kirkland, Rev. Charles Leonard",male,57,219533,12.35,
1,1,"Longley, Miss. Gretchen Fiske",female,21,13502,77.9583,D9
0,3,"Bostandyeff, Mr. Guentcho",male,26,349224,7.8958,
0,3,"O'Connell, Mr. Patrick D",male,,334912,7.7333,
1,1,"Barkworth, Mr. Algernon Henry Wilson",male,80,27042,30,A23
0,3,"Lundahl, Mr. Johan Svensson",male,51,347743,7.0542,
1,1,"Stahelin-Maeglin, Dr. Max",male,32,13214,30.5,B50
0,1,"Parr, Mr. William Henry Marsh",male,,112052,0,
0,3,"Skoog, Miss. Mabel",female,9,347088,27.9,
1,2,"Davis, Miss. Mary",female,28,237668,13,
0,3,"Leinonen, Mr. Antti Gustaf",male,32,STON/O 2. 3101292,7.925,
0,2,"Collyer, Mr. Harvey",male,31,C.A. 31921,26.25,
0,3,"Panula, Mrs. Juha (Maria Emilia Ojala)",female,41,3101295,39.6875,
0,3,"Thorneycroft, Mr. Percival",male,,376564,16.1,
0,3,"Jensen, Mr. Hans Peder",male,20,350050,7.8542,
1,1,"Sagesser, Mlle. Emma",female,24,PC 17477,69.3,B35
0,3,"Skoog, Miss. Margit Elizabeth",female,2,347088,27.9,
1,3,"Foo, Mr. Choong",male,,1601,56.4958,
1,3,"Baclini, Miss. Eugenie",female,0.75,2666,19.2583,
1,1,"Harper, Mr. Henry Sleeper",male,48,PC 17572,76.7292,D33
0,3,"Cor, Mr. Liudevit",male,19,349231,7.8958,
1,1,"Simonius-Blumer, Col. Oberst Alfons",male,56,13213,35.5,A26
0,3,"Willey, Mr. Edward",male,,S.O./P.P. 751,7.55,
1,3,"Stanley, Miss. Amy Zillah Elsie",female,23,CA. 2314,7.55,
0,3,"Mitkoff, Mr. Mito",male,,349221,7.8958,
1,2,"Doling, Miss. Elsie",female,18,231919,23,
0,3,"Kalvik, Mr. Johannes Halvorsen",male,21,8475,8.4333,
1,3,"O'Leary, Miss. Hanora ""Norah""",female,,330919,7.8292,
0,3,"Hegarty, Miss. Hanora ""Nora""",female,18,365226,6.75,
0,2,"Hickman, Mr. Leonard Mark",male,24,S.O.C. 14879,73.5,
0,3,"Radeff, Mr. Alexander",male,,349223,7.8958,
0,3,"Bourke, Mrs. John (Catherine)",female,32,364849,15.5,
0,2,"Eitemiller, Mr. George Floyd",male,23,29751,13,
0,1,"Newell, Mr. Arthur Webster",male,58,35273,113.275,D48
1,1,"Frauenthal, Dr. Henry William",male,50,PC 17611,133.65,
0,3,"Badt, Mr. Mohamed",male,40,2623,7.225,
0,1,"Colley, Mr. Edward Pomeroy",male,47,5727,25.5875,E58
0,3,"Coleff, Mr. Peju",male,36,349210,7.4958,
1,3,"Lindqvist, Mr. Eino William",male,20,STON/O 2. 3101285,7.925,
0,2,"Hickman, Mr. Lewis",male,32,S.O.C. 14879,73.5,
0,2,"Butler, Mr. Reginald Fenton",male,25,234686,13,
0,3,"Rommetvedt, Mr. Knud Paust",male,,312993,7.775,
0,3,"Cook, Mr. Jacob",male,43,A/5 3536,8.05,
1,1,"Taylor, Mrs. Elmer Zebley (Juliet Cummins Wright)",female,,19996,52,C126
1,2,"Brown, Mrs. Thomas William Solomon (Elizabeth Catherine Ford)",female,40,29750,39,
0,1,"Davidson, Mr. Thornton",male,31,F.C. 12750,52,B71
0,2,"Mitchell, Mr. Henry Michael",male,70,C.A. 24580,10.5,
1,2,"Wilhelms, Mr. Charles",male,31,244270,13,
0,2,"Watson, Mr. Ennis Hastings",male,,239856,0,
0,3,"Edvardsson, Mr. Gustaf Hjalmar",male,18,349912,7.775,
0,3,"Sawyer, Mr. Frederick Charles",male,24.5,342826,8.05,
1,3,"Turja, Miss. Anna Sofia",female,18,4138,9.8417,
0,3,"Goodwin, Mrs. Frederick (Augusta Tyler)",female,43,CA 2144,46.9,
1,1,"Cardeza, Mr. Thomas Drake Martinez",male,36,PC 17755,512.3292,B51 B53 B55
0,3,"Peters, Miss. Katie",female,,330935,8.1375,
1,1,"Hassab, Mr. Hammad",male,27,PC 17572,76.7292,D49
0,3,"Olsvigen, Mr. Thor Anderson",male,20,6563,9.225,
0,3,"Goodwin, Mr. Charles Edward",male,14,CA 2144,46.9,
0,2,"Brown, Mr. Thomas William Solomon",male,60,29750,39,
0,2,"Laroche, Mr. Joseph Philippe Lemercier",male,25,SC/Paris 2123,41.5792,
0,3,"Panula, Mr. Jaako Arnold",male,14,3101295,39.6875,
0,3,"Dakic, Mr. Branko",male,19,349228,10.1708,
0,3,"Fischer, Mr. Eberhard Thelander",male,18,350036,7.7958,
1,1,"Madill, Miss. Georgette Alexandra",female,15,24160,211.3375,B5
1,1,"Dick, Mr. Albert Adrian",male,31,17474,57,B20
1,3,"Karun, Miss. Manca",female,4,349256,13.4167,
1,3,"Lam, Mr. Ali",male,,1601,56.4958,
0,3,"Saad, Mr. Khalil",male,25,2672,7.225,
0,1,"Weir, Col. John",male,60,113800,26.55,
0,2,"Chapman, Mr. Charles Henry",male,52,248731,13.5,
0,3,"Kelly, Mr. James",male,44,363592,8.05,
1,3,"Mullens, Miss. Katherine ""Katie""",female,,35852,7.7333,
0,1,"Thayer, Mr. John Borland",male,49,17421,110.8833,C68
0,3,"Humblen, Mr. Adolf Mathias Nicolai Olsen",male,42,348121,7.65,F G63
1,1,"Astor, Mrs. John Jacob (Madeleine Talmadge Force)",female,18,PC 17757,227.525,C62 C64
1,1,"Silverthorne, Mr. Spencer Victor",male,35,PC 17475,26.2875,E24
0,3,"Barbara, Miss. Saiide",female,18,2691,14.4542,
0,3,"Gallagher, Mr. Martin",male,25,36864,7.7417,
0,3,"Hansen, Mr. Henrik Juul",male,26,350025,7.8542,
0,2,"Morley, Mr. Henry Samuel (""Mr Henry Marshall"")",male,39,250655,26,
1,2,"Kelly, Mrs. Florence ""Fannie""",female,45,223596,13.5,
1,1,"Calderhead, Mr. Edward Pennington",male,42,PC 17476,26.2875,E24
1,1,"Cleaver, Miss. Alice",female,22,113781,151.55,
1,3,"Moubarek, Master. Halim Gonios (""William George"")",male,,2661,15.2458,
1,1,"Mayne, Mlle. Berthe Antonine (""Mrs de Villiers"")",female,24,PC 17482,49.5042,C90
0,1,"Klaber, Mr. Herman",male,,113028,26.55,C124
1,1,"Taylor, Mr. Elmer Zebley",male,48,19996,52,C126
0,3,"Larsson, Mr. August Viktor",male,29,7545,9.4833,
0,2,"Greenberg, Mr. Samuel",male,52,250647,13,
0,3,"Soholt, Mr. Peter Andreas Lauritz Andersen",male,19,348124,7.65,F G73
1,1,"Endres, Miss. Caroline Louise",female,38,PC 17757,227.525,C45
1,2,"Troutt, Miss. Edwina Celia ""Winnie""",female,27,34218,10.5,E101
0,3,"McEvoy, Mr. Michael",male,,36568,15.5,
0,3,"Johnson, Mr. Malkolm Joackim",male,33,347062,7.775,
1,2,"Harper, Miss. Annie Jessie ""Nina""",female,6,248727,33,
0,3,"Jensen, Mr. Svend Lauritz",male,17,350048,7.0542,
0,2,"Giles, Mr. Frederick Edward",male,21,28134,11.5,
1,1,"Swift, Mrs. Frederick Joel (Margaret Welles Barron)",female,48,17466,25.9292,D17
0,3,"Sage, Miss. Dorothy Edith ""Dolly""",female,,CA. 2343,69.55,
0,2,"Gill, Mr. John William",male,24,233866,13,
1,2,"Bystrom, Mrs. (Karolina)",female,42,236852,13,
1,2,"Duran y More, Miss. Asuncion",female,27,SC/PARIS 2149,13.8583,
0,1,"Roebling, Mr. Washington Augustus II",male,31,PC 17590,50.4958,A24
0,3,"van Melkebeke, Mr. Philemon",male,,345777,9.5,
1,3,"Johnson, Master. Harold Theodor",male,4,347742,11.1333,
0,3,"Balkic, Mr. Cerin",male,26,349248,7.8958,
1,1,"Beckwith, Mrs. Richard Leonard (Sallie Monypeny)",female,47,11751,52.5542,D35
0,1,"Carlsson, Mr. Frans Olof",male,33,695,5,B51 B53 B55
0,3,"Vander Cruyssen, Mr. Victor",male,47,345765,9,
1,2,"Abelson, Mrs. Samuel (Hannah Wizosky)",female,28,P/PP 3381,24,
1,3,"Najib, Miss. Adele Kiamie ""Jane""",female,15,2667,7.225,
0,3,"Gustafsson, Mr. Alfred Ossian",male,20,7534,9.8458,
0,3,"Petroff, Mr. Nedelio",male,19,349212,7.8958,
0,3,"Laleff, Mr. Kristo",male,,349217,7.8958,
1,1,"Potter, Mrs. Thomas Jr (Lily Alexenia Wilson)",female,56,11767,83.1583,C50
1,2,"Shelley, Mrs. William (Imanita Parrish Hall)",female,25,230433,26,
0,3,"Markun, Mr. Johann",male,33,349257,7.8958,
0,3,"Dahlberg, Miss. Gerda Ulrika",female,22,7552,10.5167,
0,2,"Banfield, Mr. Frederick James",male,28,C.A./SOTON 34068,10.5,
0,3,"Sutehall, Mr. Henry Jr",male,25,SOTON/OQ 392076,7.05,
0,3,"Rice, Mrs. William (Margaret Norton)",female,39,382652,29.125,
0,2,"Montvila, Rev. Juozas",male,27,211536,13,
1,1,"Graham, Miss. Margaret Edith",female,19,112053,30,B42
0,3,"Johnston, Miss. Catherine Helen ""Carrie""",female,,W./C. 6607,23.45,
1,1,"Behr, Mr. Karl Howell",male,26,111369,30,C148
0,3,"Dooley, Mr. Patrick",male,32,370376,7.75,`;

export function getPassengers(): Passenger[] {
  const passengers: Passenger[] = [];
  const lines = TITANIC_CSV.trim().split('\n');
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const fields: string[] = [];
    let currentField = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        if (inQuotes && line[j + 1] === '"') {
          currentField += '"';
          j++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        fields.push(currentField);
        currentField = '';
      } else {
        currentField += char;
      }
    }
    fields.push(currentField);
    
    if (fields.length < 8) continue;
    
    const survived = fields[0] === '1';
    const pclass = parseInt(fields[1], 10);
    const name = fields[2];
    const sex = fields[3] === 'female' ? 'female' : 'male';
    const ageVal = fields[4].trim();
    const age = ageVal !== '' ? parseFloat(ageVal) : undefined;
    const ticket = fields[5];
    const fare = parseFloat(fields[6]) || 0;
    const cabin = fields[7] ? fields[7].trim() : undefined;
    
    passengers.push({
      id: i,
      survived,
      pclass,
      name,
      sex,
      age,
      ticket,
      fare,
      cabin: cabin || undefined,
    });
  }
  
  return passengers;
}

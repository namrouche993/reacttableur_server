const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
  ];

  
const organisme_data = [
  {val:'organisme_opgi',label:'OPGI'},
  {val:'organisme_duac',label:'DUAC'},
  {val:'organisme_dep',label:'DEP'},
  {val:'organisme_dl',label:'DL'},
];

const region_data0 = [
  { region: '01-ADRAR', matriculeregion: '01', id: 1 },
  { region: '02-CHLEF', matriculeregion: '02', id: 2 },
  { region: '03-LAGHOUAT', matriculeregion: '03', id: 3 },
  { region: '04-Oum el Bouaghi', matriculeregion: '04', id: 4 },
  { region: '05-BATNA', matriculeregion: '05', id: 5 },
  { region: '06-Béjaïa', matriculeregion: '06', id: 6 },
  { region: '07-BISKRA', matriculeregion: '07', id: 7 },
  { region: '08-Béchar', matriculeregion: '08', id: 8 },
  { region: '09-BLIDA', matriculeregion: '09', id: 9 },
  { region: '10-BOUIRA', matriculeregion: '10', id: 10 },
  { region: '11-Tamanrasset', matriculeregion: '11', id: 11 },
  { region: '12-Tébessa', matriculeregion: '12', id: 12 },
  { region: '13-TLEMCEN', matriculeregion: '13', id: 13 },
  { region: '14-TIARET', matriculeregion: '14', id: 14 },
  { region: '15-TIZI OUZOU', matriculeregion: '15', id: 15 },
  { region: '16.1-ALGER HD', matriculeregion: '16.1', id: 16 },
  { region: '16.2-ALGER BMR', matriculeregion: '16.2', id: 59 },
  { region: '16.3-ALGER DEB', matriculeregion: '16.3', id: 60 },
  { region: '17-DJELFA', matriculeregion: '17', id: 17 },
  { region: '18-JIJEL', matriculeregion: '18', id: 18 },
  { region: '19-Sétif', matriculeregion: '19', id: 19 },
  { region: '20-Saïda', matriculeregion: '20', id: 20 },
  { region: '21-SKIKDA', matriculeregion: '21', id: 21 },
  { region: '22-Sidi Bel Abbès', matriculeregion: '22', id: 22 },
  { region: '23-ANNABA', matriculeregion: '23', id: 23 },
  { region: '24-GUELMA', matriculeregion: '24', id: 24 },
  { region: '25-CONSTANTINE', matriculeregion: '25', id: 25 },
  { region: '26-Médéa', matriculeregion: '26', id: 26 },
  { region: '27-MOSTAGANEM', matriculeregion: '27', id: 27 },
  { region: '28-Msila', matriculeregion: '28', id: 28 },
  { region: '29-MASCARA', matriculeregion: '29', id: 29 },
  { region: '30-OUARGLA', matriculeregion: '30', id: 30 },
  { region: '31-ORAN', matriculeregion: '31', id: 31 },
  { region: '32-EL BAYADH', matriculeregion: '32', id: 32 },
  { region: '33-ILLIZI', matriculeregion: '33', id: 33 },
  { region: '34-Bordj Bou Arréridj', matriculeregion: '34', id: 34 },
  { region: '35-Boumerdès', matriculeregion: '35', id: 35 },
  { region: '36-EL TARF', matriculeregion: '36', id: 36 },
  { region: '37-TINDOUF', matriculeregion: '37', id: 37 },
  { region: '38-TISSEMSILT', matriculeregion: '38', id: 38 },
  { region: '39-EL OUED', matriculeregion: '39', id: 39 },
  { region: '40-KHENCHELA', matriculeregion: '40', id: 40 },
  { region: '41-Souk Ahras', matriculeregion: '41', id: 41 },
  { region: '42-TIPAZA', matriculeregion: '42', id: 42 },
  { region: '43-MILA', matriculeregion: '43', id: 43 },
  { region: '44-Aïn Defla', matriculeregion: '44', id: 44 },
  { region: '45-NAAMA', matriculeregion: '45', id: 45 },
  { region: '46-Aïn Témouchent', matriculeregion: '46', id: 46 },
  { region: '47-Ghardaïa', matriculeregion: '47', id: 47 },
  { region: '48-RELIZANE', matriculeregion: '48', id: 48 },

  { region: '49-Timimoun', matriculeregion: '49', id: 49 },
  { region: '50-Bordj Badji Mokhtar', matriculeregion: '50', id: 50 },
  { region: '51-Ouled Djellal', matriculeregion: '51', id: 51 },
  { region: '52-Béni Abbès', matriculeregion: '52', id: 52 },
  { region: '53-In Salah', matriculeregion: '53', id: 53 },
  { region: '54-In Guezzam', matriculeregion: '54', id: 54 },
  { region: '55-Touggourt', matriculeregion: '55', id: 55 },
  { region: '56-Djanet', matriculeregion: '56', id: 56 },
  { region: '57-El M\'Ghair', matriculeregion: '57', id: 57 },
  { region: '58-El Meniaa', matriculeregion: '58', id: 58 },
];

const region_data = region_data0.map(item => ({
  ...item,
  region2: item.region.substring(3)
}));


module.exports = {organisme_data,region_data};

const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect(process.env.URLMONGO);
    console.log('connexion a mongo OK');
  } catch (error) {
    console.log('erreur de connexion');
    console.log(error);
  }
};

module.exports = connection;

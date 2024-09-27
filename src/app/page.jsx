'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './page.module.css'; // Importation du fichier CSS module

export function LivresEtCouleurs() {
  const [livres, setLivres] = useState([]);
  const [nameLivre, setNameLivre] = useState('');
  const [couleurs, setCouleurs] = useState([]);
  const [nameCouleur, setNameCouleur] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLivres();
    fetchCouleurs();
  }, []);

  // Fetch Livres
  const fetchLivres = async () => {
    try {
      const response = await axios.get('http://localhost:5000/livres');
      setLivres(response.data);
    } catch (error) {
      setError('Error fetching livres');
    }
  };

  // Add Livre
  const addLivre = async () => {
    try {
      const response = await axios.post('http://localhost:5000/livres', { name: nameLivre });
      setLivres([...livres, response.data]);
      setNameLivre('');
    } catch (error) {
      setError('Error adding livre');
    }
  };

  // Delete Livre
  const deleteLivre = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/livres/${id}`);
      setLivres(livres.filter((livre) => livre.id !== id));
    } catch (error) {
      setError('Error deleting livre');
    }
  };

  // Fetch Couleurs
  const fetchCouleurs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/couleurs');
      setCouleurs(response.data);
    } catch (error) {
      setError('Error fetching couleurs');
    }
  };

  // Add Couleur
  const addCouleur = async () => {
    try {
      const response = await axios.post('http://localhost:5000/couleurs', { name: nameCouleur });
      setCouleurs([...couleurs, response.data]);
      setNameCouleur('');
    } catch (error) {
      setError('Error adding couleur');
    }
  };

  // Delete Couleur
  const deleteCouleur = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/couleurs/${id}`);
      setCouleurs(couleurs.filter((couleur) => couleur.id !== id));
    } catch (error) {
      setError('Error deleting couleur');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Livres et Couleurs</h1>
      {error && <p className={styles.error}>{error}</p>}
      
      {/* Section pour Livres */}
      <div className={styles.section}>
        <h2 className={styles.subtitle}>Livres</h2>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={nameLivre}
            onChange={(e) => setNameLivre(e.target.value)}
            placeholder="Enter livre name"
            className={styles.input}
          />
          <button onClick={addLivre} className={styles.button}>Add Livre</button>
        </div>
        <ul className={styles.list}>
          {livres.map((livre) => (
            <li key={livre.id} className={styles.listItem}>
              {livre.name}
              <button onClick={() => deleteLivre(livre.id)} className={styles.deleteButton}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Section pour Couleurs */}
      <div className={styles.section}>
        <h2 className={styles.subtitle}>Couleurs</h2>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={nameCouleur}
            onChange={(e) => setNameCouleur(e.target.value)}
            placeholder="Enter couleur name"
            className={styles.input}
          />
          <button onClick={addCouleur} className={styles.button}>Add Couleur</button>
        </div>
        <ul className={styles.list}>
          {couleurs.map((couleur) => (
            <li key={couleur.id} className={styles.listItem}>
              {couleur.name}
              <button onClick={() => deleteCouleur(couleur.id)} className={styles.deleteButton}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LivresEtCouleurs;

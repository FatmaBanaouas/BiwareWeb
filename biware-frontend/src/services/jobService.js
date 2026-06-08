const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const jobService = {
  // Récupérer toutes les offres publiées
  async getAllJobs() {
    try {
      const response = await fetch(`${API_URL}/jobs`);
      const data = await response.json();
      if (data.success) {
        return data.jobs;
      }
      return [];
    } catch (error) {
      console.error('Erreur chargement offres:', error);
      return [];
    }
  },

  // Récupérer une offre spécifique
  async getJobById(id) {
    try {
      const numericId = id.toString().replace('job-', '');
      const response = await fetch(`${API_URL}/jobs/${numericId}`);
      const data = await response.json();
      if (data.success) {
        return data.job;
      }
      return null;
    } catch (error) {
      console.error('Erreur chargement offre:', error);
      return null;
    }
  }
};
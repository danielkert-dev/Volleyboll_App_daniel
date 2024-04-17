// stores/tournament.js
import { defineStore } from 'pinia';
import config from '@/config';

export const useTournamentStore = defineStore('tournament', {
  state: () => ({
    tournamentName: localStorage.getItem('tournamentName') || '', // Load from localStorage or default to ''
    tournaments: [],
    topThree: null,
    gruppData: null,  // Changed to null for initial state to represent no data
    gruppMatches: null,
    slutData: null,
  }),
  actions: {
    setTournamentName(name) {
      this.tournamentName = name;
      localStorage.setItem('tournamentName', name); // Save to localStorage
    },
    async getGrupp() {
      this.gruppData = ''
      const url = `${config.DOMAIN_NAME}/tournament/info/?tournament_name=${encodeURIComponent(this.tournamentName)}`;
      const options = {
        headers: {
          'Accept': 'application/json'
        }
      };
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Data fetched:", data);
        this.gruppData = data;  // Assuming data is the whole object you want to display

        //* TOP THREE
        this.topThree = '';
        const url_top = `${config.DOMAIN_NAME}/team/top-three-teams/?tournament_name=${encodeURIComponent(this.tournamentName)}`;
        const options_top = { headers: { 'Accept': 'application/json' } };
        try {
          const response = await fetch(url_top, options_top);
          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          this.topThree = data;
        } 
        catch (error) {
          console.error('API validation error:', error);
          this.topThree = null;
        }
        //* /group_match/info/?tournament_name=
        this.gruppMatches = '';
        const url_match = `${config.DOMAIN_NAME}/group_match/info/?tournament_name=${encodeURIComponent(this.tournamentName)}`;
        const options_match = { headers: { 'Accept': 'application/json' } };
        try {
          const response = await fetch(url_match, options_match);
          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          this.gruppMatches = data;
          return true;  // Assuming a valid response means the data is valid
        } 
        catch (error) {
          console.error('API validation error:', error);
          this.topThree = null;
        }
      } catch (error) {
        console.error('API validation error:', error);
        this.gruppData = null;  // Reset data on error
        return false;
      }
    },
    async getSlut() {
      this.slutData = ''
      const url = `${config.DOMAIN_NAME}/end_match/bracket/?tournament_name=${encodeURIComponent(this.tournamentName)}`;
      const options = {
        headers: {
          'Accept': 'application/json'
        }
      };
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Data fetched:", data);
        this.slutData = data;  // Assuming data is the whole object you want to display

        //* TOP THREE
        this.topThree = '';
        const url_top = `${config.DOMAIN_NAME}/team/top-three-teams/?tournament_name=${encodeURIComponent(this.tournamentName)}`;
        const options_top = { headers: { 'Accept': 'application/json' } };
        try {
          const response = await fetch(url_top, options_top);
          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          this.topThree = data;
          return true;  // Assuming a valid response means the data is valid
        } 
        catch (error) {
          console.error('API validation error:', error);
          this.topThree = null;
        }
      } catch (error) {
        console.error('API validation error:', error);
        this.slutData = null;  // Reset data on error
        return false;
      }
    }
  }
});

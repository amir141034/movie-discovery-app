export interface Mood {
  id: string
  label: string
  emoji: string
  genreIds: number[]
  sortBy: string
}

export const moods: Mood[] = [
  { id: 'happy', label: 'Happy', emoji: '😊', genreIds: [35, 10751, 16], sortBy: 'popularity.desc' },
  { id: 'sad', label: 'In My Feelings', emoji: '😢', genreIds: [18], sortBy: 'vote_average.desc' },
  { id: 'excited', label: 'Pumped Up', emoji: '🔥', genreIds: [28, 12, 53], sortBy: 'popularity.desc' },
  { id: 'relaxed', label: 'Chill', emoji: '😌', genreIds: [35, 10749], sortBy: 'popularity.desc' },
  { id: 'scared', label: 'Spooked', emoji: '👻', genreIds: [27, 9648], sortBy: 'popularity.desc' },
  { id: 'romantic', label: 'Romantic', emoji: '💕', genreIds: [10749], sortBy: 'popularity.desc' },
  { id: 'thoughtful', label: 'Mind-Bending', emoji: '🧠', genreIds: [9648, 878], sortBy: 'vote_average.desc' },
  { id: 'adventurous', label: 'Adventurous', emoji: '🗺️', genreIds: [12, 14], sortBy: 'popularity.desc' },
]
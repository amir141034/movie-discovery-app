import { useState } from 'react'
import { MoodSelector } from '../components/mood/MoodSelector'
import { MoodResults } from '../components/mood/MoodResults'
import type { Mood } from '../composables/moodConfig'

export function MoodPage() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)

  return (
    <div>
      <MoodSelector selectedMood={selectedMood} onSelect={setSelectedMood} />
      {selectedMood && <MoodResults mood={selectedMood} />}
    </div>
  )
}
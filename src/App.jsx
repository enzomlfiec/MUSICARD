
import { useRef, useState } from "react";
import MusicCardOne from "./components/MusicCardOne.jsx";
import MusicCardTwo from "./components/MusicCardTwo.jsx";
import MusicCardThree from "./components/MusicCardThree.jsx";

import { Music, SkipBack, SkipForward } from "lucide-react"

export default function App() {

  const musicCards = [
    MusicCardOne,
    MusicCardTwo,
    MusicCardThree
  ];


  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [songSource, setSongSource] = useState("error.mp3");
  const [songID, setSongID] = useState(0);

  const CurrentMusicCard = musicCards[songID - 1] || MusicCardOne;

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    } else {
      audio.pause();
    }
  }

  function handleSongChange(source, id) {
    if (songID === id) {
      togglePlay();
      return;
    }

    setSongSource(source);
    setSongID(id);
    setIsPlaying(true);
  }

  return (
    <>
      <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#090514] px-5 py-10 text-white">
        {/* Background */}
        <div className="absolute inset-0 bg-[url('https://i.redd.it/d0o107bmuck11.gif')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-purple-950/40 backdrop-blur-md" />

        {/* App */}
        <section className="relative z-10 flex w-full items-center justify-center flex-col">
          <div className="mb-8 text-center flex justify-center items-center gap-5">
            <div className="flex items-center justify-center border-white py-2 px-1 rounded-lg border-2 select-none">
              <Music strokeWidth={2} className="w-5 h-5 select-none" />
            </div>
            <p className="text-2xl font-black uppercase tracking-[0.5em] text-purple-white select-none">
              Musicard
            </p>
          </div>

          <div className="mt-6 flex w-full justify-center">
            <span id="musicard" className="w-full max-w-sm">
              <CurrentMusicCard
                isPlaying={isPlaying}
                currentTime={currentTime}
                songID={songID}
                handleSongChange={handleSongChange}
              />
            </span>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-between px-3 sm:px-6">
            <button aria-label="Música anterior" className="pointer-events-auto flex items-center justify-center rounded-full border border-purple-300 bg-purple-500/10 p-2 backdrop-blur-3xl transition hover:brightness-150 sm:p-3">
              <SkipBack className="w-10 h-10" />
            </button>

            <button aria-label="Música seguinte" className="pointer-events-auto flex items-center justify-center rounded-full border border-purple-300 bg-purple-500/10 p-2 backdrop-blur-3xl transition hover:brightness-150 sm:p-3">
              <SkipForward className="w-10 h-10" />
            </button>
          </div>
        </section>
        <audio
          ref={audioRef}
          src={songSource}
          onLoadedData={() => {
            if (isPlaying) {
              audioRef.current.play().catch(console.error);
            }
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={(event) =>
            setCurrentTime(event.currentTarget.currentTime)
          }
          onEnded={() => setIsPlaying(false)}
        />
      </main>
      <footer className="absolute bottom-0 left-0 w-full text-center py-4 text-white/50 text-sm">
        Projeto desenvolvido por <span className="font-bold text-purple-400">Enzo</span> e <span className="font-bold text-purple-400">Kauan</span>
      </footer>
    </>
  );
}

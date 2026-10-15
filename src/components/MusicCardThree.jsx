
import { Play, Pause } from "lucide-react";

export default function MusicCardThree({ isPlaying, currentTime, songID, handleSongChange }) {
    function formatTime(seconds) {
        if (songID !== 3) {
            return "0:00";
        }
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = Math.floor(seconds % 60);
        return `${minutes}:${String(secondsLeft).padStart(2, "0")}`;
    }
    return (
        <div className="rounded-3xl border border-white/10 bg-white/8 p-4 shadow-2xl backdrop-blur-2xl">
            <img
                src="/img1.png"
                alt="Kurohyou 2 Cover art"
                className="aspect-square w-full rounded-2xl object-cover"
            />

            <div className="mt-5">
                <h2 className="text-xl font-bold">Kurohyou 2 - the ELECTRIZER</h2>
                <p className="mt-1 text-sm text-purple-200/70">skankfunk.</p>
            </div>

            <p className="mt-4 text-center text-sm text-white/60">
                {formatTime(currentTime)}
            </p>

            <div className="mt-4 flex items-center justify-center gap-8">
                <button
                    type="button"
                    onClick={() => handleSongChange("/Music/ELECTRIZER.mp3", 3)}
                    aria-label={(isPlaying && songID === 3) ? "Pausar" : "Reproduzir"}
                    className="cursor-pointer flex h-14 w-14 items-center justify-center rounded-full bg-purple-500 transition hover:bg-purple-400"
                >
                    {(isPlaying && songID === 3) ? (
                        <Pause size={25} fill="currentColor" className="ml-1 relative flex right-0.5" />
                    ) : (
                        <Play size={25} fill="currentColor" className="ml-1 relative flex right-0.5" />
                    )}
                </button>
            </div>

        </div>
    );
}


import { Play, Pause,   } from "lucide-react";

export default function MusicCardOne({ isPlaying, currentTime, songID, handleSongChange }) {

    function formatTime(seconds) { // Função para formatar o tempo em minutos e segundos.
        if (songID !== 1) {
            return "-:--"; // Se a música atual não for a primeira, retorna "-:--" como tempo formatado.
        }
        // Math floor. serve para arredondar para baixo o número de minutos.
        const minutes = Math.floor(seconds / 60); 
        const secondsLeft = Math.floor(seconds % 60);

        // Retorna o tempo formatado como "minutos:segundos", garantindo que os segundos tenham sempre dois dígitos.
        //Ex: Se o tempo for 3 minutos e 2 segundos, o retorno será "3:02".
        return `${minutes}:${String(secondsLeft).padStart(2, "0")}`;
    }

    return (
        <div className="rounded-3xl border border-white/10 bg-white/8 p-4 shadow-2xl backdrop-blur-2xl">
            <img 
                src="/img3.jpg"
                alt="Katana Zero Cover art"
                className="aspect-square w-full rounded-2xl object-cover"
            />

            <div className="mt-5">
                <h2 className="text-xl font-bold">Katana Zero - Delusive Bunker</h2>
                <p className="mt-1 text-sm text-purple-200/70">LudoWic</p>
            </div>

            <p className="mt-4 text-center text-sm text-white/60">
                {formatTime(currentTime)}
            </p>

            <div className="mt-4 flex items-center justify-center gap-8">
                <button
                    type="button"
                    onClick={() => handleSongChange("/Music/DelusiveBunker.mp3", 1)}
                    aria-label={(isPlaying && songID === 1) ? "Pausar" : "Reproduzir"}
                    className="cursor-pointer flex h-14 w-14 items-center justify-center rounded-full bg-purple-500 transition hover:bg-purple-400"
                >
                    {(isPlaying && songID === 1) ? (
                        <Pause size={25} fill="currentColor" className="ml-1 relative flex right-0.5" />
                    ) : (
                        <Play size={25} fill="currentColor" className="ml-1 relative flex right-0.5" />
                    )}
                </button>
            </div>

        </div>
    );
}

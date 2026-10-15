
import { useRef, useState } from "react";
import MusicCardOne from "./components/MusicCardOne.jsx";
import MusicCardTwo from "./components/MusicCardTwo.jsx";
import MusicCardThree from "./components/MusicCardThree.jsx";

import { Music, SkipBack, SkipForward } from "lucide-react"

export default function App() {

  // Ref 
  const audioRef = useRef(null);

  // States
  const [isPlaying, setIsPlaying] = useState(false); // Se a música está tocando ou não.
  const [currentTime, setCurrentTime] = useState(0); // Tempo atual da música em segundos.
  const [songSource, setSongSource] = useState(""); // Fonte /Caminho do Arquivo da música atual.
  const [songID, setSongID] = useState(0); // ID da música atual (1, 2 ou 3).

  const cardProps = { // Props que serão passados para os componentes MusicCardOne, MusicCardTwo e MusicCardThree.
    isPlaying,
    currentTime,
    songID,
    handleSongChange
  };

  function togglePlay() { // Função para alternar entre tocar e pausar a música.
    const audio = audioRef.current; // Obtém a referência do elemento de áudio.
    if (!audio) return; // Se o elemento de áudio não estiver disponível, retorna sem fazer nada.

    if (audio.paused) { // Se a música estiver pausada, toca a música e detecta erros de reprodução.
      audio.play().catch((error) => {
        audio.src = "error.mp3"; // Se houver um erro ao tentar reproduzir a música, toca um som de erro e tenta reproduzir novamente.
        audio.play();
        console.error("Audio playback failed:", error);
      });
    } else { // Caso contrário, pausa a música.
      audio.pause();
    }
  }

  function handleSongChange(source, id) { // Função para alterar a música atual.
    if (songID === id) { // Se a música atual for a mesma que a música selecionada, apenas alterna entre tocar e pausar.
      togglePlay();
      return;
    }
    // Caso contrário, altera a fonte, o ID da música e define o estado de reprodução como verdadeiro.
    setSongSource(source);
    setSongID(id);
    setIsPlaying(true);
  }

  return (
    <>
      <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#090514] px-5 py-10 text-white">
        {/* Fundo */}
        <div className="absolute inset-0 bg-[url('https://i.redd.it/d0o107bmuck11.gif')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-purple-950/40 backdrop-blur-md" />

        {/* App */}
        <section className="relative z-10 flex w-full items-center justify-center flex-col">

          {/* Logo */}
          <div className="mb-8 text-center flex justify-center items-center gap-5">
            <div className="flex items-center justify-center border-white py-2 px-1 rounded-lg border-2 select-none">
              <Music strokeWidth={2} className="w-5 h-5 select-none" />
            </div>
            <p className="text-2xl font-black uppercase tracking-[0.5em] text-purple-white select-none">
              MUSICARD
            </p>
          </div>

          {/* Cartão de Música */}
          <div className="mt-6 flex w-full justify-center">
            <span id="musicard" className="w-full max-w-sm">
              <MusicCardOne {...cardProps} />
            </span>
          </div>

          {/* Controles de Música */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-between px-3 sm:px-6">
            {/* Botão de Música Anterior */}
            <button aria-label="Música anterior" className="pointer-events-auto flex items-center justify-center rounded-full border border-purple-300 bg-purple-500/10 p-2 backdrop-blur-3xl transition hover:brightness-150 sm:p-3"
            >
              <SkipBack className="w-10 h-10" />
            </button>

            {/* Botão de Música Seguinte */}
            <button aria-label="Música seguinte" className="pointer-events-auto flex items-center justify-center rounded-full border border-purple-300 bg-purple-500/10 p-2 backdrop-blur-3xl transition hover:brightness-150 sm:p-3"
            >
              <SkipForward className="w-10 h-10" />
            </button>
          </div>

        </section>

        {/* Elemento de Áudio */}
        <audio
          ref={audioRef} // Referência para o elemento de áudio, permitindo controlar a reprodução do áudio.
          src={songSource} // Fonte do arquivo de áudio a ser reproduzido, definida pelo estado songSource.
          onLoadedData={() => { // Evento disparado quando os dados do áudio são carregados.
            if (isPlaying) {
              audioRef.current.play().catch(console.error); // Tenta tocar o audio se há qualquer erro, exibe no console.
            }
          }}
          onPlay={() => setIsPlaying(true)} // Ao tocar, define o estado isPlaying como verdadeiro.
          onPause={() => setIsPlaying(false)} // Mesma coisa para pausar, define o estado isPlaying como falso.
          onTimeUpdate={(event) =>
            setCurrentTime(event.currentTarget.currentTime) // Atualiza o currentTime com o tempo atual do áudio.
          }
          onEnded={() => setIsPlaying(false)} // Quando o áudio termina, define o estado isPlaying como falso / "Pausa" a musica.
        />
      </main>

      {/* Um salve! */}
      <footer className="absolute bg-black/50 border-t-2 border-purple-500/50 bottom-0 left-0 w-full text-center py-4 text-white/50 text-sm">
        Projeto desenvolvido por <span className="font-bold text-purple-400">Enzo</span> e <span className="font-bold text-purple-400">Kauan</span>
      </footer>
    </>
  );
}
